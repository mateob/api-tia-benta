import logger from "@src/logger";
import { CUSTOM_VALIDATION } from "@src/model/user";
import ApiError, { APIError } from "@src/util/errors/api-error";
import { uppercaseWords } from "@src/util/stringUtils";
import mongoose, { Document, Model, Schema } from "mongoose";

import { Request, Response } from "express";
import { ControllerEntity } from "./controller.enum";

export abstract class BaseController<T extends Document> {
  protected modelEntity: Model<T>;

  constructor(protected modelName: ControllerEntity, schema: Schema) {
    this.modelEntity = mongoose.model(uppercaseWords(modelName), schema);
  }

  protected async create(req: Request, res: Response): Promise<void> {
    try {
      const entity = new this.modelEntity(req.body);
      const newEntity = await entity.save();
      res.status(201).send(newEntity);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  protected async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const entity = await this.modelEntity.find({});
      if (!entity) {
        return res.status(204).send();
      }
      return res.status(200).send({
        data: entity.map((e) => {
          return e.toJSON();
        }),
      });
    } catch (error) {
      return this.sendErrorResponse(res, {
        code: 500,
        message: "Deu errado",
        documentation: "link doc",
      });
    }
  }

  protected async getById(req: Request, res: Response): Promise<Response> {
    try {
      const entity = await this.modelEntity.findById(req.params.id);
      if (!entity) {
        return res.status(204).send(
          ApiError.format({
            code: 204,
            message: `${this.modelName} not found!`,
          })
        );
      }
      return res.status(200).send({ data: entity.toJSON() });
    } catch (error) {
      return this.sendErrorResponse(res, {
        code: 500,
        message: "Deu erro no get by ID",
        documentation: "link doc",
      });
    }
  }

  protected async update(req: Request, res: Response): Promise<Response> {
    try {
      const entity = await this.modelEntity.findByIdAndUpdate(
        req.params.id,
        this.getOnlyChanges(req.body),
        function (err, doc) {
          if (err) throw err;
          else {
            return doc;
          }
        }
      );
      return res.status(200).send(entity);
    } catch (error) {
      return this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  protected async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.modelEntity.findByIdAndUpdate(
        req.params.id,
        { active: false } as any,
        function (err, doc) {
          if (err) throw err;
          else {
            return doc;
          }
        }
      );
      return res.status(204).send({});
    } catch (error) {
      return this.sendErrorResponse(res, {
        code: 400,
        message: "Deu erro no delete",
        documentation: "link doc",
      });
    }
  }

  protected sendCreateUpdateErrorResponse(
    res: Response,
    error: mongoose.Error.ValidationError | Error
  ): Response {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientErrors = this.handleClientErrors(error);
      res.status(clientErrors.code).send(
        ApiError.format({
          code: clientErrors.code,
          message: clientErrors.error,
        })
      );
    } else {
      logger.error(`${error}`);
      res
        .status(500)
        .send(ApiError.format({ code: 500, message: "Something went wrong!" }));
    }
    return res;
  }

  private handleClientErrors(
    error: mongoose.Error.ValidationError
  ): { code: number; error: string } {
    const duplicatedKindErrors = Object.values(error.errors).filter(
      (err) => err.kind === CUSTOM_VALIDATION.DUPLICATED
    );
    if (duplicatedKindErrors.length) {
      return { code: 409, error: error.message };
    }
    return { code: 400, error: error.message };
  }

  protected sendErrorResponse(res: Response, apiError: APIError): Response {
    return res.status(apiError.code).send(ApiError.format(apiError));
  }

  protected getOnlyChanges(dataBody: T): T {
    const entries = Object.keys(dataBody);
    const updates: any = {};
    for (let i = 0; i < entries.length; i++) {
      updates[entries[i]] = Object.values(dataBody)[i];
    }
    return updates;
  }
}

import { Controller, Post, Get, Put, Delete } from "@overnightjs/core";
import { CategoryModel, categorySchema } from "@src/model/category";
import { BaseController } from "./base/base";
import { ControllerEntity } from "./base/controller.enum";
import { Request, Response } from "express";

@Controller(ControllerEntity.CATEGORY)
export class CategoryController extends BaseController<CategoryModel> {
  constructor() {
    super(ControllerEntity.CATEGORY, categorySchema);
  }

  @Post()
  public async create(req: Request, res: Response): Promise<void> {
    super.create(req, res);
  }

  @Get()
  public async getAll(req: Request, res: Response): Promise<Response> {
    return super.getAll(req, res);
  }

  @Get(":id")
  public async getById(req: Request, res: Response): Promise<Response> {
    return super.getById(req, res);
  }

  @Put(":id")
  public async update(req: Request, res: Response): Promise<Response> {
    return super.update(req, res);
  }

  @Delete(":id")
  public async delete(req: Request, res: Response): Promise<Response> {
    return super.delete(req, res);
  }
}

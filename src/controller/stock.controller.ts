import { Controller, Post, Get, Put, Delete } from "@overnightjs/core";
import { BaseController } from "./base/base";
import { ControllerEntity } from "./base/controller.enum";
import { Request, Response } from "express";
import { StockModel, stockSchema } from "@src/model/stock";

@Controller(ControllerEntity.STOCK)
export class StockController extends BaseController<StockModel> {
  constructor() {
    super(ControllerEntity.STOCK, stockSchema);
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

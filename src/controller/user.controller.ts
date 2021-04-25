import { Controller, Get, Middleware, Post, Put } from "@overnightjs/core";
import { authMiddleware } from "@src/middleware/auth";
import { schema, User, UserModel } from "@src/model/user";
import AuthService from "@src/service/auth.service";
import { Request, Response } from "express";
import { BaseController } from "./base/base";
import { ControllerEntity } from "./base/controller.enum";

@Controller(ControllerEntity.USER)
export class UserController extends BaseController<UserModel> {
  constructor() {
    super(ControllerEntity.USER, schema);
  }

  @Post()
  public async create(req: Request, res: Response): Promise<void> {
    super.create(req, res);
  }

  @Get(":id")
  @Middleware(authMiddleware)
  public async getById(req: Request, res: Response): Promise<Response> {
    return super.getById(req, res);
  }

  // "link to Documen: http://localhost:3000/docs/#/Users/createUser",
  @Get()
  @Middleware(authMiddleware)
  public async getAll(req: Request, res: Response): Promise<Response> {
    return super.getAll(req, res);
  }

  @Put(":id")
  @Middleware(authMiddleware)
  public async update(req: Request, res: Response): Promise<Response> {
    return super.update(req, res);
  }

  @Post("authenticate")
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return this.sendErrorResponse(res, {
        code: 401,
        message: "User not found!",
      });
    }
    if (!(await AuthService.comparePasswords(password, user.password))) {
      return this.sendErrorResponse(res, {
        code: 401,
        message: "Password does not match!",
      });
    }
    const token = AuthService.generateToken(user.toJSON());
    return res.status(200).send({ ...user.toJSON(), ...{ token } });
  }

  @Get("me")
  @Middleware(authMiddleware)
  public async me(req: Request, res: Response): Promise<Response> {
    const email = req.decoded ? req.decoded.email : undefined;
    const user = await User.findOne({ email });
    if (!user) {
      return this.sendErrorResponse(res, {
        code: 404,
        message: "User not found!",
      });
    }
    return res.send({ user });
  }
}

import "./util/module-alias";
import { Server } from "@overnightjs/core";
import { Application } from "express";
import bodyParser from "body-parser";
import expressPino from "express-pino-logger";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { OpenApiValidator } from "express-openapi-validator";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import * as database from "@src/database";
import apiSchema from "./api-schema.json";

import logger from "./logger";
import { apiErrorValidator } from "./middleware/api-error-validator";
import { listOfControllers } from "./controller/list-of-controllers";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    await this.docsSetup();
    this.setupControllers();
    await this.databaseSetup();
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(expressPino(logger));
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  private setupControllers(): void {
    this.addControllers(listOfControllers);
  }

  private async docsSetup(): Promise<void> {
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSchema));
    await new OpenApiValidator({
      apiSpec: apiSchema as OpenAPIV3.Document,
      validateRequests: false,
      validateResponses: false,
    }).install(this.app);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server listening of port: ${this.port}.`);
    });
  }
}

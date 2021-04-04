import pino from "pino";
import config from "config";
import { format } from "prettier";

class Logger {
  private static loggerPino = pino({
    enabled: config.get("App.logger.enabled"),
    level: config.get("App.logger.level"),
  });

  static info(text: string, params?: any) {
    this.loggerPino.info(format(text, this.fixFormat(params)));
  }

  static warn(text: string, params?: any) {
    this.loggerPino.warn(format(text, this.fixFormat(params)));
  }

  static debug(text: string, params?: any) {
    this.loggerPino.debug(format(text, this.fixFormat(params)));
  }

  static error(text: string, params?: any) {
    this.loggerPino.error(format(text, this.fixFormat(params)));
  }

  private static fixFormat(params?: any): any {
    if (params) {
      Object.keys(params).forEach((k) => {
        params[k] = JSON.stringify(params[k]);
      });
    }
    return params;
  }
}

const logger = Logger;
export default logger;

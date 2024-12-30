import { logger, consoleTransport } from "react-native-logs";
 
const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  enabled: true,
};
 
export class log {
 
  static logSingleton = logger.createLogger(defaultConfig);
 
  static debug(...args: any) {
    this.logSingleton.debug(...args);
  }

  static info(args: any) {
    this.logSingleton.info(...args);
  }

  static error(...args: any) {
    this.logSingleton.error(...args);
  }

  static warn(...args: any){
    this.logSingleton.warn(...args);
  }
}
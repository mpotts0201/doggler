import winston from "winston";
const {combine} = winston.format;
const colorizer = winston.format.colorize();
import {version} from "../../ver/version";

export const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf(msg =>
      colorizer.colorize(msg.level, `(${version}) => ${msg.timestamp}:${msg.level.toUpperCase()}: ${msg.message}`)
    )
  ),
  transports: [
    new winston.transports.Console(),
  ]
});
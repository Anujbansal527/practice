import { createLogger,format,transports } from "winston";
const { combine, timestamp, printf, colorize,json } = format;

// Define custom log format
const consoleLogFormat = format.combine(
    format.colorize(),
    format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level}]: ${message}`;
    })
);

// Create a Winston instance
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new transports.Console({
            format: consoleLogFormat
        }),
        new transports.File({ filename: 'logs/error.log'}),
    ],
});

export default logger;
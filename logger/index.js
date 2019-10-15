const { logLevel } = require("kafkajs");
const winston = require("winston");

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "error",
    filename: "/kafka-playground.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: true,
    colorize: true
  }
};
const toWinstonLogLevel = level => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return "error";
    case logLevel.WARN:
      return "warn";
    case logLevel.INFO:
      return "info";
    case logLevel.DEBUG:
      return "debug";
  }
};

const WinstonLogCreator = logLevel => {
  const logger = winston.createLogger({
    level: toWinstonLogLevel(logLevel),
    transports: [
      new winston.transports.Console(options.console),
      new winston.transports.File(options.file)
    ],
    exitOnError: false // do not exit on handled exceptions
  });

  return ({ namespace, level, label, log }) => {
    const { message, ...extra } = log;
    logger.log({
      level: toWinstonLogLevel(level),
      message,
      extra
    });
  };
};

module.exports = { WinstonLogCreator };

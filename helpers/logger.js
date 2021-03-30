const {createLogger, format, transports} = require("winston");

const logger = createLogger({
    level: "info",
    format: format.json(),

    // log 의 저장방식에 대한 설정이다.
    transports: [
        new transports.File({filename: "combined.log"}), // 파일로 저장
        new transports.File({filename: "error.log", level: "error"})
    ]
})

// 개발환경애서는 파일 말고 콘솔로 출력한다.
if(process.env.NODE_ENV !== "production"){
    logger.add(new transports.Console({format: format.simple()}));
}

module.exports = logger;
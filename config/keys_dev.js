module.exports={
    DB_USERNAME: "root",
    DB_NAME:process.env.DB_NAME_DEV,
    DB_PASSWORD: process.env.DB_PASSWORD_DEV,
    DB_HOST:"127.0.0.1",
    DB: "mysql",
    REDIS_PORT : 6379,
    REDIS_HOST: "127.0.0.1",
    KAKAO_CLIENT_ID: process.env.clientID,
    COOKIE_SECRET:process.env.COOKIE_SECRET,
    SESSION_MAXAGE: 60*3
}

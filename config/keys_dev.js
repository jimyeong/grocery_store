module.exports={
    DB_USERNAME: "root",
    DB_NAME:process.env.DB_NAME_DEV,
    DB_PASSWORD: process.env.DB_PASSWORD_DEV,
    REDIS_PORT : 6379,
    DB_HOST:"127.0.0.1",
    DB: "mysql",
    KAKAO_CLIENT_ID: process.env.clientID,
    COOKIE_SECRET:process.env.COOKIE_SECRET
}

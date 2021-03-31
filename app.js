const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const _hanadlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access"); // 이거 실제로 사용가능한 모듈인지 확인해볼것
const logger = require("./helpers/logger");
const flash = require("connect-flash");
const {sequelize} = require("./models");
const redis = require("redis");
const keys = require("./config/keys");

const dotenv = require("dotenv");
dotenv.config()


//redis storage setting
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient(keys.REDIS_PORT);




const passport = require("passport");
require("./config/passport")(passport, redisClient);

// router
const signupRouter = require("./routers/signup");
const usersRouter = require("./routers/users");
const oauthRouter = require("./routers/oauth");
const dashboardRouter = require("./routers/dashboard");




// view template setting
const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(_hanadlebars)
})

// view template setting
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.use(express.static(path.join(__dirname, "/public")));

// bodyparser set up
app.use(cookieParser(keys.COOKIE_SECRET));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(flash());


// 나중에 .env 파일에서 꺼내준다.
app.use(session({
    // properties 특징 다시 한번 찾아보기, 기억 안남..
    store:new RedisStore({client: redisClient}),
    secret: keys.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60*60
    }
}));

// passport module 세팅
app.use(passport.initialize());
app.use(passport.session());

// terminal 에서 로그를 찍어준다.
if (process.env.NODE_ENV === "production"){
    app.use(morgan('combined'))
}else{
    app.use(morgan('dev'));
}

// db connection
sequelize.sync({force:true})
    .then(()=>{
        console.log(`DB is connected successfully`)
    }).catch(err=>{
        console.log(err);
})

// 세션이 없는 경우, 로그인페이지로
/*
app.use(function(req,res,next){
    if(!req.session){
        res.redirect("/users/login");
    }
});
*/


app.get("/", (req,res)=>{
    if(req.session){
        res.redirect("/users/login");
    }else {
        console.log("@@@@@", req.session);
        res.redirect("/dashboard");


    }

})


// router
app.use("/signup", signupRouter);
app.use("/users", usersRouter);
app.use("/oauth", oauthRouter);
app.use("/dashboard", dashboardRouter);


// 404 page && error page
app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} No Router there` );
    error.status = 404;
    // 에러가 나오면 로그를 기록해준다.
    logger.info("hello"); // level 이 info로 로그가 전달된다
    logger.error(error.message); // level 이 에러로 로그가 찍힌다.
    next(error);
})

// error 페이지를 그려준다.
app.use((err, req,res,next)=>{
    res.locals.message = err.message;
    // production 일떄는 에러 숨긴다.
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error", err);
})

app.listen(port, ()=>{
	console.log(`server is running on port ${port}`)
})


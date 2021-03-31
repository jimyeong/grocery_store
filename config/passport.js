const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user");
const keys = require("./keys");


require("dotenv").config();


module.exports = function (passport, redisclient) {

    let localhostURI = "/oauth/callback";

    passport.use(new KakaoStrategy({
            clientID: keys.KAKAO_CLIENT_ID,
            clientSecret: "",
            callbackURL: localhostURI
        },
        (accessToken, refreshToken, profile, done) => {
            // 먼저 회원가입을 시켜야 될 것 같은 데,
            // console.log(profile._json.email);


            // done(err)과 done(null, false) 는 구별되야 한다..
            //done(null, user)
            //done(null, false,{mesg: ""}) // 넘겨운 정보가 부정확해서, 로그인이 안된경우, 왜 안됬는지는, 3번쨰 파라미터로 알려준다. // 일반적인 케이스다
            //done(err) // 서버에러로 실패한 경우
            const newUser = {
                id: profile._json.id,
                email: profile._json.email,
                name: profile.username
            };

            User.findOne({
                where: {email: newUser.email}
            }).then(user => {

                //redis 저장
                redisclient.set(user.email, user);
                done(null, user.email);

            }).catch(err => {
                // user가 db에 없당
                // redis 에 저장

                // 여기서 에러남
                redisclient.set(newUser.email, newUser);
                done(null, newUser.email);
            })
        }
    ))

    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });

    // sequelizze 메서드 공부해야겠다.
    passport.deserializeUser(function (email, done) {
        done(null, email)

        //레디스에서 꺼내오기
        redisclient.get(email, (err, user)=>{
            if(err)done(err)
            if(user){
                done(null, user);
            }
        })
        /*
        User.findOne({
            where:{id}
        })
            .then(user=>done(null, user))
            .catch(err=>done(err));
        */
    });
}
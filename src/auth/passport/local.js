'use strict';
const User = require('../../models/User.js');
// passport local방식으로 로그인
// passport는 session객체 안에 passport객체를 넣어둠! 
const bcrypt = require('bcrypt');
module.exports = (app) => {
    const passport = require("passport");
    const LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session()); 

    //ejs에서 로그인 유무에 따라 로그인버튼 로그아웃 버튼이 보이고 보이지 않는 기능을 위해 추가된 코드
    app.use(function(req,res,next){
    //res.locals.isAuthenticated는 ejs에서 user가 로그인이 되어 있는지 아닌지를 확인하는데 사용
    res.locals.isAuthenticated = req.isAuthenticated(); //현재 로그인이 되어있는지 아닌지를true,false로 return
    //res.locals.currentUser는 로그인된 user의 정보를 불러오는데 사용
    res.locals.currentUser = req.user;//req.user는 passport에서 추가하는 항목으로 로그인이 되면 session으로 부터 user를 deserialize하여 생성됩니다
    next();   //res.locals에 담겨진 변수는 ejs에서 바로 사용가능하기 때문에 사용
  });

    passport.serializeUser((user, done)=> {    
        console.log('serialize');    
        done(null, user);
    });
    passport.deserializeUser((user, done)=> {
        console.log('deserialize >> ',user);   
        done(null, user);
        
    });
    passport.use(new LocalStrategy(// local 방식 미들웨어(중간검사)
        {
            usernameField : "id",
            passwordField : "password",
        },
        async(username, pw, done) => {
            console.log(`내가 친 ID >> ${username}`);
            console.log(`내가 친 PW >> ${pw}`);

            const user = await User.findOne({id : username});
            console.log(`찾은 user >> ${user}`);
            let { password } = user; //user객체의 password;
            if(user){
                // user가 찾아졌을경우
                let hashedResult = await bcrypt.compare(pw, password);
                if(hashedResult){
                    console.log('로그인 완료!');
                    return done(null, user); //2번쨰 파라미터에 false가 오지않아!
                }else{
                    console.log('비번이 올바르지 않습니다!');
                    return done(null, false, {
                        message : '비밀번호 오류!(email은 맞음.)',
                    })

                }
            }else{
                console.log('회원이 아닙니다.');
                return done(null, false, { message : '등록된 사용자가 없습니다.' });
                // 여기까지 검사가 끝나고 다시 authenticate의 redirect코드로 이동함. 
            }
        }
    ))


    return passport;
}
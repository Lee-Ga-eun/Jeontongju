'use strict';
const express = require('express');
const User = require('../models/User.js');
const Question = require('../models/Question.js');
const Drink = require('../models/Drink.js');
const Img = require('../models/Img.js');
const multer = require('multer');
const Storage = multer.diskStorage(
    {
        destination : "./src/uploads", // 파일이 저장될 folder설정
        filename : (req, file, cb) => {
            // image filename setting! 
            cb(null, file.originalname);
        },
        // 즉, image file이 저장될 저장소와 파일이름 설정해놓음. 
        // image스키마 변경 후 filename설정
    }
)
const upload = multer({ storage : Storage }); // 이거뒤에 .single을 사용해서 router middleware로 넣어줄거임 
const bcrypt = require('bcrypt'); // 비밀번호 저장할 때 plain문이 아니라 hashed문으로 저장할거야. 

module.exports = (passport) => {
    const router = express.Router();
    
    // 1. 회원가입
    router.post('/register' , upload.single("img"), async(req,res) => {
        try{
            const { id, password, name } = req.body;  //회원가입.ejs에서 name이 id와 password인 것을 받아옴
        
            console.log(req.body);
            
            let user = new User({
                id : id,
                password : password,  
                name : name,            
                img : {
                    data : req.file.filename, // req.file.filename으로 img찾기~
                    contentType : 'image/png',
                }
            })
            let saveUser = await user.save(); // 저장! 
            console.log(saveUser); // 저장된 js객체 출력! -> mongoose덕분임. 
            return res.redirect('/index');
        }catch(err){
            return console.log(err);
        }
    })
    
    // 2. 로그인 
    router.post('/login', 
        passport.authenticate('local', { // 'local'에서 로그인 성패 여부 따지고 따져지면 redirect코드로 온다. 
            successRedirect : '/index',
            failureRedirect : '/login',
        })
        // 1. 먼저 로그인 router를 타고 들어온다. 
        // 2. passport.authenticate 'local'방식으로 한다고 지정한다. 
        //  - 성공, 실패 시 리다이렉트 페이지도 지정. 
        // 3. 그럼 어떻게 성공인지 실패인지 알아?
        // passport.use로 간다. => 거기서 성공 실패 판별.
    )

    // 3. 이미지 업로드
    router.post('/image' , upload.single("img"), async(req,res) => {
        try{
                        
            let img = new Img({           
                img : {
                    data : req.file.filename, // req.file.filename으로 img찾기~
                    contentType : 'image/png',
                }
            })
            let saveImg = await img.save(); // 저장! 
            console.log(saveImg); // 저장된 js객체 출력! -> mongoose덕분임. 
            return res.redirect('/index');
        }catch(err){
            return console.log(err);
        }
    })

    // 3. 술 취향 테스트
    router.post('/test' , async(req,res) => {
        try{
            const { id, content, answer1, answer2 } = req.body;  //회원가입.ejs에서 name이 id와 password인 것을 받아옴
        
            console.log(req.body);

            let question = new Question({           
                id : id,
                content : content,
                answer1 : answer1,
                answer2 : answer2,
            })
            let saveQuestion = await question.save(); // 저장! 
            console.log(saveQuestion); // 저장된 js객체 출력! -> mongoose덕분임. 
            return res.redirect('/question');
        }catch(err){
            return console.log(err);
        }
    })

    // 3. 술 정보 업로드
    router.post('/drink' , async(req,res) => {
        try{
            const { id, content, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8,
                answer9, answer10, answer11 } = req.body;  //회원가입.ejs에서 name이 id와 password인 것을 받아옴
        
            console.log(req.body);

            let drink = new Drink({           
                id : id,
                전통주명 : content,
                가격 : answer1,
                용량 : answer2,
                주종 : answer3,
                도수 : answer4,
                단맛 : answer5,
                신맛 : answer6,
                바디감 : answer7,
                청량감 : answer8,
                잘어울리는음식 : answer9,
                주원료 : answer10,
                이미지 : answer11,
            })
            let saveDrink = await drink.save(); // 저장! 
            console.log(saveDrink); // 저장된 js객체 출력! -> mongoose덕분임. 
            return res.redirect('/drink');
        }catch(err){
            return console.log(err);
        }
    })


    router.post('/result', async(req,res) => {
        try{
            let content = { q1 : {$elemMatch: { "value": "ediya" }} }

            let a1 = {가격 : { $lte: '10' }};
            let a2 = {가격 : { $gte: '11' }};
    
            let b1 = {도수 : { $lte: '14' }};
            let b2 = {도수 : { $gte: '15' }};
    
            let c1 = {주종 : '탁주'};
            let c2 = {주종 : '약주'};
            let c3 = {주종 : '증류주'};
            let c4 = {주종 : '과실주'};
            let c5 = {주종 : '기타주류'};
            
            let d1 = {단맛 : { $lte: '2' }};
            let d2 = {단맛 : { $gte: '3' }};
            
            let e1 = {신맛 : { $lte: '2' }};
            let e2 = {신맛 : { $gte: '3' }};
            
            let f1 = {바디감 : { $lte: '2' }};
            let f2 = {바디감 : { $gte: '3' }};
            
            let g1 = {청량감 : { $lte: '2' }};
            let g2 = {청량감 : { $gte: '3' }};
            
            // let h1 = {잘어울리는음식 : { $gte: '15' }};
            // let h2 = {잘어울리는음식 : { $gte: '15' }};
            
            let { q1, q2, q3, q4, q5, q6, q7 } = req.query; // q2 q3 q4 q5 .....
            console.log(req.query);
            console.log(typeof req.query);
           
             
             let i = {
                $or : [
                    {content : a1, content : a2},
                    {q2 : b1, q2 : b2},
                    {q3 : c1, q3 : c2, q3 : c3, q3 : c4, q3 : c5, },
                    {q4 : d1, q4 : d2},
                    {q5 : e1, q5 : e2},
                    {q6 : f1, q6 : f2},
                    {q7 : g1, q7 : g2},
                    // {price : q8},
                    
                ]
             }
            
            // db에 저장된 값 -> 화면에 출력
            //Customer.find({ name: 'A' }).
            //then(customers => {              
            //    console.log(customers[0].name); // 'A'
            //    return Customer.find({ name: 'B' });
            //}).
            //then(customers => {
            //    console.log(customers[0].name); // 'B'
            //});
             Drink.find(i, function(에러, 결과){  //post 문서의 모든 데이터를 출력
                console.log(결과);
                res.render('result.ejs', { posts : 결과 });    
                 //db에서 가져온 결과를 posts라는 이름으로 ejs에 넣음
            });
    //     Drink.find({$where : content}, i, function(에러, 결과){  //post 문서의 모든 데이터를 출력
    //         console.log(결과);
    //         res.render('test2.ejs', { posts : 결과 });    
    //          //db에서 가져온 결과를 posts라는 이름으로 ejs에 넣음
    //     });
            }catch(err){
                    console.log(err);
                }
            })

    return router;
}

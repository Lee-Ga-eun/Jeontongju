"use strict";
const express = require("express");
const User = require("../models/User.js");
const Question = require("../models/Question.js");
const Drink = require("../models/Drink.js");
const Img = require("../models/Img.js");

module.exports = () => {
  const router = express.Router();

  // 1. 메인 페이지
  router.get("/index", async (req, res) => {
    try {
      res.render("index.ejs");
    } catch (err) {
      return console.log(err);
    }
  });

  // 2. 회원가입 페이지
  router.get("/register", async (req, res) => {
    try {
      res.render("register.ejs");
    } catch (err) {
      return console.log(err);
    }
  });

  // 3. 로그인 페이지
  router.get("/login", async (req, res) => {
    try {
      res.render("login.ejs");
    } catch (err) {
      console.log(err);
    }
  });

  // 4. 마이 페이지
  router.get("/mypage/:id", login, async (req, res) => {
    try {
      const { id, pw } = req.body;
      //ejs에서 입력받는 input의 name 값
      console.log(req.body);

      res.render("mypage.ejs", { 사용자: req.user });
    } catch (err) {
      return console.log(err);
    }
  });

  // 5. 로그아웃
  router.get("/logout", async (req, res) => {
    req.session.destroy(() => {
      return res.redirect("/index");
    });
  });

  // 6. 사진업로드 페이지
  router.get("/image", async (req, res) => {
    try {
      res.render("image.ejs");
    } catch (err) {
      console.log(err);
    }
  });

  // 7. 술 취향 검사 페이지
  router.get("/test", async (req, res) => {
    try {
      let a1 = { 가격: { $lte: "10" } };
      let a2 = { 가격: { $gte: "11" } };

      let b1 = { 도수: { $lte: "14" } };
      let b2 = { 도수: { $gte: "15" } };

      let c1 = { 주종: "탁주" };
      let c2 = { 주종: "약주" };
      let c3 = { 주종: "증류주" };
      let c4 = { 주종: "과실주" };
      let c5 = { 주종: "기타주류" };

      let d1 = { 단맛: { $lte: "2" } };
      let d2 = { 단맛: { $gte: "3" } };

      let e1 = { 신맛: { $lte: "2" } };
      let e2 = { 신맛: { $gte: "3" } };

      let f1 = { 바디감: { $lte: "2" } };
      let f2 = { 바디감: { $gte: "3" } };

      let g1 = { 청량감: { $lte: "2" } };
      let g2 = { 청량감: { $gte: "3" } };

      // let h1 = {잘어울리는음식 : { $gte: '15' }};
      // let h2 = {잘어울리는음식 : { $gte: '15' }};

      let { q1, q2, q3, q4, q5, q6, q7 } = req.query; // q2 q3 q4 q5 .....
      console.log(req.query);
      console.log(typeof req.query);

      // db 이디야, 스타벅스 가격 column
      // Drink.find({
      //     $and : [
      //         {q1 : { $lte: '10' }, q1 : { $gte: '11' }},
      //         {q2 : { $lte: '14' }, q2 : { $gte: '15' }},
      //         {q3 : '탁주', q3 : '약주', q3 : '증류주', q3 : '과실주', q3 : '기타주류', },
      //         {q4 : { $lte: '2' }, q4 : { $gte: '3' }},
      //         {q5 : { $lte: '2' }, q5 : { $gte: '3' }},
      //         {q6 : { $lte: '2' }, q6 : { $gte: '3' }},
      //         {q7 : { $lte: '2' }, q7 : { $gte: '3' }},
      //         // {price : q8},

      //     ]
      // }, function(에러, 결과){  //post 문서의 모든 데이터를 출력
      //     console.log(결과);
      //     res.render('test.ejs', { posts : 결과 });
      //      //db에서 가져온 결과를 posts라는 이름으로 ejs에 넣음
      // });

      let i = { $and: [a1, b1, c1, d1, e1, f1, g1] };
      let j = req.params.data;
      // db에 저장된 값 -> 화면에 출력
      Drink.find(i, function (에러, 결과) {
        //post 문서의 모든 데이터를 출력
        console.log(결과);
        res.render("test.ejs", { posts: 결과 });
        //db에서 가져온 결과를 posts라는 이름으로 ejs에 넣음
      });
    } catch (err) {
      console.log(err);
    }
  });
  router.get("/test/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    res.render("test.ejs", {
      id: id,
    });
  });

  // 8. 전국 전통주점 페이지
  router.get("/shop", async (req, res) => {
    try {
      res.render("shop.ejs");
    } catch (err) {
      console.log(err);
    }
  });

  // 9. 질문업로드 페이지
  router.get("/question", async (req, res) => {
    try {
      res.render("question.ejs");
    } catch (err) {
      console.log(err);
    }
  });

  // 10. 술 업로드 페이지
  router.get("/drink", async (req, res) => {
    try {
      Img.find(function (에러, 결과) {
        //post 문서의 모든 데이터를 출력
        console.log(결과);
        res.render("drink.ejs", { posts: 결과 });
        //db에서 가져온 결과를 posts라는 이름으로 ejs에 넣음
      });
    } catch (err) {
      console.log(err);
    }
  });

  // 11. 실험 페이지
  router.get("/drinks/recommendation", async (req, res) => {
    try {
      let a1 = { 가격: { $lte: "10" } };
      let a2 = { 가격: { $gte: "11" } };

      let b1 = { 도수: { $lte: "14" } };
      let b2 = { 도수: { $gte: "15" } };

      let c1 = { 주종: "탁주" };
      let c2 = { 주종: "약주" };
      let c3 = { 주종: "증류주" };
      let c4 = { 주종: "과실주" };
      let c5 = { 주종: "기타주류" };

      let d1 = { 단맛: { $lte: "2" } };
      let d2 = { 단맛: { $gte: "3" } };

      let e1 = { 신맛: { $lte: "2" } };
      let e2 = { 신맛: { $gte: "3" } };

      let f1 = { 바디감: { $lte: "2" } };
      let f2 = { 바디감: { $gte: "3" } };

      let g1 = { 청량감: { $lte: "2" } };
      let g2 = { 청량감: { $gte: "3" } };

      // let h1 = {잘어울리는음식 : { $gte: '15' }};
      // let h2 = {잘어울리는음식 : { $gte: '15' }};
      let content1 = { q1: { $elemMatch: { value: "ediya" } } };
      let content2 = { q1: { $elemMatch: { value: "ediya" } } };
      //let content3 = { 가격 : {req.query.value :  "ediya" } };
      let { q1, q2, q3, q4, q5, q6, q7 } = req.query; // q2 q3 q4 q5 .....
      console.log(req.query);
      console.log(typeof req.query);

      // let content = { "가격": {$elemMatch: { "value": "ediya" }} }
      // let i = { a1 }
      let i = {
        $or: [
          { content1: a1, content2: a2 },
          { q2: b1, q2: b2 },
          { q3: c1, q3: c2, q3: c3, q3: c4, q3: c5 },
          { q4: d1, q4: d2 },
          { q5: e1, q5: e2 },
          { q6: f1, q6: f2 },
          { q7: g1, q7: g2 },
          // {price : q8},
        ],
      };
      let vv = { q1: { $elemMatch: { value: 18 } } };
      let v = req.query.q1 == 18;
      if (req.query.q1 == 18) {
      }

      {
        $where: v;
      }
      let j = { 가격: req.query.q1 };
      let k = { 도수: req.query.q2 };
      let l = { 주종: req.query.q3 };
      let m = { 단맛: req.query.q4 };
      let n = { 신맛: req.query.q5 };
      let o = { 바디감: req.query.q6 };
      let p = { 청량감: req.query.q7 };
      let q = {잘어울리는음식 : req.query.q8};
      let as = { $where: [a1, req.query] };
      let vj = {
        $and: [{ j, k }],
      };
      // db에 저장된 값 -> 화면에 출력
      Drink.find(async (에러, 결과) => {
        //post 문서의 모든 데이터를 출력
        console.log(결과);
        res.render("test2.ejs", { posts: 결과 });
        //db에서 가져온 결과를 posts라는 이름으로 ejs에 넣음
      }).and([j, k, l, m, n, o, p]);
      //     Drink.find({$where : content}, i, function(에러, 결과){  //post 문서의 모든 데이터를 출력
      //         console.log(결과);
      //         res.render('test2.ejs', { posts : 결과 });
      //          //db에서 가져온 결과를 posts라는 이름으로 ejs에 넣음
      //     });
    } catch (err) {
      console.log(err);
    }
  });

  // 10. 술 업로드 페이지
  router.get("/detail/:id", async (req, res) => {
    try {
      Drink.findOne({ _id: req.user._id }, function (에러, 결과) {
        //post 문서의 모든 데이터를 출력
        console.log(결과);
        res.render("detail.ejs", { posts: 결과 });
        //db에서 가져온 결과를 posts라는 이름으로 ejs에 넣음
      });
    } catch (err) {
      console.log(err);
    }
  });
  
    router.get("/", function (req, res) {
     res.sendFile(path.join(__dirname, "/react-project/build/index.html"));
    });

  return router;
};

//로그인 했는지 여부 함수
function login(req, res, next) {
  //로그인 했는여지 여부를 판단
  if (req.user) {
    //요청한 유저가 있으면 통과시킴
    next();
  } else {
    res.render("login.ejs");
  }
}

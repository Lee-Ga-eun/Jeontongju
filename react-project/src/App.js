import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Routes/Home";
import List from "./Routes/List";
import Stores from "./Routes/Stores";
import Detail from "./Routes/Detail";
import QuestionList from "./Routes/QuestionList";
import Result from "./Routes/Result";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/stores" element={<Stores />}/> {/*전통주 가게 페이지*/}
        <Route path="/drinks/detail" element={<Detail />}/> {/* 전통주 상세 정보 페이지 */}
        <Route path="/drinks/list" element={<List />} /> {/* 전통주 리스트 페이지 */}
        <Route path="/drinks/recommendation/result" element={<Result/>}/> {/* 전통주 추천 결과 페이지 */}
        <Route path="/drinks/recommendation" element={<QuestionList />} /> {/* 전통주 추천 받기 위한 질문 페이지*/}
        <Route path="/" element={<Home />} /> {/* 메인 페이지 */} 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

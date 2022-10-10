import React from "react";
// 질문 리스트 받아와서 표시하는 컴포넌트
function Recommendation(props){
    const usertest = []; // 사용자 점수 받아놓는 리스트
    return (
        <div>
            <head>
                <title>당신의 전통주 취향은?</title>
            </head>
            <h2>{props.question}</h2>
            <div>
                <button onClick={(event)=>event.preventDefault()}>{props.answer1}</button>
                <button>{props.answer2}</button>
                <button>{props.answer3}</button>
                <button>{props.answer4}</button>
                <button>{props.answer5}</button>
            </div>
        </div>
    );
}
export default Recommendation;
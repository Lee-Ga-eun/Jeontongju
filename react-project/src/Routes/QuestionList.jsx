import React, { useState } from "react";
import Recommendation from "./Recommendation";
const QList = [
    {
        id:0,
        q:'원하는 단맛의 정도는? ',
        a:[
            {answer: 1},
            {answer: 2},
            {answer: 3},
            {answer: 4},
            {answer: 5},
        ]
    },
    {
        id:1,
        q:'원하는 신맛의 정도는? ',
        a:[
            {answer: 1},
            {answer: 2},
            {answer: 3},
            {answer: 4},
            {answer: 5},
        ]
    },
    {
        id:2,
        q:'원하는 바디감의 정도는? ',
        a:[
            {answer: 1},
            {answer: 2},
            {answer: 3},
            {answer: 4},
            {answer: 5},
        ]
    },
    {
        id:3,
        q:'원하는 청량감의 정도는?' ,
        a:[
            {answer: 1},
            {answer: 2},
            {answer: 3},
            {answer: 4},
            {answer: 5},
        ]
    }
]

function QuestionList(){ // 질문들 띄워놓는 리스트
    const [index, setIndex] = useState(0);
    return(
        <div>
            <Recommendation 
                question = {QList[index].q}
                answer1 = {QList[index].a[0].answer}
                answer2 = {QList[index].a[1].answer}
                answer3 = {QList[index].a[2].answer}
                answer4 = {QList[index].a[3].answer}
                answer5 = {QList[index].a[4].answer}/>
            <button onClick={index < 3 ? ()=>setIndex(index+1) : ()=>window.open(`/drinks/recommendation/result`,"_self")}>{index < 3 ? '다음' : '결과 보기!'}</button> {/* 결과 페이지로 이동 */}
        </div>
    )
}
export default QuestionList;
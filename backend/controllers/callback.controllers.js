import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import { Topic, UserProfile } from "../models/user.model.js";

const app = express();

// dotenv.config();
app.use(cors());
app.use(express.json());



const processedResultIds = new Set();

let callbackDataQuery = {};
let callbackDataBody = {

    "token": "Your Notification Token",

    "result_id": "206370034",

    "user_name": "ProProfs",

    "total_marks": "100",

    "attempt_date": 1559632348,

    "user_obtained_marks": 65,

    "user_percent_marks": "50",

    "user_totalcorrect_answers": 1,

    "user_totalwrong_answers": 1,

    "user_Id": "",

    "user_Email": "someone@example.com",

    "user_Address": "",

    "user_City": "",

    "user_State": "",

    "user_Zipcode": "",

    "user_Country": "",
    "time_taken": "01:05:10",
    "time_taken_in_sec": 3910,
    "user_total_unanswered": 0,

    "user_Phone": "",

    "quiz_id": "2478348",

    "quiz_name": "API Test",

    "quiz_title": "mjq3odu5nqo7iv",

    "min_pass_marks": "70",


    "tag_based_score": [

        {

            "tag": "Maths",

            "score": "5 / 5"

        }, {

            "tag": "Physics",

            "score": "0 / 5"

        }

    ],

    "custom_ques_ans": [

        {

            "question": "How did you find us?",

            "answer": "Search Engine"

        }, {

            "question": "How do you commute?",

            "answer": "Car"

        }

    ],

    "status": "new"

};

const callBackGet=(req, res) => {
    callbackDataQuery = req.query;
    callbackDataBody = req.body;

    console.log('Info: Callback Data Query', callbackDataQuery);
    console.log('Info: Callback Data Body', callbackDataBody);
    // res.send("Hey, get request success");
    console.log(callbackDataBody.user_obtained_marks);

    res.json(callbackDataQuery);
}

const callBackPost= (req, res) => { 
    const resultId = req.body.result_id;
    if (!resultId) {
        return res.status(400).json({ message: "result_id is required" });
    }
    if (processedResultIds.has(resultId)) {
        console.log(`Duplicate callback data received for result_id: ${resultId}`);
        return res.status(200).json({ message: "Duplicate data ignored", resultId });
    }
    // callbackData={k1:"val1",k2:"val2",points: Math.floor(Math.random() * 100) };
    console.log('callback data',req.body);
    callbackDataBody=req.body;
    res.json({message: "Data received", queryData: callbackDataQuery, bodyData: callbackDataBody});
}


const callBackSendData=(req, res) => { // callbackData={k1:"val1",k2:"val2",points: Math.floor(Math.random() * 100) };
    //console.log('callback data from api',callbackDataBody);
    res.json({message: "Data received", queryData: callbackDataQuery, bodyData: callbackDataBody});
}

const sendUserProfile= async (req,res)=>{
    // console.log(req.body);
    const email=req.body.email;
    // console.log(email);
    const data=await UserProfile.findOne({email:email}).exec();
    // console.log(data.currentLevel);
    let totalScore=0;
    let gemEarned=0;
    data.topics.forEach((topic)=>{
        totalScore+=topic.levels[data.currentLevel-1]?topic.levels[data.currentLevel-1].score:0;
        // console.log(topic.levels[data.currentLevel-1]?topic.levels[data.currentLevel-1].score:0);
        gemEarned+=topic.gemEarned?1:0;
    })

    const topicData=await Topic.find();

    // console.log({level:data.currentLevel,username:data.username,totalScore:totalScore,topics:topicData});
    res.json({level:data.currentLevel,username:data.username,totalScore:totalScore,topics:topicData,gemEarned:gemEarned});
}

export {callBackGet,callBackPost,callBackSendData,sendUserProfile};
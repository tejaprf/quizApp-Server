import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.routes.js"
import mongoCon from "./db/mongoConnect.js";
import insertSampleData from "./db/createSamUser.js"
import dropCollections from "./db/dropColl.js";
import update_data from "./db/gamificationLogic.js";
import { Topic, UserProfile } from "./models/user.model.js";
import callBackRoute from "./routes/callback.routes.js";

const app = express();

dotenv.config();

app.use(cors({
  origin: "https://quizapp-fend.onrender.com",
  methods:["POST","GET"],
  credentials:true
}));


app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/auth",authRoute);
app.use("/",callBackRoute);

app.get("/", (req, res) => {
    res.send("Backend server started");
});

app.get('/topics',async(req,res)=>{
    const topics=await Topic.find();
    console.log(topics);
    res.json(topics);
})

app.post("/formData",(req,res)=>{
    console.log(req.body);
    res.send("Successfully saved the data");
})

app.post("/userdata",async (req,res)=>{
    const userProfData=await UserProfile.findOne({email:'luckyfrog219@yahoo.com'}).exec();
    console.log(userProfData);
    res.json(userProfData);
});




// stage clearance last level 240+
// 


app.listen(PORT, () => {
    mongoCon();
    // dropCollections();
    let bendData={  
     
        "user_name": "LuckyFrog219",
        "attempt_date": 1559632348,
        "user_obtained_marks": 130,
        "user_Email": "luckyfrog219@yahoo.com",
        "quiz_id": 17,
        "total_marks" : "10",
        "attempt_date" : 1559632348,
        "user_percent_marks" : "50",
        "time_taken_in_sec" : 3910,

    }
    // insertSampleData();
    let fendData={topic:'History',level:1}

    let userData={fendData:fendData,bendData:bendData};

    // update_data(userData);

    // update_data(userData);
    
    console.log("App started running on server");
    
});

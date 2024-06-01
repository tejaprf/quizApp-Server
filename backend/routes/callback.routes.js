import express from "express";
import {callBackGet,callBackPost,callBackSendData, sendUserProfile} from  "../controllers/callback.controllers.js"


const router=express.Router();
router.get("/callback/:email",callBackGet);

router.post("/callback/:email",callBackPost);

router.post("/callback1/:email", callBackSendData);

router.post("/userProfile/:email",sendUserProfile);

export default router;
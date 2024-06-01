import mongoose from "mongoose";
import { UserProfile } from "../models/user.model.js";
// // Assuming updated data for the user

// const userData={  



//    "user_name" : "CleverLion685",

//    "attempt_date" : 1559632348,

//    "user_obtained_marks" : 503,


//    "user_Email" : "cleverlion685@yahoo.com",


//    "quiz_id" : 67

// }




// const updateCurrentLevel = (userData) => {

//     UserProfile.updateOne(
//         { 'topics.levels.quizId': userData.quiz_id }, // Match documents where quizId equals givenQuizId
//         { $set: { 'topics.$[topic].levels.$[level].score': userData.user_obtained_marks } }, // Update the score field
//         { arrayFilters: [{ 'topic.levels.quizId': userData.quiz_id }, { 'level.quizId': userData.quiz_id }] } // Array filters to identify the specific nested array elements
//       )
//         .then((result) => {
//           console.log('Updated successfully:', result);
//         })
//         .catch((error) => {
//           console.error('Error updating:', error);
//         });
    
//     // Update only specific fields of the user in the database
    
    
    
//     // For demonstration purposes, console.log is used to show the updated current level's total score
//     // console.log(`Updated total score for current level ${currentLevel}: ${totalScore}`);
// };

// const unlockNextLevel = (userData) => {
//     // Get the user's current level
//     const userProfData=UserProfile.findOne({email:userData.user_Email});
    
//     // Get the user's current level
//     const currentLevel = userProfData.currentLevel;
    
//     // Calculate total score for the current level
//     let totalScore = 0;
//     userProfData.topics.forEach((topic) => {
//         topic.levels.forEach((level) => {
//             if (level.levelId === currentLevel) {
//                 totalScore += level.score;
//             }
//         });
//     });
    
//     const totalPossibleScore = userProfData.topics.length * 100;
//     if ((currentLevel.totalScore / totalPossibleScore) * 100 >= 60) {
//       // Unlock next level
//       const nextLevel = currentLevel + 1;
//       console.log(`Unlock next level ${nextLevel}`);
//     }


//     User.findByIdAndUpdate(userData.user_Email, { $set: {currentLevel:nextLevel} }, { new: true })
//       .then((userData) => {
//         console.log('User updated successfully:', userData);
//       })
//       .catch((error) => {
//         console.error('Error updating user:', error);
//       });
    
//     // Calculate total possible score for the current level
  
//     // Check if the total score of the current level is >= 60% of the total possible score
//   };
  
//   const awardGem = (userProfData) => {
//     // Iterate through topics and levels
//     userProfData.topics.forEach((topic) => {
//       topic.levels.forEach((level) => {
//         // Check if the user's score for the current level is >= 70
//         if (level.score >= 70) {
//           // Award gem for the topic
//           // For demonstration purposes, console.log is used to show the awarded gem
//           console.log(`Award gem for topic ${topic.topicName}`);
//           // Update user data to reflect gem earned
//         }
//       });
//     });
//   };
  
//   // Call the functions with the user data to apply the gamification logic
//   updateCurrentLevel(userData);
//   unlockNextLevel(userData);
//   awardGem(userData);
  



// const userData = {  
//   "user_name": "LuckyFrog219",
//   "attempt_date": 1559632348,
//   "user_obtained_marks": 503,
//   "user_Email": "luckyfrog219@yahoo.com",
//   "quiz_id": 17
// };

const updateQuizScore = async (userData) => {
    try{
    
    const temp=await UserProfile.findOne({email:userData.bendData.user_Email,'topics.levels.levelId': userData.fendData.level, 'topics.topicName':userData.fendData.topic});
    if(temp!==null){
        console.log("Data already exists");
        await UserProfile.updateOne(
            { email:userData.bendData.user_Email,'topics.levels.levelId': userData.fendData.level, 'topics.topicName':userData.fendData.topic},
            { $set: { 'topics.$[topic].levels.$[level].score': userData.bendData.user_obtained_marks } },
            { arrayFilters: [{ 'topic.topicName': userData.fendData.topic },{'level.levelId':userData.fendData.level}] }
            // { arrayFilters: [{ 'topic.levels.level': userCurrentLevel }, { 'level.quizId': userData.bendData.quiz_id }] }
    
        );
     }else {
        // await UserProfile.push(
        //     {email:userData.bendData.user_Email, 'topics.topicName':userData.fendData.topic},
        //     {levelId:}
        // )
        console.log("Entered updating condition");
        const newData={levelId:userData.fendData.level,quizId:userData.bendData.quiz_id,score:userData.bendData.user_obtained_marks};
        console.log(newData);
        await UserProfile.findOne({email:userData.bendData.user_Email}).then((userProfile)=>{
            userProfile.topics.forEach((topic)=>{
                if(topic.topicName===userData.fendData.topic)
                {
                    topic.levels.push(newData);
                }
            })
            userProfile.save();
        })
     }
    

    
  }catch(err)
  {
    console.log("Current level not updated",err);
  }
};

const unlockNextLevel = async (userData) => {
  try {
    const userProfData = await UserProfile.findOne({ email: userData.bendData.user_Email }).exec();
    const currentLevel = userProfData.currentLevel;

    if(userData.fendData.level===currentLevel){

        let totalScore = 0;
        userProfData.topics.forEach((topic) => {
          topic.levels.forEach((level) => {
            if (level.levelId === currentLevel) {
              totalScore += level.score;
            }
          });
        });
        const totalPossibleScore = userProfData.topics.length * 100;
        if ((totalScore / totalPossibleScore) * 100 >= 60) {
          const nextLevel = currentLevel + 1;
          console.log(`Unlock next level ${nextLevel}`);
          await UserProfile.findByIdAndUpdate(userProfData._id, { currentLevel: nextLevel });
          console.log('User updated successfully');
        }
    }
  } catch (error) {
    console.error('Error unlocking next level:', error);
  }
};


const awardGem = async (userData) => {
    console.log(userData);
    try {
        if (userData.bendData.user_obtained_marks >= 70) {
        UserProfile.updateOne(
            {email:userData.bendData.user_Email, 'topics.topicName': userData.fendData.topic },
            { $set: { 'topics.$.gemEarned': true } }
        ).then((result) => {
            console.log(`Topic ${userData.fendData.topic }`);
        }).catch((error) => {
            console.error('Error updating gem:', error);
        });
        }else {
            UserProfile.updateOne(
                {email:userData.bendData.user_Email, 'topics.topicName': userData.fendData.topic },
                { $set: { 'topics.$.gemEarned': false } }
            ).then((result) => {
                console.log(`Topic ${userData.fendData.topic }`);
            }).catch((error) => {
                console.error('Error updating gem:', error);
            });
            }

    } catch (error) {
      console.error('Error finding user:', error);
    }
  };
  



const update_data=async (userData)=>{    
    await updateQuizScore(userData);
    await unlockNextLevel(userData);
    await awardGem(userData);

}

// update_data();
export default update_data;

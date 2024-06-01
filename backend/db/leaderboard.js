import mongoose from "mongoose";
import {UserScore,Leaderboard, UserProfile} from "../models/user.model.js"
// Function to generate user scores data
const generateUserScoresData1 = async (userProfiles) => {
    const userScoresData = [];
    // Iterate through each user profile
    for (const userProfile of userProfiles) {
        // Iterate through each topic
        for (const topic of userProfile.topics) {
            // Iterate through each level
            for (const level of topic.levels) {

                    userScoresData.push({
                        email: userProfile.email,
                        username:userProfile.username,
                        quizId: level.quizId,
                        score: level.score,
                        completedAt: new Date() // Assuming quizzes are completed at current time
                    });

            }
        }
    }
    try {
        console.log("userscore",userScoresData);
        await UserScore.insertMany(userScoresData);
        console.log("User scores data inserted successfully");
    } catch (error) {
        console.error("Error inserting user scores data:", error);
    }
};


const generateUserScoresData = async (userProfiles) => {
    const userScoresData = [];
    // Iterate through each user profile
    for (const userProfile of userProfiles) {
        const { email, username } = userProfile; // Extract common user information
        // Iterate through each topic
        for (const topic of userProfile.topics) {
            // Iterate through each level (quiz)
            for (const level of topic.levels) {
                // Push user score data for each quiz
                userScoresData.push({
                    email,
                    username,
                    quizId: level.quizId,
                    score: level.score,
                    completedAt: new Date() // Assuming quizzes are completed at current time
                });
            }
        }
    }
    try {
        // console.log("userscore", userScoresData);
        await UserScore.insertMany(userScoresData);
        console.log("User scores data inserted successfully");
    } catch (error) {
        console.error("Error inserting user scores data:", error);
    }
};

// Function to generate leaderboard data
const generateLeaderboardsData = async () => {
    try {
        // Aggregate total scores for each user
        const userTotalScores = await UserScore.aggregate([
            {
                $group: {
                    _id: { userId: "$userId", email: "$email", username: "$username" },
                    totalScore: { $sum: "$score" }
                }
            }
        ]);
        
        // Sort users by total score in descending order
        userTotalScores.sort((a, b) => b.totalScore - a.totalScore);

        // Assign ranks to users based on total score
        const leaderboardData = userTotalScores.map((user, index) => ({
            userId: user._id.userId,
            email: user._id.email,
            username: user._id.username,
            totalScore: user.totalScore,
            rank: index + 1
        }));

        // Insert leaderboard data
        await Leaderboard.insertMany(leaderboardData);
        console.log("Leaderboard data inserted successfully");
    } catch (error) {
        console.error("Error generating leaderboard data:", error);
    }
};


// Call the functions to generate user scores data and leaderboard data
const buildLeaderboard=async ()=>{
    const userProfiles = await UserProfile.find(); // Assuming user profiles are already generated
    await generateUserScoresData(userProfiles);
    await generateLeaderboardsData();
}

export default buildLeaderboard;
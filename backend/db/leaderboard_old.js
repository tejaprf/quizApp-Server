import mongoose from "mongoose";
import {UserScore,Leaderboard, UserProfile} from "../models/user.model.js"
// Function to generate user scores data
const generateUserScoresData = async (userProfiles) => {
    const userScoresData = [];
    // Iterate through each user profile
    for (const userProfile of userProfiles) {
        // Iterate through each theme
        for (const theme of userProfile.themes) {
            // Iterate through each level
            for (const level of theme.levels) {
                // Iterate through each quiz played
                for (const quiz of level.quizzesPlayed) {
                    userScoresData.push({
                        userId: userProfile.userId,
                        quizId: quiz.quizId,
                        score: quiz.score,
                        completedAt: new Date() // Assuming quizzes are completed at current time
                    });
                }
            }
        }
    }
    try {
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
                    _id: "$userId",
                    totalScore: { $sum: "$score" }
                }
            }
        ]);
        
        // Sort users by total score in descending order
        userTotalScores.sort((a, b) => b.totalScore - a.totalScore);

        // Assign ranks to users based on total score
        const leaderboardData = userTotalScores.map((user, index) => ({
            userId: user._id,
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
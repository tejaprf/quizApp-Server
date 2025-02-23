// import { User, Theme, UserProfile, UserScore, Leaderboard } from '../models/user.model.js';

// // Insert hardcoded data for each schema
// const insertSampleData = async () => {
//     try {
//         // Insert Users
//         const users = [
//             { username: 'user1', email: 'user1@example.com', passwordHash: 'password1' },
//             { username: 'user2', email: 'user2@example.com', passwordHash: 'password2' },
//             { username: 'user3', email: 'user3@example.com', passwordHash: 'password3' },
//             { username: 'user4', email: 'user4@example.com', passwordHash: 'password4' },
//             { username: 'user5', email: 'user5@example.com', passwordHash: 'password5' }
//         ];
//         await User.insertMany(users);

//         // Insert themes
//         const themes = [
//             { themeName: 'Science', description: 'Science related quizzes', levels: [
//                 { levelId: 1, quizzesAvailable: [
//                     { quizId: 1, quizUrl: 'science_quiz_1_url' },
//                     { quizId: 2, quizUrl: 'science_quiz_2_url' },
//                     { quizId: 3, quizUrl: 'science_quiz_3_url' },
//                     { quizId: 4, quizUrl: 'science_quiz_4_url' }
//                 ]},
//                 { levelId: 2, quizzesAvailable: [
//                     { quizId: 5, quizUrl: 'science_quiz_5_url' },
//                     { quizId: 6, quizUrl: 'science_quiz_6_url' },
//                     { quizId: 7, quizUrl: 'science_quiz_7_url' },
//                     { quizId: 8, quizUrl: 'science_quiz_8_url' }
//                 ]},
//                 { levelId: 3, quizzesAvailable: [
//                     { quizId: 9, quizUrl: 'science_quiz_9_url' },
//                     { quizId: 10, quizUrl: 'science_quiz_10_url' },
//                     { quizId: 11, quizUrl: 'science_quiz_11_url' },
//                     { quizId: 12, quizUrl: 'science_quiz_12_url' }
//                 ]},
//                 { levelId: 4, quizzesAvailable: [
//                     { quizId: 13, quizUrl: 'science_quiz_13_url' },
//                     { quizId: 14, quizUrl: 'science_quiz_14_url' },
//                     { quizId: 15, quizUrl: 'science_quiz_15_url' },
//                     { quizId: 16, quizUrl: 'science_quiz_16_url' }
//                 ]}
//             ]},
//             { themeName: 'Math', description: 'Math related quizzes', levels: [
//                 { levelId: 1, quizzesAvailable: [
//                     { quizId: 17, quizUrl: 'math_quiz_1_url' },
//                     { quizId: 18, quizUrl: 'math_quiz_2_url' },
//                     { quizId: 19, quizUrl: 'math_quiz_3_url' },
//                     { quizId: 20, quizUrl: 'math_quiz_4_url' }
//                 ]},
//                 { levelId: 2, quizzesAvailable: [
//                     { quizId: 21, quizUrl: 'math_quiz_5_url' },
//                     { quizId: 22, quizUrl: 'math_quiz_6_url' },
//                     { quizId: 23, quizUrl: 'math_quiz_7_url' },
//                     { quizId: 24, quizUrl: 'math_quiz_8_url' }
//                 ]},
//                 { levelId: 3, quizzesAvailable: [
//                     { quizId: 25, quizUrl: 'math_quiz_9_url' },
//                     { quizId: 26, quizUrl: 'math_quiz_10_url' },
//                     { quizId: 27, quizUrl: 'math_quiz_11_url' },
//                     { quizId: 28, quizUrl: 'math_quiz_12_url' }
//                 ]},
//                 { levelId: 4, quizzesAvailable: [
//                     { quizId: 29, quizUrl: 'math_quiz_13_url' },
//                     { quizId: 30, quizUrl: 'math_quiz_14_url' },
//                     { quizId: 31, quizUrl: 'math_quiz_15_url' },
//                     { quizId: 32, quizUrl: 'math_quiz_16_url' }
//                 ]}
//             ]},
//             { themeName: 'History', description: 'History related quizzes', levels: [
//                 { levelId: 1, quizzesAvailable: [
//                     { quizId: 33, quizUrl: 'history_quiz_1_url' },
//                     { quizId: 34, quizUrl: 'history_quiz_2_url' },
//                     { quizId: 35, quizUrl: 'history_quiz_3_url' },
//                     { quizId: 36, quizUrl: 'history_quiz_4_url' }
//                 ]},
//                 { levelId: 2, quizzesAvailable: [
//                     { quizId: 37, quizUrl: 'history_quiz_5_url' },
//                     { quizId: 38, quizUrl: 'history_quiz_6_url' },
//                     { quizId: 39, quizUrl: 'history_quiz_7_url' },
//                     { quizId: 40, quizUrl: 'history_quiz_8_url' }
//                 ]},
//                 { levelId: 3, quizzesAvailable: [
//                     { quizId: 41, quizUrl: 'history_quiz_9_url' },
//                     { quizId: 42, quizUrl: 'history_quiz_10_url' },
//                     { quizId: 43, quizUrl: 'history_quiz_11_url' },
//                     { quizId: 44, quizUrl: 'history_quiz_12_url' }
//                 ]},
//                 { levelId: 4, quizzesAvailable: [
//                     { quizId: 45, quizUrl: 'history_quiz_13_url' },
//                     { quizId: 46, quizUrl: 'history_quiz_14_url' },
//                     { quizId: 47, quizUrl: 'history_quiz_15_url' },
//                     { quizId: 48, quizUrl: 'history_quiz_16_url' }
//                 ]}
//             ]},
//             { themeName: 'Literature', description: 'Literature related quizzes', levels: [
//                 { levelId: 1, quizzesAvailable: [
//                     { quizId: 49, quizUrl: 'literature_quiz_1_url' },
//                     { quizId: 50, quizUrl: 'literature_quiz_2_url' },
//                     { quizId: 51, quizUrl: 'literature_quiz_3_url' },
//                     { quizId: 52, quizUrl: 'literature_quiz_4_url' }
//                 ]},
//                 { levelId: 2, quizzesAvailable: [
//                     { quizId: 53, quizUrl: 'literature_quiz_5_url' },
//                     { quizId: 54, quizUrl: 'literature_quiz_6_url' },
//                     { quizId: 55, quizUrl: 'literature_quiz_7_url' },
//                     { quizId: 56, quizUrl: 'literature_quiz_8_url' }
//                 ]},
//                 { levelId: 3, quizzesAvailable: [
//                     { quizId: 57, quizUrl: 'literature_quiz_9_url' },
//                     { quizId: 58, quizUrl: 'literature_quiz_10_url' },
//                     { quizId: 59, quizUrl: 'literature_quiz_11_url' },
//                     { quizId: 60, quizUrl: 'literature_quiz_12_url' }
//                 ]},
//                 { levelId: 4, quizzesAvailable: [
//                     { quizId: 61, quizUrl: 'literature_quiz_13_url' },
//                     { quizId: 62, quizUrl: 'literature_quiz_14_url' },
//                     { quizId: 63, quizUrl: 'literature_quiz_15_url' },
//                     { quizId: 64, quizUrl: 'literature_quiz_16_url' }
//                 ]}
//             ]}
//         ];

//         // Insert themes with levels and quizzes
//         for (const theme of themes) {
//             const themeDoc = await Theme.create(theme);
//             console.log(`Theme "${themeDoc.themeName}" inserted`);

//             // Update theme data to start with level 1
//             themeDoc.levels.forEach((level, index) => {
//                 level.levelId = index + 1;
//             });

//             await themeDoc.save();
//             console.log(`Levels for theme "${themeDoc.themeName}" updated`);
//         }

//         console.log('Sample data inserted successfully');
//     } catch (error) {
//         console.error('Error inserting sample data:', error);
//     }
// };

// export default insertSampleData;


import mongoose from "mongoose";
import {
    User,
    UserProfile,
    Topic,
    UserScore,
    Leaderboard
} from "../models/user.model.js";

import buildLeaderboard from "./leaderboard.js";
// Import your mongoose models

// Function to generate random usernames
const generateUsername = () => {
    const adjectives = [
        "Happy",
        "Clever",
        "Funny",
        "Brave",
        "Lucky",
        "Jolly",
        "Kind",
        "Calm"
    ];
    const nouns = [
        "Frog",
        "Tiger",
        "Bear",
        "Wolf",
        "Eagle",
        "Rabbit",
        "Lion",
        "Horse"
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 1000);
    return `${adjective}${noun}${number}`;
};

// Function to generate random email addresses
const generateEmail = (username) => {
    const domains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
        "example.com"
    ];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${
        username.toLowerCase().replace(/\s/g, "")
    }@${domain}`;
};

// Function to generate random passwords
const generatePassword = () => {
    return Math.random().toString(36).slice(-8); // Generate an 8-character random password
};

// Function to generate random scores for completed quizzes
const generateQuizScores = (curLevel,level) => {
    if(curLevel<level)
    return Math.floor(Math.random()*41)+60;
    return Math.floor(Math.random() * 101); // Random score between 0 and 100
};

// Function to generate users data
const generateUsersData = async (count) => {
    const usersData = [];
    for (let i = 1; i <= count; i++) {
        const username = generateUsername();
        const email = generateEmail(username);
        const passwordHash = generatePassword();
        usersData.push({username, email, passwordHash});
    }
    try {
        await User.insertMany(usersData);
        console.log("Users data inserted successfully");
    } catch (error) {
        console.error("Error inserting users data:", error);
    }
};

// Function to generate user profiles data
// Function to generate user profiles data
const generateUserProfilesData = async (count) => {
    const userProfilesData = [];
    // Generate user profiles for each user
    // for (let i = 1; i <= count; i++) {
        const users=await User.find();
        const topics_dat=await Topic.find();
        // console.log(topics_dat);
        let cnt=0;
     for (const user of users) {
        cnt+=1;
        const profile = {
            email: user.email, // Assuming user IDs start from 1 and increment by 1
            username:user.username,
            currentLevel: Math.floor(Math.random() * 4) + 1, // Random current level between 1 and 4
            topics: []
        };
        // Generate topics data for each user
        for (const top of topics_dat) {
            const topic = {
                topicName: top.topicName,
                levels: [],
                gemEarned:false
            };
            // console.log("Current level", topic.currentLevel);
            // Generate levels data for each topic
            for (let k = 1; k <= profile.currentLevel; k++) { // For each level, generate quizzes played by the user
                let curScore = 0;

                curScore = generateQuizScores(k,profile.currentLevel);
                // console.log(profile.username,k);
                // console.log("myobj",top.levels.find(level => level.levelId === k));
                // console.log("myobj",top);

                topic.levels.push({levelId: k, quizId: cnt*16+top.levels.find(level => level.levelId === k).quizId, score:curScore});

            }profile.topics.push(topic);
            // console.log(topic);


        }
        // console.log(profile);
        userProfilesData.push(profile);
        // console.log(profile.username)

    }
    try {
        console.log(userProfilesData);
        await UserProfile.insertMany(userProfilesData);
        console.log("User profiles data inserted successfully");
    } catch (error) {
        console.error("Error inserting user profiles data:", error);
    }
};


// Function to generate Topics data
const generateTopicData = async () => { // Generate Topics data...

    const topicsData = [
        {
            topicName: "Science",
            description: "Science related quizzes",
            levels: generateLevelsData(0)
        },
        {
            topicName: "Math",
            description: "Math related quizzes",
            levels: generateLevelsData(1)
        },
        {
            topicName: "History",
            description: "History related quizzes",
            levels: generateLevelsData(2)
        },
        {
            topicName: "Literature",
            description: "Literature related quizzes",
            levels: generateLevelsData(3)
        }
    ];

    try {
        await Topic.insertMany(topicsData);
        console.log("Topics data inserted successfully");
    } catch (error) {
        console.error("Error inserting Topics data:", error);
    }
};

// Function to generate levels data
const generateLevelsData = (topicId) => {
    const levelsData = [];
    for (let i = 1; i <= 4; i++) {
        levelsData.push({
            levelId: i,
            quizId: topicId*4+i,
            quizUrl: `quiz_${topicId*4+i}_url`
        });
    }
    return levelsData;
};




// Insert sample data
const insertSampleData = async () => {
    await generateUsersData(5);
    await generateTopicData();
    await generateUserProfilesData(5);
    await buildLeaderboard();
    console.log('Sample data inserted successfully');
};

export default insertSampleData;

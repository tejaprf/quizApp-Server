import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Users schema
const userSchema = new Schema({
    username: { type: String, required: true,unique:true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
    // curLevel:{type:In}
});

const User = mongoose.model('User', userSchema);



//User profile schema
const userProfileSchema = new Schema({
    userId: { type: Number, unique: true }, // Reference to the user
    themes: [{
        themeId: { type: Number},
        currentLevel: { type: Number,required:true}, // Reference to the current level of the user
        levels: [{
            levelId: { type: Number},
            quizzesPlayed: [{
                quizId:{type:Number},
                score:{type:Number}
            }],
            totalScore: { type: Number }, // Total score in the level
            maxScore: { type: Number } // Max score achieved in the level
        }]
    }],
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);




// Themes schema
const themeSchema = new Schema({
    themeName: { type: String, required: true },
    themeId:{type:Number},
    description: { type: String },
    levels: [{
        levelId: {type:Number},
        quizzesAvailable: [{
            quizId:{ type: Number},
            quizUrl:{type:String, required:true}
        }]
    }]
    
});

const Theme = mongoose.model('Theme', themeSchema);



// UserScores schema
const userScoreSchema = new Schema({
    userId: { type: Number, required: true },
    quizId: { type: Number, required: true },
    score: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now }
});

const UserScore = mongoose.model('UserScore', userScoreSchema);

// Leaderboards schema
const leaderboardSchema = new Schema({
    userId: { type: Number, ref: 'User', required: true },
    totalScore: { type: Number, required: true },
    rank: { type: Number }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Exporting the models
export {User,Theme,UserProfile,UserScore,Leaderboard};

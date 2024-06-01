import express from "express";
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User,UserProfile } from "../models/user.model.js";


const router=express.Router();
const app = express();

// Configure session middleware
router.use(session({
  secret: 'Z(])Fho}a+acZnZ&VI=^z?W|S0+?fA', // <-- Secret key for session encryption
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// Configure Passport Local Strategy for user authentication
// passport.use(new LocalStrategy(
//     // if {userEmail:'sample@sample.com',passWORD:'mypasword'} is object that we get from req.body, then map will be {email:userEmail,password:passWORD}

//     {usernameField:'email',passwordField:'password'},
//   async (email, password, done) => {
//     try {
//       // Find user in the database
//       const user = await User.findOne({ email:email, passwordHash:password });
//       if (user) {
//         return done(null, user);
//       } else {
//         if(await User.findOne({email:email}))
//         return done(null, false, { message: 'Incorrect email or password' });
//         else{
//             return done(null,false,{message:'User doesnot exists'});
//         }
//       }
//     } catch (error) {
//       return done(error);
//     }
//   }
// ));

// // Serialize user object into session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user object from session
// passport.deserializeUser(async (id, done) => {
//   try {
//     // Find user in the database
//     const user = await User.findById(id);
//     if (user) {
//       done(null, user);
//     } else {
//       done(new Error('User not found'));
//     }
//   } catch (error) {
//     done(error);
//   }
// });

// // Define login route
// //why is passport used? once /signin returns true it will return true for all users if /login page is accessed. So it gets mixedup. To prevent mixing of each user login, we used this
// // router.post('/signin', passport.authenticate('local'), (req, res) => {
// //   // This function will only be called if authentication is successful
// //   console.log(req.body);
// //   res.send('Login successful');
// // });


// router.post('/signin', (req, res) => {
//     passport.authenticate('local', (err, user, info) => {
//       if (err) {
//         // Handle error
//         return res.status(500).json({ message: 'Internal server error' });
//       }
//       if (!user) {
//         // Authentication failed
//         return res.status(401).json({ message: 'Incorrect email or password' });
//       }
//       // Authentication successful
//       req.login(user, (err) => {
//         if (err) {
//           return res.status(500).json({ message: 'Internal server error' });
//         }
//         console.log(req.body);
//         return res.status(200).json({ message: 'Login successful' });
//       });
//     })(req, res);
//   });
  

passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        // Find user in the database
        const user = await User.findOne({ email: email });
        if (user) {
          // User found, check password
          const isPasswordValid = await User.findOne({email:email,passwordHash:password});
          if (isPasswordValid) {
            // Password matches, login successful
            return done(null, user);
          } else {
            // Incorrect email or password
            return done(null, false, { message: 'Incorrect email or password' });
          }
        } else {
          // User does not exist
          return done(null, false, { message: 'User does not exist' });
        }
      } catch (error) {
        return done(error);
      }
    }
  ));
  
  // Serialize user object into session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize user object from session
  passport.deserializeUser(async (id, done) => {
    try {
      // Find user in the database
      const user = await User.findById(id);
      if (user) {
        done(null, user);
      } else {
        done(new Error('User not found'));
      }
    } catch (error) {
      done(error);
    }
  });
  
  // Define login route
  router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        // Handle error
        return res.json({ message: 'Internal server error' });
      }
      if (!user) {
        // Authentication failed
        return res.json({ message: info.message });
      }
      // Authentication successful
      req.login(user, (err) => {
        if (err) {
          return res.json({ message: 'Internal server error' });
        }
        // console.log(req.body);
        return res.json({ message: 'Login successful' });
      });
    })(req, res, next);
  });
  


// Define logout route
router.get('/signout', (req, res) => {
  req.logout(); // Destroy the user's session
  res.send('Logout successful');
});



  



// router.get('/signup',signup);           //get request. So when doing api hit for this, use get request.

// router.get('/login',login);

// router.get('/logout',logout);


async function insertUserProfile(user) {
    try {
        // Retrieve topics data
        const topics_dat = await Topic.find();

        // Initialize user profile object
        const profile = {
            email: user.email,
            username: user.username,
            currentLevel: 1,
            stageCleared: false,
            topics: []
        };

        // Generate topics data for the user
        for (const top of topics_dat) {
            const topic = {
                topicName: top.topicName,
                gemEarned: false,
                levels: []
            };

                // Generate quiz scores for each level
                const curScore = generateQuizScores(k, profile.currentLevel);
                // Push level data into topic levels array
                topic.levels.push({
                    levelId: k,
                    quizId: k, // Replace this with your logic to generate quiz IDs
                    score: curScore
                });

            // Push topic data into user's topics array
            profile.topics.push(topic);
        }

        // Create and save the user profile
        const newUserProfile = new UserProfile(profile);
        await newUserProfile.save();
        console.log('User profile inserted successfully.');
    } catch (error) {
        console.error('Error inserting user profile:', error);
    }
}


export const signup=async (req,res)=>{
    
    console.log('Signup done. Data received');
    // console.log(req.body);
    const formData=req.body;
    const userData = {
        email: formData.email,
        passwordHash: formData.password,
        username: formData.fullName,
        age: formData.age,
        contact: formData.contact,
        city: formData.city,
        school: formData.school
    };
    try{
        await User.create(userData);
        await insertUserProfile(userData);
    }catch(err){
        console.log("User not added",err);
    }

}


export default router;

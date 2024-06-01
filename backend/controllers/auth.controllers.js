import { User } from "../models/user.model.js";

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
    }catch(err){
        console.log("User not added",err);
    }

}





// Define logout route


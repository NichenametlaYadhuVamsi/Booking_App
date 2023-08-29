import jwt from "jsonwebtoken"

export let cookie= (user,res,message,statuscode)=>{
    // console.log('Hello cookie')
    let token =jwt.sign({_id:user._id,},process.env.Secret)
    res.cookie("token",token,{
        maxAge:24*60*60*1000,
        httpOnly:true,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    })

    res.status(statuscode).json(user)

} 
export class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode=statuscode
    }
}



let errorMiddleWre= (err,req,res,next)=>{
    console.log(err.message)
    console.log(err.statuscode)
    err.message=err.message || "Internal Server Error"
    err.statuscode=err.statuscode|| 500
    res.status(err.statuscode).json({
        success:false,
        message:err.message
    })
}

export default errorMiddleWre

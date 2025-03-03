const express= require("express");
const authMiddleware= require("../middlewares/auth")
const router= express.Router();
router.get("/dasboard",authMiddleware,(req,res)=>{
    if(req.user.role!==admin){
        return res.status(403).json({message: "Access Denied"});
    }
    else{
        res.json({message: "Wellcome in Admindashboard"});
    }

})
module.exports= router
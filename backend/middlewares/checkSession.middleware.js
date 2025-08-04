export const checkSession = (req, res, next)=>{
    const sessionId = req.cookies["ASP.NET_SessionId"];
    const cookieToken = req.cookies["__RequestVerificationToken"];
    if(!sessionId || !cookieToken){
        return res.status(401).json({message: "session is missing"});
    }
    next();
}
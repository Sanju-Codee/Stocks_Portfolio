function logout (req,res){
    res.clearCookie("token")
    res.status(200).send("Logged out successfully")
}

export default logout
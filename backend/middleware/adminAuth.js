import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.json({sucess:"false", messasge:"Not Authorized"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({sucess:"false", messasge:"Not Authorized"})
        }
        next()
    } catch (error) {
        console.log(error)
        return res.json({sucess:"false", messasge:error.messasge})
    }
}

export default adminAuth
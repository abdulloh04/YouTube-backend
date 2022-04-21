import JWT from '../utils/jwt.js'


export default (req, res, next) => {
    try {
        let token = req.headers.token
    if(!token) {
        return res.status(403).json({
            message: "Token is required!"
        })
    }

    JWT.verify(token)

    req.myIp = JWT.verify(token).ip
    req.agent = JWT.verify(token).agent
    req.userId = JWT.verify(token).userId


    next()
    } catch (error) {
        return res.status(403).json({
            message: "You are not allowed!"
        })
    }
}
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'


function middleware ({ databasePath }) {
    return (req, res, next) => {
        req.readFile = function(fileName) {
            const jsonData = fs.readFileSync(path.join(databasePath, fileName + '.json'), 'utf-8') || []  
            return jsonData.length ? JSON.parse(jsonData) : jsonData
            
        }
        req.writeFile = function(fileName, data) {
            fs.writeFileSync(path.join(databasePath, fileName + '.json'), JSON.stringify(data, null, 4))
        }
        return next()
    }
}


function checkToken (req, res, next) {
    try {
        let token = req.headers.token

    if(!token) {
        return res.status(403).json({
            message: "Token is required!"
        })
    }

    jwt.verify(token, "project")


    next()
    } catch (error) {
        return res.status(403).json({
            message: "You are not allowed!"
        })
    }
}

export default {
    middleware,
    checkToken
}
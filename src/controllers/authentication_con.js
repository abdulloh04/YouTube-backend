import jwt from "../utils/jwt.js"
import path from "path"
import sha256 from "sha256"



const LOGIN = (req, res) => {
    try {
        const { username, password } = req.body

        const users = req.readFile("users")

        if (!users.length) throw new Error("There is no data in the database")

        const user = users.find(el => el.username == username.toLowerCase() && el.password == sha256(password))

        if (!user) {
            throw new Error("Wrong username/password")
        }



        res.status(200).json({
            status: 200,
            message: "successful logged in",
            token: jwt.sign({
                userId: user.userId,
                ip: req.ip,
                agent: req.headers['user-agent']
            })
        })


    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}


const REGISTER = (req, res) => {
    try {

        const users = req.readFile("users")

        let body = req.body
        const fileName = Date.now() + req.files.avatar.name.replace(/\s/g, "")

        if (users.some(el => el.username == body.username.toLowerCase())) {
            throw new Error("The username already exists!")
        }

        body.password = sha256(body.password)
        body.avatar = fileName
        body.userId = users.length ? users.at(-1).userId + 1 : 1

        req.files.avatar.mv(path.join(process.cwd(), 'src', 'uploads', 'avatar', fileName))


        users.push(body)

        req.writeFile('users', users)


        res.status(200).json({
            status: 200,
            message: "Successful register",             
            token: jwt.sign({
                userId: body.userId,
                ip: req.ip,
                agent: req.headers['user-agent']
            })
        })

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}




export default {
    LOGIN, REGISTER
}
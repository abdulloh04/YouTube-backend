import fileUpload from "express-fileupload"
import { networkInterfaces } from "os"
import express from "express";
import cors from "cors"
import path from "path"

console.clear();

import modelMiddleware from './src/middlewares/model.js'
import tokenMiddleware from './src/middlewares/checkToken.js'

import routerAuthentication from "./src/routes/authentication.js"
import routerHome from "./src/routes/home.js"
import routerAdmin from "./src/routes/admin.js"

process.PORT  = process.env.PORT || 5000
process.IPV4 = networkInterfaces()['wlp0s20f3'][0].address
process.HOST = 'http://' + process.IPV4 + ':' + process.PORT

// TOP

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(modelMiddleware.middleware({ databasePath: path.join(process.cwd(), 'src', 'database')}))
app.use("/admin", tokenMiddleware)

//******* 


app.use(routerAuthentication)
app.use(routerHome)
app.use(routerAdmin)



app.get("/view/:fileName",  (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'uploads', 'video', req.params.fileName))
})

app.get("/profile/:fileName",  (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'uploads', 'avatar', req.params.fileName))
})

app.get("/download/:fileName", (req, res) => {
    res.download(path.join(process.cwd(), 'src', 'uploads', 'video', req.params.fileName))
})






app.listen(process.PORT, () => {
    console.log(process.HOST );
})
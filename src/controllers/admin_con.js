import byteSize from "byte-size"
import path from 'path'

const GET = (req, res) => {
    try {
        const users = req.readFile("users")
        const dates = req.readFile("dates")

        users.forEach(el => {
            delete el.password
            delete el.email
            el.avatar = process.HOST + '/profile/' + el.avatar
            el.videos = dates.filter(val => {

                val.view = process.HOST + '/view/' + val.videoName
                val.download = process.HOST + '/download/' + val.videoName
                delete val.videoName
                if (val.userId == el.userId) return val
            })
        })

        res.json({ users, userId: req.userId })

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

const POST = (req, res) => {
    try {

        const data = req.readFile('dates')

        const date = new Date()

        const fileName = Date.now() + req.files.video.name.replace(/\s/g, "")

        const { value, unit } = byteSize(req.files.video.size)

        let body = req.body

        if (  unit == 'GB' || value > 20 && unit == 'MB' ) {
            throw new Error("Limit 20 megabytes")
        }

        body.title = body.title.toLowerCase()
        body.videoName = fileName
        body.size = `${value}.${unit}`
        body.date = date.toLocaleString()
        body.userId = req.userId
        body.dataId = data.length ? data.at(-1).dataId + 1 : 1

        req.files.video.mv(path.join(process.cwd(), 'src', 'uploads', 'video', fileName))

        data.push(body)

        req.writeFile("dates", data)

        res.status(201).json({
            status: 201,
            message: "Added video",
            body
        })


    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}


const PUT = (req, res) => {
    try {

        const { title, dataId } = req.body


        const data = req.readFile("dates")

        let myDates = data.filter(el => el.userId == req.userId)

        

        if (!myDates.length) {
            throw new Error("You don't have data")
        }
        

        let updated = myDates.find(el => el.dataId == dataId)

        if (!updated) {
            throw new Error("This is not your date")
        }

        updated.title = title.trim()

        if (!updated.title) {
            throw new Error("Invalid title")
        }

        req.writeFile("dates", data)


        res.status(201).json({
            status: 201,
            message: "Updated title",
            body: updated
        })

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}


const DELETE = (req, res) => {
    try {
        const { id } = req.params

        const data = req.readFile("dates")

        let myDates = data.filter(el => el.userId == req.userId)

        if (!myDates.length) {
            throw new Error("You don't have data")
        }

        let deletedData = myDates.find(el => el.dataId == id)

        if (!deletedData) {
            throw new Error("This is not your date")
        }

        let result = data.filter(el => el.dataId != deletedData.dataId)

        req.writeFile("dates", result)

        res.status(201).json({
            status: 201,
            message: "Updated title",
            body: deletedData
        })


    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export default {
    GET, POST, PUT, DELETE
}
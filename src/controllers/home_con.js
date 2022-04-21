const search = (req, res) => {
    try {
        const dates = req.readFile("dates")
        const users = req.readFile("users")
        const { title } = req.query

        let data = dates.filter(el => el.title.includes(title))


        data.forEach(el => {
            users.forEach(user => {

                if (el.userId == user.userId) el.username = user.username
                el.avatar = process.HOST + '/profile/' + user.avatar
            })

            el.view = process.HOST + '/view/' + el.videoName
            el.download = process.HOST + '/download/' + el.videoName
            delete el.videoName
        });

        res.json(data)

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

const videos = (req, res) => {
    try {
        const dates = req.readFile("dates")
        const users = req.readFile("users")
        const { userId } = req.params

        dates.forEach(el => {
            users.forEach(user => {
                if (el.userId == user.userId) {
                    el.username = user.username
                    el.avatar = process.HOST + '/profile/' + user.avatar
                }

                
            })

            el.view = process.HOST + '/view/' + el.videoName
            el.download = process.HOST + '/download/' + el.videoName
            delete el.videoName
        });

        let data = dates.filter(el => {
            let byId = +userId ? el.userId == userId : true
            return byId
        })

        res.json(data)

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}


const users = (req, res) => {
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
                // delete val.videoName
                if (val.userId == el.userId) return val
            })
        })

        res.send(users)

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export default {
    search, videos, users
}
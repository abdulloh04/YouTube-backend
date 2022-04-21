import { loginSchema, registerSchema, adminSchema, adminSchemaPut } from "../utils/validations.js"

export default (req, res, next) => {
    if (req.url == '/login') {
        const { error } = loginSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    if (req.url == '/register') {
        if (!req.files) {
            return res.status(400).json({
                status: 400,
                message: "Profile image required!"
            })
        }

        const { mimetype } = req.files.avatar

        if (!req.files || !['image/jpeg', 'image/jpg', 'image/png'].includes(mimetype)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid image format!"
            })
        }
        const { error } = registerSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }


    if (req.url == "/admin" && req.method == 'POST') {
        const { error } = adminSchema.validate(req.body)

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        }

        const { mimetype } = req.files.video

        if (!req.files || 'video/mp4' != mimetype) {
            return res.status(400).json({
                status: 400,
                message: "Invalid video format!"
            })
        }


    }


    if (req.url == "/admin" && req.method == 'PUT') {
        const { error } = adminSchemaPut.validate(req.body)
        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    return next()

}
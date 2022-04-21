import Joi from 'joi'

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const registerSchema = Joi.object({
    username: Joi.string().min(2).max(30).alphanum().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{4,20}$/).required(),
})

export const adminSchema = Joi.object({
    title:Joi.string().min(1).max(30).required()
})

export const adminSchemaPut = Joi.object({
    title:Joi.string().min(1).max(30).required(),
    dataId: Joi.required()
})



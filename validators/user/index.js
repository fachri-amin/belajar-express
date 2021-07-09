const Joi = require('joi');

module.exports = { 
    register: async (req, res, next) => {
        const data = req.body;

        const registerSchema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'any.required':'email harus diisi',
                    'string.email':'email tidak valid',
                }),
            password: Joi.string()
                .regex(/[a-zA-Z0-9]{3,30}/)
                .required()
                .messages({
                    'any.required':'password harus diisi',
                    'string.regex':'password tidak valid',
                }),
            confirmPassword: Joi.string()
                .regex(/[a-zA-Z0-9]{3,30}/)
                .required()
                .messages({
                    'any.required':'konfirmasi password harus diisi',
                    'string.regex':'konfirmasi password tidak valid',
                }),
            firstName: Joi.string()
                .required()
                .messages({
                    'any.required':'nama depan harus diisi',
                }),
            lastName: Joi.string()
                .required()
                .messages({
                    'any.required':'nama belakang harus diisi',
                }),
        });

        if (data.password !== data.confirmPassword) return res.json({
            message: 'Konfirmasi password salah!'
        })

        try {
            await registerSchema.validateAsync(data, {abortEarly: false});
            next();
        }
        catch (err) {
            res.json(err)
        }
    },
    login: async (req, res, next) => {
        const data =  req.body;
        const loginSchema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'any.required':'email harus diisi',
                    'string.email':'email tidak valid',
                }),
            password: Joi.string()
                .regex(/[a-zA-Z0-9]{3,30}/)
                .required()
                .messages({
                    'any.required':'password harus diisi',
                    'string.regex':'password tidak valid',
                }),
        });

        try {
            await loginSchema.validateAsync(data, {abortEarly: false});
            next();
        }
        catch (err) {
            res.json(err)
        }
    }
}
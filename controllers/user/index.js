const {User} = require('../../models');
const {generateHash, compareHash, generateJwt} = require('../../utils/auth');
const checkUnique = require('../../utils/checkUnique');

module.exports = {
    me: async (req, res) => {
        const user = await User.findOne({where: {email: req.user}});
        res.json({user});
    },
    register: async (req, res) => {
        const body = req.body;
        await checkUnique(res, User, {email: body.email}, 'email');

        body.password = await generateHash(body.password);
        delete body.confirmPassword
        const newUser = await User.create(body);
    
        if (newUser instanceof User) {
            res.json({
                message: 'Berhasil mendaftar',
                isRegistered: true
            });
        } else {
            res.json({
                message: 'Terjadi Kesalahan',
                isRegistered: false
            })
        }
    },
    login: async (req, res) => {
        try {
            const body = req.body;
            const user = await User.findOne({where: {email: body.email}});
    
            if (!user) return res.json({message: 'Email atau password salah'});
            
            const match = await compareHash(body.password, user.password);
            if (match) {
                const jwt = await generateJwt(user.email)
                return res.json({
                    token: jwt,
                    user
                })
            }
            else return res.json({message: 'Email atau password salah'});
        } catch (error) {
            return res.json({error: 'Something error'})
        }
    }
}
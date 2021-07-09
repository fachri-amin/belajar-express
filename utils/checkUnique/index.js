module.exports = async (res, model, term, label=null) => {
    if (await model.findOne({where: term})) {
        res.json({
            error: 'Unique field',
            message: `${label} telah digunakan`
        })
    };  
}
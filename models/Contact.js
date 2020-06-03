const {Schema, model} = require('mongoose')

const schema = new Schema({
    con_name: {
        type: String,
        required: false
    },
    con_fam: {
        type: String,
    },
    con_number: {
        type: {},
    },
    con_country: {
        type: String,
    },
    con_phon:{
        type: {},
    }

})

module.exports = model('Contact', schema)

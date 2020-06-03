const {Schema, model} = require('mongoose')

const schema = new Schema({
    city_name: {
        type: String,
    },
    temperature: {
        type: Number,
    },
    wind_speed: {
        type: String,
    },
    con_country: {
        type: String,
    },
    visibility: {
        type: Number,
    },
    pressure: {
        type: Number,
    },
    icon_id: {
        type: {},
    },
    main: {
        type: String,
    },
    description: {
        type: String,
    }

})

module.exports = model('Wheather', schema)

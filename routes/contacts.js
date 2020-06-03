const {Router} = require('express')
const request = require('request-promise')
const Contact = require('../models/Contact')
const Wheather = require('../models/Wheather')
const router = Router()
let url = "http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&appid=f3f41eaab454f381740604334c01cc20"


router.get('/', async (req, res) => {
    const cont = await Contact.find({})
    let Contac = {};
    let obj = [];
    for (let i = 0; i < cont.length; i++) {
        Contac = {
            id: cont[i]._id,
            num: i + 1,
            con_name: cont[i].con_name,
            con_fam: cont[i].con_fam,
            con_phon: cont[i].con_phon,
            con_country: cont[i].con_country
        }
        obj.push(Contac)
    }

    const options = {
        method: 'POST',
        uri: url,
        json: true
        // Тело запроса приводится к формату JSON автоматически
    }

    request(options).then(function (response) {
        const wheat = {}
        let temperature = (response.main.temp - 273, 15)
        wheat.temperature = Math.round(temperature)
        wheat.city_name = response.name
        wheat.wind_speed = response.wind.speed
        wheat.visibility = response.visibility / 1000
        wheat.pressure = response.main.pressure
        wheat.description = response.weather[0].description
        wheat.main = response.weather[0].main
        wheat.icon_id = response.weather[0].icon
        res.render('ind', {
            title: "Телефонная книга",
            obj, wheat
        })
    })
        .catch(function (err) {
            // Работа с ошибкой
        })
})


router.get('/create', (req, res) => {
    res.render('create', {
        title: "create page"
    })
})


router.post('/create', async (req, res) => {

        let varik = [], mad1 = [], mam1 = [], con_num = []
        if (typeof (req.body.id) === 'string') {
            con_num.push(req.body.id)
            varik.push(req.body.con_number)
        } else {
            con_num = req.body.id
            varik = req.body.con_number
        }

        if (varik) {
            if (varik.length > 0) {

                let mas_ob = new Map();

                for (let i = 0; i < varik.length; i++) {
                    let key = con_num[i]
                    let val = varik[i]
                    mas_ob.set(key + i, val)
                }
                let rex = new RegExp("Дом")
                for (let pair of mas_ob.entries()) {
                    if (rex.exec(pair[0])) {
                        mam1.push(pair[1])
                    } else
                        mad1.push(pair[1])
                }
            }
        }
        let baza = {}

        baza.mob = mad1
        baza.dom = mam1

        const cont = new Contact({
            con_name: req.body.con_name,
            con_fam: req.body.con_fam,
            con_country: req.body.con_country,
            con_phon: baza
        })

        await cont.save()


        res.redirect('/')
    }
)

router.post('/del', async (req, res) => {
    var id = req.body.id;
    Contact.findByIdAndDelete(id, function (err, doc) {
        if (err) return console.log(err);
        console.log("Удален пользователь ", doc);
    });
    res.redirect('/')
})

router.post('/change', async (req, res) => {
    let tel_mob = req.body.tel_mob
    let tel_dom = req.body.tel_dom
    let var_tel = [], mad1 = [], mam1 = [], con_num = []
    if (typeof (req.body.newtelch) === 'string') {
        con_num.push(req.body.newtelch)
        var_tel.push(req.body.var_tel)
    } else {
        con_num = req.body.newtelch
        var_tel = req.body.var_tel
    }
    if (var_tel) {
        if (var_tel.length > 0) {

            let mas_ob2 = new Map();

            for (let i = 0; i < var_tel.length; i++) {
                let key = var_tel[i]
                let val = con_num[i]
                mas_ob2.set(key + i, val)
            }
            console.log(mas_ob2)
            let rex = new RegExp("Дом")
            for (let pair of mas_ob2.entries()) {
                if (rex.exec(pair[0])) {
                    mam1.push(pair[1])
                } else
                    mad1.push(pair[1])
            }
        }
    }
    let Obgr_tel = {}

    let mas1 = mad1.concat(tel_mob)
    let mas2 = mam1.concat(tel_dom)
    let maas = [], maad = [];
    for (let i = 0; i < mas1.length; i++) {
        if (mas1[i]) {
            console.log(mas1[i])
            maas.push(mas1[i])
        }
    }
    for (let i = 0; i < mas2.length; i++) {
        if (mas2[i]) {
            maad.push(mas2[i])
        }
    }


    Obgr_tel.mob = maas
    Obgr_tel.dom = maad
    const id = req.body.id;

    function opo(old, neww) {
        if (neww) {
            return neww
        } else return old
    }

    let newname = opo(req.body.oldname, req.body.con_name)
    let newfam = opo(req.body.oldfam, req.body.con_fam)
    let newcon = opo(req.body.oldcountry, req.body.con_country)

    Contact.findByIdAndUpdate(id, {
        con_name: newname,
        con_fam: newfam,
        con_country: newcon,
        con_phon: Obgr_tel

    }, function (err, Contact) {
        if (err) return console.log(err);
    });

    res.redirect('/')
})


module.exports = router

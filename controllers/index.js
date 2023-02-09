const { Laundry, Order, UserProfile } = require("../models")
const formatCurrency = require('../helper/formatCurrency')
const easyinvoice = require('easyinvoice');

class Controller {
    static redirect(req, res) {
        res.redirect("/home")
    }
    static home(req, res) {
        res.render("home")
    }
    static showLaundry(req, res) {
        const { order } = req.query
        const option = {}
        console.log(order);

        if (order) {
            option.order = [
                [`${order}`]
            ]
        }
        Laundry.findAll(option)
            .then(laundries => {
                res.render("laundry", { laundries })
            }).catch(err => res.send(err))
    }

    static showOrder(req, res) {
        Order.findAll({
            include: [Laundry]
        })
            .then(orders => {
                res.render("order", { orders, formatCurrency})
            }).catch(err => res.send(err))
    }

    static addLaundry(req, res) {
        const { errors } = req.query
        res.render("add-laundry", { errors })
    }

    static createLaundry(req, res) {
        // const { id } = req.params
        const { name, address } = req.body
        Laundry.create({ name, address })
            .then(() => res.redirect("/laundries"))
            .catch(err => {
                if (err.name == "SequelizeValidationError") {
                    const errors = err.errors.map(el => {
                        return el.message
                    })
                    res.redirect(`/laundries/add?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static editLaundry(req, res) {
        // res.render("edit-laundry")
        const { id } = req.params
        Laundry.findByPk(id)
            .then(laundries => res.render("edit-laundry", { laundries }))
            .catch(err => res.send(err))
    }

    static updateLaundry(req, res) {
        // res.redirect("/laundries")
        // res.send("test")
        // console.log(req.body);
        const { id } = req.params
        const { name, address } = req.body
        // res.send(name, address)
        console.log(name, address, id);
        
        // console.log(name, address);
        Laundry.update({ name, address }, {
            where: {
                id
            }
        })
        .then(() => res.redirect("/laundries"))
        .catch((err) => res.send(err))
    }

    static destroyLaundry(req, res) {
        const { id } = req.params;
        console.log(id);
        Laundry.destroy({
            where: {
                id
            }
        })
            .then(() => res.redirect("/laundries"))
            .catch(err => res.send(err))
    }
}

module.exports = Controller;
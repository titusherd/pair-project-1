
const bcrypt = require('bcryptjs');

const { User, UserDetail, Product, Category } = require('../models');
// const { currencyFormat } = require('../helper');
// const { Op, where } = require('sequelize');

class UserController {
//   static getHome(req, res) { 
//     const { userId, role } = req.session;
//     let {search, param, type, sortBy} = req.query
//     let include = {model: Category}
//     let where = {};
//     let order;
//     let statement;
//     let tipeSort = `ASC`
//     if(type) tipeSort = type
//     if(sortBy) order = [[`${sortBy}`, tipeSort]]
//     if(search === `byName`) where = {name: { [Op.iLike] : `%${param}%`}}
//     if(search === `byBrand`) where = {brand: { [Op.iLike] : `%${param}%`}}
//     if(order) statement = {include, where, order};
//     else statement = {include, where}
//     Product.findAll(statement)
//         .then(getHome => res.render('home', { getHome, currencyFormat, userId, role }))
//         .catch(err => res.send(err))
//   }

  static showRegister(req, res) {
    const { errors } = req.query;
    res.render('register', { errors });
  }

  static createUser(req, res) {
    const { 
      email, password, role, fullName,profilePicture
    } = req.body;

    User.create({ email, password, role })
      .then(createdUser => {
        const { id } = createdUser;
        return UserProfile.create({ fullName, profilePicture, UserId:id})
      })
      .then(() => res.redirect('/login'))
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          const errors = err.errors.map(({message}) => {
            return message;
          })
          res.redirect(`/register?errors=${errors}`)
        } else {
          res.send(err);
        }
      });
  }

  static showLogin(req, res) {
    const { error } = req.query;
    res.render('login', { error });
  }

  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) {
          const error = "The email address you entered isn't connected to an account.";
          return res.redirect(`/login?error=${error}`);
        }

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
          const error = "The password that you've entered is incorrect.";
          return res.redirect(`/login?error=${error}`);
        }

        req.session.userId = user.id;
        req.session.role = user.role;
        res.redirect('/');
      })
      .catch(err => res.send(err));
  }

  static logout(req, res) {
    req.session.destroy(err => {
      if (err) return res.send(err);
      res.redirect('/login');
    })
  }
}

module.exports = UserController;
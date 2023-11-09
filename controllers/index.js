const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('config');

function home (req, res, next) {
    res.render('index', { title : 'Express' });
}

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const JwtKey = config.get('secret.key');

    User.findOne({ "_email" : email })
        .then(user => {
            if (user) {
                bcrypt.hash(password, user.salt, (err, hash) => {
                    if (err) {
                        res.status(403).json({
                            message: "Usuario y contraseña incorrecto",
                            obj: err
                        });
                    }

                    if (hash === user.password) {
                        res.status(200).json({
                            message: "Login ok",
                            // -> stateless: no se distingue entre los roles del usuario, por lo que no hay discriminacion
                            //    por lo que se usa el payload del toke para guardarlo pero en el token viene esa informacion
                            //    para discriminar
                            // -> Definir el armado de un jwt valido, nos pide tres cosas
                            //    objeto con la informacion, normalmente es el id para poder usarlo en el futuro
                            obj: jwt.sign({ data:user.data, exp:Math.floor(Date.now() / 1000)+600 }, JwtKey)
                        });
                    } else {
                        res.status(403).json({
                            message: "Usuario y contraseña incorrecto",
                            obj: null
                        });
                    }
                });
            } else {
                res.status(403).json({
                    message: "Usuario y contraseña incorrecto",
                    obj: null
                });
            }
        }).catch(ex => res.status(403).json({
            message: "Usuario y contraseña incorrecta",
            obj: ex
        }));
}

module.exports = {
    home,
    login
}
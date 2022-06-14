const express = require('express');

const configViewEngine = (app) => {
    //* buat Static files
    app.use(express.static('client/public'))
    //* Set view engine
    app.set('views', './client/views')
    app.set('view engine', 'ejs')
}

module.exports = configViewEngine;
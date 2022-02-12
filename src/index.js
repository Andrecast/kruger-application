/* express: utilizo este módulo de Node para crear un servidor de manera más simple */
/* morgan: con la opción dev, la utilizo para ver por consola las peticiones que van llegando */
const express = require('express');
const morgan = require('morgan');

const infoRoutes = require('./routes/info.routes');

const app = express();
app.use(morgan('dev'));
app.use(express.json()); /* Para que express entienda los post con los datos que vengan */

app.use(infoRoutes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(3000);
console.log('Sever on port 3000');
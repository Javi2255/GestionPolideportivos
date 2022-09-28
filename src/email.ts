var nodemailer = require('nodemailer');


export var transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: 'javier.perez.celada@gmail.com',
        pass: "eibvohzuvbityeae"
    }
});
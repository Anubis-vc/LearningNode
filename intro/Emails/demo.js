var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vchughcodes@gmail.com',
    pass: 'CaptainCT7567'
  }
});

var mailOptions = {
  from: 'vchughcodes@gmail.com',
  to: 'ved.dchugh@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'God please work'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

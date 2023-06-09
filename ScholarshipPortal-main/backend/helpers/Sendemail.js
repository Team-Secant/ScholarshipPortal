const nodemailer = require('nodemailer')

const sendVerificationEmail = async (to, token, id,type) => {
    console.log(to, token);
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "teamsecant@gmail.com",
                pass: "pvkzjfhdkfvnmroi",
            },
        });
        await transporter.sendMail({
            from: "teamsecant@gmail.com",
            to: to,
            subject: 'Verify Your Account',
            html: `<p>Please click the following link to verify your account:</p><p><a href="http://localhost:3000/${type}/email-verification/${id}">Verify Now`
        });
        console.log("Email sent");
    } catch (error) {
        console.log("Email not sent", error);
    }
};

module.exports = sendVerificationEmail;
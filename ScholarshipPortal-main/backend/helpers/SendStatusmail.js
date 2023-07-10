const nodemailer = require('nodemailer')

const sendStatusEmail = async (to,status) => {
    console.log(to,status)
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

        if(status==="Pending"){
            await transporter.sendMail({
                from: "teamsecant@gmail.com",
                to: to,
                subject: 'Scholarship Status Update',
                html: `<h3>Hi ${to.split("@")[0]}!!</h3><br><p>Your Scholarship Application is in a Pending State. You will be notified Once you application will be approved.</p>`
            });
        }
        else if(status==="Approved"){
            await transporter.sendMail({
                from: "teamsecant@gmail.com",
                to: to,
                subject: 'Scholarship Status Update',
                html: `<h3>Congratulations ${to.split("@")[0]}!!</h3><br><p>Your Scholarship Application has been Accepted. Further Procedure will be told to you in a seperate email.</p>`
            });

        }
        else if(status==="Rejected"){
            await transporter.sendMail({
                from: "teamsecant@gmail.com",
                to: to,
                subject: 'Scholarship Status Update',
                html: `<h3>Sorry ${to.split("@")[0]}!!</h3><br><p>Your Scholarship Application has been Rejected.</p>`
            });

        }

        console.log("Email sent");
    } catch (error) {
        console.log("Email not sent", error);
    }
};

module.exports = sendStatusEmail;
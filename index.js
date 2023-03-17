const { resolve } = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const Config = require("./Config.js");

//-----------------------EXPRESS-LOCALHOST---------------------------//
const app = express();
app.use(express.static(resolve(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8019, () => {
    console.log("Server a démarer dans http://localhost:8019");
});

//--------------------ROUTE-ET-ENVOI-DE-MAIL------------------------//
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        type: "login",
        user: Config.mail,
        pass: Config.mdpMail,
    },
});

app.post("/contact", async (req, res) => {
    let message = "";
    let mailOptions = {
        from: req.body.email,
        to: "buirechristophe@gmail.com",
        subject: `demande de contact de ${req.body.fisrtname} ${req.body.email}`,
        text: req.body.message,
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            message = "votre message n'est pas transmis ! Mail: Buirechristophe@gmail.com";
            console.log(err);
            res.render("page-pf/contact.html.twig", { message });
            playChewba();
        } else {
            message = "votre message est transmis !";
            res.render("page-pf/contact.html.twig", { message });
            playChewba();
            console.log("je joue");
        }
    });
});

//------------------------------ROUTE-------------------------------//
app.get("/", async (req, res) => {
    res.render("page-pf/index.html.twig");
});

app.get("/accueil", async (req, res) => {
    res.render("page-pf/accueil.html.twig");
});

app.get("/projets", async (req, res) => {
    res.render("page-pf/projets.html.twig");
});

app.get("/changement", async (req, res) => {
    res.render("page-pf/changement.html.twig");
});

app.get("/cv", async (req, res) => {
    res.render("page-pf/cv.html.twig");
});

app.get("/contact", async (req, res) => {
    res.render("page-pf/contact.html.twig");
});


//----------------------------FONCTION------------------------------//
const playChewba = () => {
    const audio = new Audio();
    audio.src = "/assets/mp3/chewba.mp3";
    audio.play();
};

const playSurvol2 = () => {
    const audio = new Audio();
    audio.src = "public/assets/mp3/sabre2.wav";
    audio.play();
};

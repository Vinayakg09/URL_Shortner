const express = require('express');

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/static");

const path = require("path");

const URL = require("./model/url");

const { connectMongoDb } = require("./connect");

const app = express();
const PORT = 8002;

connectMongoDb('mongodb://127.0.0.1:27017/short-url').then(() => console.log("MongoDb connected!!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/url', urlRoute);
app.use('/', staticRoute);

app.get('/url/:shortId', async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId: shortId
    },{
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }});
        res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => console.log("Server started!"));
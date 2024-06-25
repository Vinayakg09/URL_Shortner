const express = require("express")

const URL = require("../model/url")
const routes = express.Router();

routes.get("/", async(req,res) => {
    const allUrls = await URL.find({})
    return res.render("home", {
        urls: allUrls
    });
})

module.exports = routes;
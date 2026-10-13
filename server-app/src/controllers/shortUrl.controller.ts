import express from "express";
import {urlModel} from "../model/shortUrl.js";

export const createUrl = async (
    req: express.Request, 
    res: express.Response
) => {
    try {
        console.log("The fullUrl is", req.body.fullUrl);
        const {fullUrl} = req.body;
        const urlFound = await urlModel.find({ fullUrl });
        if (urlFound.length > 0) {
            res.status(409);
            res.send(urlFound);
        }else{
            const shortUrl = await urlModel.create({ fullUrl });
            res.status(201);
            res.send(shortUrl);
        }    
    }catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }    
};

export const getAllUrl = async (
    req: express.Request, 
    res: express.Response
) => {
    try {
        const shortUrls = await urlModel.find().sort({createdAt: -1});

        if(shortUrls.length > 0){
            res.status(200).send({ shortUrls });
        }else{
            res.status(404).send({ message: "No shortUrls found" });
        } 
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }        
};


export const getUrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = req.params.id;

        if (typeof id !== "string" || !id) {
            return res.status(400).send({
                message: "Invalid short URL"
            });
        }

        const shortUrl = await urlModel.findOne({
            shortUrl: id
        });

        if (!shortUrl) {
            return res.status(404).send({
                message: "ShortUrl not found"
            });
        }

        shortUrl.clicks++;
        await shortUrl.save();

        return res.redirect(shortUrl.fullUrl);

    } catch (error) {
        console.error("Get URL error:", error);
        return res.status(500).send({
            message: "Something went wrong"
        });
    }
};

export const deleteUrl = async (
    req: express.Request, 
    res: express.Response
) => {
    try {

      const shortUrl = await urlModel.findByIdAndDelete({ _id : req.params.id });

      if(!shortUrl){
        return res.status(404).send({ message: "ShortUrl not found" });
      }

      return res.status(200).send({ message: "ShortUrl deleted successfully" });
    }
    catch (error) {
      console.error("Delete error:", error);
    
      return res.status(500).send({ message: "Something went wrong" });
    }
} 




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

/* ===========================
   MongoDB Connection
=========================== */

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected");

    })
    .catch((error) => {

        console.log(error);

    });

/* ===========================
   Schema
=========================== */

const journalSchema = new mongoose.Schema({

    date:{

        type:String,

        required:true

    },

    title:{

        type:String,

        required:true

    },

    description:{

        type:String,

        required:true

    }

},
{
    timestamps:true
});

const Journal = mongoose.model("Journal", journalSchema);


/* ===========================
   Home Route
=========================== */

app.get("/", (req,res)=>{

    res.sendFile(path.join(__dirname,"public","index.html"));

});


/* ===========================
   Get Entries
=========================== */

app.get("/api/entries", async(req,res)=>{

    try{

        let filter = {};

        if(req.query.date){

            filter.date = req.query.date;

        }

        const entries = await Journal
            .find(filter)
            .sort({createdAt:-1});

        res.status(200).json(entries);

    }

    catch(error){

        res.status(500).json({

            message:"Unable to retrieve entries."

        });

    }

});


/* ===========================
   Create Entry
=========================== */

app.post("/api/entries", async(req,res)=>{

    try{

        const journal = new Journal({

            date:req.body.date,

            title:req.body.title,

            description:req.body.description

        });

        await journal.save();

        res.status(201).json(journal);

    }

    catch(error){

        res.status(500).json({

            message:"Unable to save entry."

        });

    }

});


/* ===========================
   Delete Entry
=========================== */

app.delete("/api/entries/:id", async(req,res)=>{

    try{

        const deleted = await Journal.findByIdAndDelete(req.params.id);

        if(!deleted){

            return res.status(404).json({

                message:"Entry not found."

            });

        }

        res.status(200).json({

            message:"Entry deleted successfully."

        });

    }

    catch(error){

        res.status(500).json({

            message:"Unable to delete entry."

        });

    }

});


/* ===========================
   Start Server
=========================== */

app.listen(PORT, ()=>{

    console.log(`Server running at http://localhost:${PORT}`);

});
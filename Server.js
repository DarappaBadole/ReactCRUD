

// const {MongoClient} = require("mongodb")
// const URL = "mongodb://127.0.0.1:27017";

// const client = new MongoClient(URL);

// ///////////////////////////////////////////////////////////
// //
// //getConnection
// //Used to connect with MongoDBServer -> Database -> Collection
// //
// ///////////////////////////////////////////////////////////


// async function getConnection()
// {
//     let result = await client.connect();
//     let db = result.db("Marvellous");
//     return db.collection("Batches");
  

// }


// ///////////////////////////////////////////////////////////
// //
// //readData
// //Used to connect with MongoDBServer -> Database -> Collection
// //
// ///////////////////////////////////////////////////////////

// async function readData()
// {
//     let data = await getConnection();
//     data = await data.find().toArray();
//     console.log("Data from Marvellous Database is : ");
//     console.log(data);
// }


// ///////////////////////////////////////////////////////////
// //
// //DeleteData
// //Used to delete the data from database
// //
// ///////////////////////////////////////////////////////////

// async function deleteData()
// {
//     let data = await getConnection();
//     let result = await data.deleteOne({"Batch" : "PPA"});
//     if(result.acknowledged)
//     {
//         console.log("Delete operation performed successfully");
//     }
// }

// ///////////////////////////////////////////////////////////
// //
// //insertData
// //Used to insert the data from database
// //
// ///////////////////////////////////////////////////////////

// async function insertData()
// {
//     let data = await getConnection();
//     let result = await data.insertOne({"Batch" : "PPA","Fees" : 18500});

//     if(result.acknowledged)
//     {
//         console.log("Insert operation performed successfully");
//     }
// }


// ///////////////////////////////////////////////////////////
// //
// //updateData
// //Used to update the data from database
// //
// ///////////////////////////////////////////////////////////

// async function updateData()
// {
//     let data = await getConnection();
//     let result = await data.updateOne({"Batch" : "PPA"}, {$set : {"Fees" : 20000}});

//     if(result.acknowledged)
//     {
//         console.log("Update operation performed successfully");
//     }
// }


// ///////////////////////////////////////////////////////////
// //
// //main function
// //it should be entry point function of our application 
// //
// ///////////////////////////////////////////////////////////


// function main()
// {
    
//     //deleteData();
//     insertData();
//     // updateData();
//     // readData();

// }

// //starter of the application
// main();


const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(URL);

app.use(cors());
app.use(bodyParser.json());

async function getConnection() {
    let result = await client.connect();
    let db = result.db("Marvellous");
    return db.collection("Batches");
}

app.get('/api/batches', async (req, res) => {
    let data = await getConnection();
    data = await data.find().toArray();
    res.send(data);
});

app.post('/api/batches', async (req, res) => {
    let data = await getConnection();
    let result = await data.insertOne(req.body);
    if(result.acknowledged) {
        res.send('Insert operation performed successfully');
    }
});

app.delete('/api/batches/:batch', async (req, res) => {
    let data = await getConnection();
    let result = await data.deleteOne({"Batch" : req.params.batch});
    if(result.acknowledged) {
        res.send('Delete operation performed successfully');
    }
});

app.put('/api/batches/:batch', async (req, res) => {
    let data = await getConnection();
    let result = await data.updateOne({"Batch" : req.params.batch}, {$set : req.body});
    if(result.acknowledged) {
        res.send('Update operation performed successfully');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

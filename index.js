const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000

app.use(cors())
app.use(express.json())

const uri = process.env.NEXT

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const run = async () => {
    try {
        
    await client.connect();

    const db = client.db('auth')
    const userCollection = db.collection('allData')

    // app.get('/user', async(req,res) => {
    //     const result = await userCollection.find().toArray()
    //     res.send(result)
    // })
    app.get('/data', async(req,res) => {
        const result = await userCollection.find().toArray()
        res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
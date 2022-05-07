const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s8d3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const warehouseStocks = client.db('wareHouse').collection('products');

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = warehouseStocks.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        app.get('/products/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const product = await warehouseStocks.findOne(query);
            res.send(product);
        })
        
    } finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('running warehouse server')
})

app.listen(port, () => {
    console.log('Listening to port', port)
})
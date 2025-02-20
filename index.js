    require('./connectiondb');
    const Customer = require('./schema');
    const express = require('express');
    const server = express();

    server.use(express.json());

    //Test server
    server.get('/', function(req,res){
        res.send('HEllo World...!')
    })

    //CRUD operations
    //Create
    server.post('/addGrocery',async function(req,res){
        try {
            const data = req.body;
            await Customer.create(data);
            return res.send("Successfully added a grocery")
        } catch (error) {
            return res.send("Something went wrong in adding",error)
        }
    })

    //Read all
    server.get('/getGrocery',async function (req,res) {
        try {
            const data = await Customer.find();
            return res.json({
                data:data,
                message:"All Grocery details"
            })
        } catch (error) {
            return res.send("Something went wrong in Fetching...!!",error)
        }
        
    })

    //Read by cost
    server.get('/getGrocery/fetch/:cost', async (req, res) => {
        try {

            const fetchcost = req.params.cost;
            if (isNaN(fetchcost)) {
                return res.status(400).json({ error: "Invalid cost parameter. Must be a number." });
            }

            const data = await Customer.find({ cost: fetchcost });
            if (data.length === 0) {
                return res.status(404).json({ message: "No grocery items found with the given cost." });
            }
            return res.status(200).json({ success: true, data });
        } catch (error) {
            console.error("Error fetching grocery items:", error.message);
            return res.status(500).json({ success: false, error: "Server error. Please try again later." });
        }
    });

    //Update cost
    server.put('/getGrocery/updated/:item_name',async function(req,res){
        const item = req.params.item_name;
        const Cost = Number(req.body.cost);
        try {
            await Customer.updateOne({"item_name":item},{"$set":{"cost":Cost}});
            const data = await Customer.find({"item_name":item});
            return res.send(data)
        } catch (error) {
            return res.send("Did not update the data")
        }
    })

    //Delete by item
    server.delete('/getGrocery/delete/:item', async function (req,res) {
        const item = req.params.item;
        try {
            await Customer.deleteOne({"item_name":item});
            res.send("Successfully deleted the item");
        } catch (error) {
            res.send(error)
        }    
    })

    //Delete many by cost
    server.delete('/getGrocery/deleted/:cost', async function (req,res){
        const cost = Number(req.params.cost);
        try {
            await Customer.deleteMany({"cost":cost});
            res.send("Succesfully deleted the items");
        } catch (error) {
            res.send(error)
        }
    })

    server.listen(3000,()=>{
        console.log('Server is running at 3000')
    })
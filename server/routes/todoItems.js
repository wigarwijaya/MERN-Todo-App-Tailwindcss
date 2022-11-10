const router = require('express').Router();
//import todo model
const todoItemsModel = require('../models/todoItems')

//Lets create our first route -- We will Add Todo Item to our database
router.post('/api/item', async (req, res) =>{
    try {
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        //save this item in database
        const saveItem = await newItem.save()
        res.status(200).json(saveItem)
    } catch (error) {
        res.json(error)
    }
});

//Lets create second route -- Get data from database
router.get('/api/items', async (req, res) =>{
try {
    const allTodoTitems = await todoItemsModel.find({});
    res.status(200).json(allTodoTitems)
} catch (error) {
    res.json(error)
}
});

//Lets create second route -- Update from database
router.put('/api/item/:id', async (req, res) =>{
    try {
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('Item Updated')
    } catch (error) {
    res.json(error)
    }
});

//Lets create second route -- Delete data from database
router.delete('/api/item/:id', async (req, res) =>{
    try {
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted!')
    } catch (error) {
        res.json(error)
    }
})

//export router
module.exports = router;
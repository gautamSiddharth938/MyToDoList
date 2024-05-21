const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')
const { body, validationResult } = require('express-validator');


// Route 1 - Get All the notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallToDoItems', async (req, res) => {
    try {
        // Get data from database and render index page with this data
        const notes = await Todo.find()
        res.json(notes)
    } catch (error) {
        console.error(`Error in fetching items from DB ${error}`);
        res.status(500).send('Server error');
    }
})


// Route 2 - Add a new note using: POST "/api/notes/addnote". login required
router.post('/addToDoItem', [
    body('item').isLength({ min: 5 }).isString().withMessage("item must be at least 5 characters long"),
], async (req, res) => {
    try {

        const { item, itemtype, updated} = req.body

        // If there are errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Todo({ item, itemtype, updated });
        const result = await notes.save();
        res.json(result)
    } catch (error) {
        console.error(`Error in Adding items to DB ${error}`);
        res.status(500).send('Server error');
    }
})


// Route 4 - delete an existing note using: delete "/api/notes/deletenote". login required
router.delete('/deleteToDoItem', async (req, res) => {
    try {
        // find the note to be deleted and delete it
        const { item} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let updateNote = await Todo.deleteOne({item})
        if (!updateNote) {
            return res.status(404).send("Not found.")
        }

        // If there are errors return bad request and errors
        console.log("Note has been deleted");
        res.json({ message: "Successfully deleted.", note: updateNote })
        // res.json(deleteNote)
    } catch (error) {
        console.error(`Error in Deleting items from DB ${error}`);
        res.status(500).send('Server error');
    }
})


module.exports = router;
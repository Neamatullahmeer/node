const express = require("express");
const router = express.Router();
const person = require("../person");

// Route to create a new person

router.post("/", async (req, res) => {
    

    try {

        const personDataSave = new person(req.body);

        const insertParson = await personDataSave.save();

        console.log(insertParson);

        res.status(201).json(insertParson);
    


    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log("internal server error" + error);


    }
});

router.get("/", async (req, res) => {
    try {
        const persons = await person.find();
        res.status(200).json(persons);  
        console.log(persons);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

router.get("/:workType", async (req, res) => {

    try {
        const { workType } = req.params;

        const personData = await person.find({ work: workType });
        // Check if

        if (workType !== 'employed' && workType !== 'unemployed' && workType !== 'student' && workType !== 'retired') {
            return res.status(400).json({ error: "Invalid work type" });
        }

        res.status(200).json(personData);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const updatedPerson = req.body;

        const personData = await person.findByIdAndUpdate(id, updatedPerson, { 
            new: true,
            runValidators: true
         });
         if (!personData) {
            return res.status(404).json({ error: "Person not found" });
         }
        res.status(200).json(personData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }   
        const personData = await person.findByIdAndDelete(id);
        if (!personData) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json({ message: "Person deleted successfully" });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }





});

module.exports = router;
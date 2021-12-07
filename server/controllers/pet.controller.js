// const { request, response } = require('express');
const Pet = require('../models/Pet.model');

module.exports = {
    //creates a new Pet 
    createPet:(request, response) => {
        Pet.create(request.body)
        .then((newPet) => {
            response.json(newPet);
        })
        .catch((err) => {
            console.log(err);
            response.status(400).json(err);
        })
    },
    //finds 1 specific pet
    getOnePet:(request, response) => {
        Pet.findById({_id:request.params.id})
        .then((onePet)=> {
            response.json(onePet);
        })
        .catch((err)=>{
            console.log(err);
            response.status(400).json(err);
        })
    },

    //finds all pets
    getAllPets:(request, response)=> {
        Pet.find({}).collation({locale: 'en', strength:2}).sort({petName:1})
        .then((allPets)=> {
            response.json(allPets);
        })
        .catch((err)=>{
            console.log(err);
            response.status(400).json(err);
        })
    },

    //deletes 1 pet input
    deletePet:(request, response) => {
        Pet.deleteOne({_id:request.params.id})
        .then((deletedPet)=> {
            console.log("deleted");
            response.json(deletedPet);
        })
        .catch((err)=>{
            console.log(err);
            response.status(400).json(err);
        })
    },

    //edit 1 pet 
    editPet:(request, response) => {
        Pet.findOneAndUpdate({_id: request.params.id},
            request.body,
            {
                new: true,
                runValidators: false, //this line will ensure that any edits will meet our validation requisites
            })
        .then((updatedPet)=> {
            console.log(updatedPet);
            response.json(updatedPet);
        })
        .catch((err)=>{
            console.log(err);
            response.status(400).json(err);
        })
    }
}

//
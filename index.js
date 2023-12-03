const mongoose = require("mongoose")

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
console.log(process.env.MONGO_URI)
//Connect to data base

mongoose
    .connect(process.env.MONGO_URI,{family:4})
    .then(()=> console.log("Connected to MongoDB"))
    .catch(err=> console.log('Could not connect to Data base', err.message))
//Schema
const PersonSchema = new mongoose.Schema(
    {
        name: {type:String, require: true},
        age:  Number,
        favoriteFoods: [String]
    }
)
//Model

const Person = mongoose.model('Person',PersonSchema)
// Create and Save a Record of a Model:
async function addPerson(OnePerson){
    try {
        const person = new Person(OnePerson)
        const result = await person.save()
        console.log(result)
    } catch (error) {
        console.log(error.message)
        
    }
}

// Create Many Records with model.create()
async function addManyPeople(people){
    try {
        const result = await Person.create(people)
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}

//Mode.find()  to Search Your Database By name
async function findPerson(name){
    try {
        const person = await Person.find({name})
        console.log('person have the same name'+person)
    } catch (error) {
        console.log(error.message)
    }
}
//model.findOne()  to Search Your Database By food
async function findOnePerson(food){
    try {
        const person = await Person.findOne({favoriteFoods: food})
        console.log('person have the same favorite Foods'+person)
    } catch (error) {
        console.log(error.message)
    }
}
//Use model.findById() to Search Your Database By _id
async function findPersonById(id){
    try {
        const person = await Person.findById(id)
        console.log('person have the id'+person)
    } catch (error) {
        console.log(error.message)
    }
}
//Perform Classic Updates by Running Find, Edit, then Save
async function UpdatesPerson(id){
    try {
        const person = await Person.findById(id)
        //person not found
        if (!person) throw new Error ('not found')

        //Edit person
        person.favoriteFoods.push('Hamburger')
        //save change
        const result= await person.save()
        console.log(person)
    } catch (error) {
        console.log(error.message)
    }
} 

//Perform New Updates on a Document Using model.findOneAndUpdate()
async function UpdatePersonAge(personName,newAge){
    try {
        const person = await Person.findOneAndUpdate(
            {name:personName },
            {age: newAge},
            { new: true }
            )
        console.log(person)    
    } catch (error) {
        console.log(error.message)
    }
}
//Delete One Document Using model.findByIdAndRemove
async function DeletePerson(id){
    try {
        const person = await Person.findByIdAndDelete(id)
        console.log(person)
    } catch (error) {
        console.log(error.message)
    }
} 

//Delete Many Documents with model.remove()
async function DeleteManyPerson (name){
    try {
        const person =await Person.deleteMany({name})
        console.log('MaryMaryMary '+person)
        if (person.deletedCount > 0) {
            console.log(`Successful deletion. Number of documents deleted : ${person.deletedCount}`);
        } else {
            console.log('No document n\'have been deleted.');
        }
    } catch (error) {
        console.log(error.message)

    }
}
//Chain Search Query Helpers to Narrow Search Results
async function SearchPerson(Food){
    try {
        const result = await Person.find({favoriteFoods:Food})
        .sort('name')
        .limit(2)
        .select('-age')
        console.log(result)
    } catch (error) {
        console.log(error.message)        
    }
}
SearchPerson('burritos')
//DeleteManyPerson('Mary')
//DeletePerson('656cb9e5b801bf67e1107ff4')
//UpdatePersonAge('Mary',20)
//UpdatesPerson('656cb8f4769db24e470b9a7e')
 //findPersonById('656cb8f4769db24e470b9a7f')
/*findOnePerson('burritos')

findPerson('Mary')
addPerson({
       name: 'Mary',
      age: 30,
      favoriteFoods: ['Hamburger']
     }); 
addManyPeople([
    {
        name: 'John',
    age: 45,
        favoriteFoods: ['Hamburger', 'Soup', 'burritos'],
    },
    {
name: 'Jane',
        age: 20,
        favoriteFoods: ['Salad', 'burritos'],
    },
    {
        name: 'Sam',
        age: 15,
        favoriteFoods: ['Pizza', 'Pasta'],
    },
    {
       name: 'Mary',
      age: 30,
      favoriteFoods: ['Hamburger']
     });
     {
       name: 'Mary',
      age: 40,
      favoriteFoods: ['Hamburger']
     },
     {
    name: 'Mary',
   age: 15,
   favoriteFoods: ['Hamburger','Salad']
  }
    ]);*/
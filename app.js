//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/shubhamDB",{ useUnifiedTopology: true });

//creating the schema

const fruitSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please check the data you have entered"]
        
    },
    
    //validation code--->
    
    score:{
        type:Number,
        min:1,
        max:10
    },
    reviews:String
    
});


//creating the collection along with the schema

const Fruits = mongoose.model("Fruit",fruitSchema);

//creating document from the model

const fruit=new Fruits({
    score:10,
    reviews:"Used for muscle building"
    
});

fruit.save();

const peopleSchema= new mongoose.Schema({
    name:String,
    age:Number,
    favorite_fruit:fruitSchema
    
});

const People=mongoose.model("people_datas",peopleSchema);



const Pineapple=new Fruits({
    name:"Pineapple",
    score:9,
    reviews:"Best Fruiit Of Shubham"
});

Pineapple.save();

const p1=new People({
    name:"Aishwarya",
    age:21,
    favorite_fruit:Pineapple
});

p1.save();



Fruits.find(function(err,fruit){
    if(err){
        console.log(err);
    }
    else{
        //console.log(fruit);  
        mongoose.connection.close();
        fruit.forEach(function(fruit){
                console.log(fruit.name);
        });
    }
})



/*fruit.updateOne({_id: "5eb038be9d6780235c5bedba"},{name: "Pomegranate"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully Updated The Documents");
    }
});*/

/*Fruits.deleteOne({name: "Pomegranate"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully Deleted the required data");
    }
});*/

People.deleteMany({name:"SHUBHAM"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully Deleted the data");
    }
});



const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {name:"Avocado",
    score:8,
    review:"good for physique"},
    {name:"Banana",
    score:9,
    review:"good for MuscleBuilding"},
    {name:"Watermelon",
    score:7,
    review:"good for Vitamins"}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
const mongoose = require('mongoose');
const uuid = require('uuid');

const personSchema = mongoose.Schema({
  name: {type: String},
  age: {type: Number}

})

// personSchema.virtual('name').get(function() {
//   return `${this.name.first} ${this.name.last}`.trim()});

personSchema.methods.serialize = function(){
  return {
    id: this.id,
    name: this.name,
    age: this.age
  };
}

const Person = mongoose.model('Person', personSchema);

module.exports = {Person};

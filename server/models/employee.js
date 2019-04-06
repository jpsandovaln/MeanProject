const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    age: { type: Number, require: true },
    image: { type: String, require: true },
    checkSumImage: { type: String, require: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);

import mongoose from 'mongoose';

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        require: true },
    lastName: { 
        type: String,
        require: true },
    age: {
        type: Number, 
        require: true },   
    birthdate: { 
        type: Date, 
        require: true},
    image: { 
        type: String, 
        require: true },
    checkSumImage: { 
        type: String, 
        require: true }
});

export default mongoose.model('Employee', EmployeeSchema);

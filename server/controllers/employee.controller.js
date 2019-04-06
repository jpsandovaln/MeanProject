const Employee = require('../models/employee');

const employeeController = {};

employeeController.getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}

employeeController.createEmployee = async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({ status: 'Employee created' });
}

employeeController.getEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
}

employeeController.editEmployee = async (req, res) => {
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        image: req.body.image,
        checkSumImage: req.body.checkSumImage
    };
    await Employee.findByIdAndUpdate(req.params.id, {$set: employee }, { new: true })
    res.json({ status: 'Employee updated' });
}

employeeController.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({ status: 'Employee Deleted' });
}

module.exports = employeeController;

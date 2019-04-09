const Employee = require('../models/employee');
const CrytoFile = require('../commons/convertions/crypto.data');
const mongoose = require('mongoose'); 
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,  './uploads/');
    },
    filename: function (req, file, cb){
        newImageName = new Date().getTime() + '_' + file.originalname;
        cb(null, newImageName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
    {
        cb(null, true);
    } else {
        cb(new Error('only could upload image/jpeg or image/png'), false);
    }
};

const upload = multer({
    storage: storage,
     limits: { 
        fileSize: 1024 * 1024 * 2 
    },
    fileFilter: fileFilter
});

const employeeController = {};

employeeController.uploadSingle = upload.single('imageUpload');

employeeController.getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}

employeeController.getEmployeesByBirthday = async (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getUTCMonth() + 1;
    const currentDay = currentDate.getUTCDate();
    const employees = await Employee.find();
    const birthdayEmployees = [];
    for (const index in employees) {
        const employee = employees[index];
        const birthdate = new Date(employee.birthdate);
        const month = birthdate.getUTCMonth() + 1;
        const day = birthdate.getUTCDate();
        if (currentMonth == month && currentDay == day) {
            birthdayEmployees.push(employee);
        }
    }
    return birthdayEmployees;
}

employeeController.createEmployee = (req, res) => {
    const cryto = new CrytoFile();
    var parts = req.body.birthdate.split('-');
    const birthdate = new Date(parts[0], parts[1] - 1, parts[2]); 
    console.log(req.file);
    const  checksum = cryto.getCheckSum(req.file.path);
    checksum.then( async (md5) => {
        console.log('checksum = ' + md5);
        const employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            birthdate: birthdate,
            lastName: req.body.lastName,
            age: req.body.age,
            image: "http://172.21.19.100:3000/" + req.file.path,
            checkSumImage: md5
        });
        await employee.save().then();
        res.json({ status: 'Employee created' });
    });
}

employeeController.getEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
}

employeeController.editEmployee = (req, res) => {
    const cryto = new CrytoFile();   
    console.log(req.file);
    console.log(req.params.id);
    const  checksum = cryto.getCheckSum(req.file.path);
    checksum.then( async (md5) => {
        const employee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            image: "http://172.21.19.100:3000/" + req.file.path,
            checkSumImage: md5
        };
        await Employee.findByIdAndUpdate(req.params.id, {$set: employee }, { new: true })
        res.json({ status: 'Employee updated' });
    });
}

employeeController.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({ status: 'Employee Deleted' });
}

module.exports = employeeController;

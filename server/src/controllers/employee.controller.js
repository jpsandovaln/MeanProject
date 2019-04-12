import Employee from '../models/employee';
import CrytoFile from '../commons/convertions/crypto.data';
import Schedule from '../commons/schedule';
import mongoose from 'mongoose';
import multer from 'multer';

export default class EmployeeController {
    constructor() {
        this.map = new Map();
    }

    uploadSingle() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads/');
            },
            filename: (req, file, cb) => {
                const newImageName = new Date().getTime() + '_' + file.originalname;
                cb(null, newImageName);
            }
        });

        const fileFilter = (req, file, cb) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            } else {
                cb(new Error('only could upload image/jpeg or image/png'), false);
            }
        };

        const upload = multer({
            storage,
            limits: {
                fileSize: 1024 * 1024 * 2
            },
            fileFilter
        });

        return upload.single('imageUpload');
    }

    getAllEmployees() {
        return (req, res) => {
            Employee.find()
            .then((employees) => {
                res.json(employees);
            });
        };
    }

    getEmployee() {
        return (req, res) => {
            Employee.findById(req.params.id)
            .then((employee) => {
                res.json(employee);
            });
        };
    }

    createEmployee() {
        return (req, res) => {
            const parts = req.body.birthdate.split('-');
            const birthdate = new Date(parts[0], parts[1] - 1, parts[2]);
            const cryto = new CrytoFile();
            cryto.getCheckSum(req.file.path)
            .then((md5) => {
                const employee = new Employee({
                    _id: new mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    birthdate,
                    lastName: req.body.lastName,
                    age: req.body.age,
                    image: 'http://172.21.19.100:3000/' + req.file.path,
                    checkSumImage: md5
                });
                return employee.save().then();
            })
            .then((employee) => {
                const schedule = new Schedule(birthdate);
                const task = schedule.getBirthdateSchedule(req.body.firstName);
                this.map.set(employee, task);
                task.start();
                res.json({ status: 'Employee created' });
            });
        };
    }

    editEmployee() {
        return (req, res) => {
            const cryto = new CrytoFile();
            cryto.getCheckSum(req.file.path)
            .then((md5) => {
                const employee = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    age: req.body.age,
                    image: 'http://172.21.19.100:3000/' + req.file.path,
                    checkSumImage: md5
                };
                return Employee.findByIdAndUpdate(req.params.id, { $set: employee }, { new: true });
            })
            .then(() => {
                res.json({ status: 'Employee updated' });
            });
        };
    }

    deleteEmployee() {
        return (req, res) => {
            Employee.findByIdAndRemove(req.params.id)
            .then(() => {
                res.json({ status: 'Employee Deleted' });
            });
        };
    }
}

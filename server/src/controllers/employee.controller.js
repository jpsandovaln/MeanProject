import Employee from '../models/employee';
import CrytoFile from '../commons/convertions/crypto.data';
import Schedule from '../commons/schedule';
import mongoose from 'mongoose';
import multer from 'multer';
import config from '../config/environment';
import message from '../commons/constants/messages';

export default class EmployeeController {
    
    constructor() {
        this.map = new Map();
        this.imageUri = `http://${config.serverHost}:${config.serverPort}/`;
    }

    uploadSingle() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `./${config.uploadFolder}/`);
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
                cb(new Error(message.validImageFormat), false);
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
    getBirthdayList() {
        return (req, res) => {
            var today = new Date();
            // **** TO DO: fix this logic ****
            let month = (today.getMonth() + 1);
            if (month < 10) {
                month = '0' + month;
            }
            // *******************************
            var birthdate =  '-' + month + '-' + today.getDate();
            console.log(birthdate);
            console.log(today);
        Employee.find({"birthdate": {'$regex' : '.*' + birthdate + '.*'}})
            .then((employees) => {
                res.json(employees);
            });
        }
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
            const cryto = new CrytoFile();
            const birthdate = req.body.birthdate;
            cryto.getCheckSum(req.file.path)
            .then((md5) => {
                const employee = new Employee({
                    _id: new mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    birthdate,
                    lastName: req.body.lastName,
                    age: req.body.age,
                    image: `${this.imageUri}/${req.file.path}`,
                    checkSumImage: md5
                });
                return employee.save().then();
            })
            .then((employee) => {
                const schedule = new Schedule(new Date(birthdate));
                const task = schedule.getBirthdateSchedule(req.body.firstName);
                this.map.set(employee, task);
                task.start();
                res.json({ status: message.successInsertEmp });
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
                    birthdate: req.body.birthdate,
                    age: req.body.age,
                    image: `${this.imageUri}/${req.file.path}`,
                    checkSumImage: md5
                };
                return Employee.findByIdAndUpdate(req.params.id, { $set: employee }, { new: true });
            })
            .then(() => {
                res.json({ status: message.successUpdateEmp });
            });
        };
    }

    deleteEmployee() {
        return (req, res) => {
            Employee.findByIdAndRemove(req.params.id)
            .then(() => {
                res.json({ status: message.successDeleteEmp });
            });
        };
    }
}

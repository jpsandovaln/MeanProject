import Employee from '../models/employee';
import CrytoFile from '../commons/convertions/crypto.data';
import mongoose from 'mongoose';
import multer from 'multer';
import config from '../config/environment';
import message from '../commons/constants/messages';
import Schedule from '../commons/schedule';

/**
 * Employee controller
 */
export default class EmployeeController {

    constructor() {
        this.imageUri = `http://${config.serverHost}:${config.serverPort}`;
        const schedule = new Schedule(new Date(), this);
        const task = schedule.getBirthdateSchedule();
        task.start();
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
        const today = new Date();
        const month = (today.getMonth() + 1);
        return Employee.aggregate([
            {
                $project: {
                    day: { $dayOfMonth: '$birthdate' },
                    month: { $month: '$birthdate' },
                    document: '$$ROOT'
                }
            },
            {
                $match: {
                    day: today.getDate(),
                    month
                }
            },
            {
                $replaceRoot: { newRoot: '$document' }
            }
        ]);
    }

    getAllEmployeesInBirthday() {
        return (req, res) => {
            this.getBirthdayList()
            .then((list) => {
                console.info(list);
                res.json(list);
            });
        };
    }

    getEmployee() {
        return (req, res) => {
            Employee.findById(req.params.id)
            .then((employee) => {
                let result;
                if (employee === null) {
                    result = {};
                } else {
                    result = employee;
                }

                res.json(result);
            })
            .catch((error) => {
                console.error(error);
                res.json({});
            });
        };
    }

    createEmployee() {
        return (req, res) => {
            const cryto = new CrytoFile();
            let { birthdate } = req.body;
            birthdate = new Date(birthdate);
            cryto.getCheckSum(req.file.path)
            .then((md5) => {
                const employee = new Employee({
                    _id: new mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    birthdate,
                    lastName: req.body.lastName,
                    age: req.body.age,
                    image: `/${req.file.path}`,
                    checkSumImage: md5
                });
                return employee.save().then();
            })
            .then(() => {
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
                    image: `/${req.file.path}`,
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

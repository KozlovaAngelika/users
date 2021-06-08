import {
    response,
    Router
} from "express";
import User from "./../models/User.js";
import bcrypt from "bcryptjs";
import {
    check,
    validationResult
} from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";

export const authRouter = Router();

authRouter.post('/register',
    [
        check('email', 'email is not correct').isEmail(),
        check('password', 'Password is too short').isLength({
            min: 1
        })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Data is incorrect"
                });
            }
            const {
                name,
                email,
                password
            } = req.body;
            const candidate = await User.findOne({
                email
            })
            if (candidate) {
                return res.status(400).json({
                    message: 'Such user already exists'
                })
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const formatDate = (date) => {

                let dd = date.getDate();
                if (dd < 10) dd = '0' + dd;

                let mm = date.getMonth() + 1;
                if (mm < 10) mm = '0' + mm;

                let yy = date.getFullYear() % 100;
                if (yy < 10) yy = '0' + yy;
                return `${dd}.${mm}.${yy}`;
            }
            const signUpDate = formatDate(new Date());
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword,
                registrationDate: signUpDate,
                lastLoginDate: signUpDate,
            })
            await user.save();
            res.status(200).json({
                message: "Registration completed successfully"
            })
        } catch (e) {
            res.status(500).json({
                message: 'Error. Try again'
            })
            throw e;
        }
    })

authRouter.post('/login', [
        check('email', 'email isn`t correct').normalizeEmail().isEmail(),
        check('password', 'Enter your password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Data is incorrect"
                });
            }
            const {
                email,
                password
            } = req.body;
            const user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(400).json({
                    message: "User isn`t found"
                })
            }
            const isMatch = await bcrypt.compare(password, userPassword);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid password. Try again."
                })
            }
            const token = jwt.sign({
                userId: user.id
            }, config.get("jwtSecret"), {
                expiresIn: '1h'
            })
            res.json({
                token,
                userId
            })

        } catch (e) {
            res.status(500).json({
                message: 'Error. Try again'
            })
        }
    })
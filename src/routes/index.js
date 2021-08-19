import express from 'express';
import { registerUser, getUserInfo } from '../models/model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { secretToken } from '../../config';
import { verifyToken } from '../middleware/auth';

const indexRouter = express.Router();

indexRouter.get('/', verifyToken, (req, res) =>
  res.status(200).json({ message: 'Welcome to Express API template' })
);

indexRouter.post('/register', async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if user provided all necessary inputs
    if (!(email && password && firstName && lastName)) {
      res.status(400).send('Please provide all the inputs');
    }

    // check if email already exists

    // check if email exist
    const userInfo = await getUserInfo(email);
    if (userInfo.length > 0) {
      return res.status(400).send('Email already exist');
    }

    // Encrypt user password
    const encryptPassword = await bcrypt.hash(password, 10);

    // save this user infor in database
    const user = await registerUser({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptPassword,
    });

    // Create token
    const token = jwt.sign({ user_Id: user._id, email }, secretToken, {
      expiresIn: '2m',
    });
    // user.token = token;
    res.status(201).json({ success: true, token: token});
  } catch (err) {
    console.log(err);
  }
});

indexRouter.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;

    // check if email and password is provided
    if (!(email && password)) {
      return res.status(400).send('Please provide email and password');
    }

    // check if email exist
    const user = await getUserInfo(email);
    if (user.length === 0) {
      return res.status(400).send('Email does not exist');
    }

    // compare the user given info with database record
    if (
      user[0].email === email &&
      (await bcrypt.compare(password, user[0].password))
    ) {
      //Create token
      const token = jwt.sign({ user_Id: user._id, email }, secretToken, {
        expiresIn: '2m',
      });
      // user.token = token;
      // console.log(user,user.token)
      res.status(200).json({ success: true, token: token});
    }
    else {
      return res.status(400).send('Email and password does not match');
    }
  } catch (err) {
    console.log(err);
  }
});

export default indexRouter;

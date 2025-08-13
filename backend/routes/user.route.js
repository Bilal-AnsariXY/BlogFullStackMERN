import express from 'express';
import { allAdmins, login, logout, myProfile, register } from '../controller/user.controller.js';
import { isAuthnticated } from '../middleware/authUser.js';

const router = express.Router();
router.post('/register',register);
router.post('/login',login);
router.get('/logout',isAuthnticated,logout);
router.get('/my-profile',isAuthnticated,myProfile)
router.get('/admins',allAdmins)
export default router;
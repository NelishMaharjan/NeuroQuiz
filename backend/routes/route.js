const express = require('express').Router();
const upload = require('../helpers/upload');

const {addUser,getActiveUsers,getAllUsers,getUserById, updateUser, deleteUser, loginUser, forgotPassword, resetPassword, logoutUser, changeUserRole} = require('../controllers/userController');
const { getSystemStats } = require('../controllers/systemController');

express.post('/register', addUser);
express.get('/all', getAllUsers);
express.get('/getactiveusers', getActiveUsers);
express.get('/id/:id', getUserById);
express.put('/update/:id', upload.single('profileImage'), updateUser); 
express.put('/change-role/:id', changeUserRole);
express.delete('/delete/:id', deleteUser);
express.post('/login', loginUser);
express.post('/logout/:id', logoutUser);
express.post('/forgot-password', forgotPassword);
express.post('/reset-password', resetPassword);

// System Stats
express.get('/stats', getSystemStats);

module.exports = express;

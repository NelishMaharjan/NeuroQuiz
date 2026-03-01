const express = require('express').Router();

const {addUser,getActiveUsers,getAllUsers,getUserById, updateUser, deleteUser, loginUser, forgotPassword, resetPassword, logoutUser} = require('../controllers/userController');

express.post('/register', addUser);
express.get('/all', getAllUsers);
express.get('/getactiveusers', getActiveUsers);
express.get('/id/:id', getUserById);
express.put('/update/:id',updateUser); 
express.delete('/delete/:id',deleteUser);
express.post('/login',loginUser);
express.post('/logout/:id', logoutUser);
express.post('/forgot-password', forgotPassword);
express.post('/reset-password', resetPassword);

module.exports = express;

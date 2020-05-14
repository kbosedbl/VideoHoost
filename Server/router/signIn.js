const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/' , (req , res , next) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if(user.length != 1)
			{
				console.log("No user found");
				return res.status(401).json({
					message: "Authourization failed"
				});
			}
			else
			{
				bcrypt.compare(req.body.password , user[0].password , (err , result) => {
					if(err){
						return res.status(401).json({
							message: "Authourization failed"
						});
					}
					else if(result){
						//token authentication
						console.log(user[0]);
						const token = jwt.sign({
							userId: user[0]._id,
							firstName: user[0].firstName,
							lastName: user[0].lastName,
							email: user[0].email							
						} , 
						require('../configs/default').secret ,
						 {
							expiresIn: '1h'
						});
						return res.status(200).json({
							message: 'Auth Successful',
							token: token
						});
					}
					else
					{
						return res.status(401).json({
							message: "Authourization failed"
						});
					}
				})
			}
		})
		.catch(err => {
			console.log(err);
			return res.status(500).json({
				error: err
			});
		});
});

module.exports = router;
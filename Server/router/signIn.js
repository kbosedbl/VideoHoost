const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

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
						return res.status(200).json({
							message: "Authentication successfull"
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
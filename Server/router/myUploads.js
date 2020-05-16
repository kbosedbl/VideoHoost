const express = require('express');
const router = express.Router();

const VideoDetails = require('../models/VideoSchema');

router.get('/' , (req , res , next) => {

	VideoDetails
		.find({ uploader_name: req.userData.firstName})
		.exec()
		.then(docs => {
			res.status(200).json(docs);
		})
		.catch(err => {
			res.status(5000).json({
				error: err
			});
		});
});

module.exports = router;
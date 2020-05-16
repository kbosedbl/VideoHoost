const express = require('express');
const router = express.Router();
const VideoDetails = require('../models/VideoSchema');

router.post('/' , (req , res , next) => {

	VideoDetails
		.deleteOne({ uploader_name: req.body.uploader_name , upload_title: req.body.upload_title })
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
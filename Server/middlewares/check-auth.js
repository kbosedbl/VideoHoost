 const jwt = require('jsonwebtoken');
 const key = require('../configs/default').secret;

 module.exports = (req , res , next) => {
 		try{ 			
 		    const token = req.headers.authorization.split(" ")[1];
    		//console.log('CHECK SUCCESSFUL: Your token: ' + token);
    		const decoded = jwt.verify(token, 'my_secret_key');
    		req.userData = decoded;
    		console.log(req);    //To be commented out later
    		next();
 		}catch(error)
 		{
 			    return res.status(401).json({
      			message: 'Auth failed'
    			});
 		}

 }
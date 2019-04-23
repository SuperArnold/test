var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const secret = 'aaa';
router.post('/', function (req, res, next) {
    
    const token = jwt.sign({
      name: req.body.name
   }, secret, {
      expiresIn:  30 //秒為單位的到期時間
   });
  
      console.log("token:" +token)
  
      return res.json({ success: 1, token: token });
  });

router.post("/get", function (req, res, next) {

   console.log("req.body.token : " +req.body.token)
   var success = 1
   jwt.verify(req.body.token, secret, function (err, decoded) {
      if (!err){
            console.log("decoded:" +decoded.name);  //超過時間會有錯
            message = decoded.name
       } else{
            success = -1
            message = "超過時間"
       }
   })
    
   return res.json({ success: success, message: message });
});


module.exports = router;
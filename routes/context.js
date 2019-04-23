
var express = require('express');
var router = express.Router();
var authorize = require('../module/authorize');
var bodyparser = require('body-parser');
var app = express();
var ann = require('../module/announce');
var formidable = require("formidable");//上傳圖片用
var multer = require('multer');
var upload = multer({ dest: 'uploadFile/' });
fs = require("fs");
var uuid = require('uuid/v1');



router.get("/", function (req, res, next) {
    console.log("req " + req.session.account);
    console.log("authorize " + authorize.isPass(req))
    let success = 0;
    var sess = req.session;
    console.log("context " + sess.account);
    if (authorize.isPass(req)) {
        // return res.json({code:200});
        success = 1;
        return res.json({ success: success, message: "GOOD" });
    } else {
        // return res.json({code:400});
        return res.json({ success: success, message: "session已過期，請重新登入" });
        // return res.render('login');
    }
});


router.get("/home", function (req, res, next) {
    // res.send(json({ success: success, username : "11112222" }));
    return res.render('home', res.json({ username: 1, st: "11112222" }));

});
router.get("/friends", function (req, res, next) {

    return res.render('friends');

});

router.get("/order", function (req, res, next) {

    return res.render('order');

});
router.post("/upload", upload.any(), function (req, res, next) {
    // var form = new formidable.IncomingForm();
    //     console.log("about to parse " + req.files);
    //     form.parse(req, function(error, fields, files) {
    //         console.log("parsing done");
    //         console.log(files.upload);
    //         fs.writeFileSync("public/test.png", fs.readFileSync(files.upload.path));
    //         return res.json({ success: 1, message: "aaaaa"});
    //     });


    // var form = new formidable.IncomingForm();
    // form.parse(req, function (error, fields, files) {
    //     console.log("about to parse " + files);
    //     console.log("parsing done");
    //     fs.writeFile("/Users/arnold/Desktop/新增資料夾/TEST.jpg", files);

    //     return res.json({ success: 1, message: "aaaaa"});
    // });

    var newFile = "./uploadFile/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(newFile, data, function (err) {
            if (err) {
                console.log("錯誤：", err)
            } else {
                let response = {
                    message: '上傳成功',
                    filename: req.files[0].originalname
                };
                res.json(response);
            }
        });
    })

});

module.exports = router;
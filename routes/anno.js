var anno = require('../module/announce');
var express = require('express');
var session = require('express-session');
var authorize = require('../module/authorize');
var router = express.Router();
var crypto = require('crypto');

var app = express();
app.use(session({
    secret : 'secret', // 對session id 相關的cookie 進行簽名
    resave : true,
    saveUninitialized: false, // 是否儲存未初始化的會話
    cookie : {
    maxAge : 1000 * 60 * 3, // 設定 session 的有效時間，單位毫秒
    },
    }));
// console.log(user.findByName);
// app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(__dirname + './public'));
router.get('/register', function (req, res, next) {
    console.log("register...");
    return res.render('register');
});

router.post('/registeradd', function (req, res, next) {
    var data;
    let success = 0;
    user.findByNumeric(req.body.numeric).then(function (user1) {
        console.log("user1:   " + user1);

        if (user1 == null) {
            console.log("OOOOOOOOO:   " + req.body.inputPassword);
            let passwd = crypto.createHash('md5').update(req.body.inputPassword).digest('hex');
            user.addUser(req.body.numeric, req.body.name, req.body.account, passwd, req.body.birthday, req.body.gender, req.body.info)
                .then(function () {
                    success = 1;
                    return res.json({ success: success, message: "註冊成功" });
                });
        } else {
            console.log("XXXXXXXX:   ");
            // return res.json(data = JSON.stringify({ message: "註冊成功" }));
            return res.json({ success: success, message: "已註冊過" });
        }
    });
    // return res.json(data);

    // return res.render(data);
    // return res.render('register');
});

router.post('/authentication', async function (req, res, next) {
    let success;
    console.log("authentication " + req.body.account);
    console.log("authentication " + req.body.passwd);
    // user.loginAuthentication(req.body.account, req.body.passwd).then(function (user1) {
    //     console.log("user1:   " + user1.username);
    //     if (user1 == null) {
    //         success = 0;
    //     } else
    //         success = 1;

    // });

    let passwd = crypto.createHash('md5').update(req.body.passwd).digest('hex');
    let user1 = await user.loginAuthentication(req.body.account, passwd)
    if (user1 == null) {
        success = 0;
    } else {
        success = 1;
        req.session.loginPass=true;
        req.session.account=req.body.account;
        data = JSON.stringify({ message: "註冊成功" });
    }
    console.log("success " + success);
    return res.json({ success: success });

    // return res.render(data);
    // return res.render('register');
});

// promise chain !!!!!

// user.addUser('Arnold', 'jack@12345.com')
//     .then(function() {
//         // return user.findByName('jack');
//         // console.log('userSSSSSSS: ', user);
//     }).then(function(user) {
//         // user => undefined
//         // console.log('****************************');
//         // console.log('user111 ', user);
//         // console.log('user111 name: ', user.userName);
//         // console.log('user email: ', user.email);
//         // res.send("userss.userName");
//     }); // Promise !
// });

// router.get('/login', function(req, res, next) {
// user.findByName = async (req, res, next) => {
//     try {
//         console.log("FFFFFFFFF");
//         // var userss = await user.findByName('jack');
//         // console.log('user222 name: ', userss.userName);
//         // return res.send("userss.userName");

//         // return await user.findByName1('jack').then(function(user) {
//             return res.render('login');
//             // return res.send(user);
//         // });

//     } catch(err) {
//         console.log(err);
//     }
// };
// });

router.get('/login', function (req, res, next) {
    return res.render('login');
});

module.exports = user;
module.exports = router;

// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/ !!

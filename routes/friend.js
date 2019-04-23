var express = require('express');
var router = express.Router();
var friend = require('../module/friend');

router.get("/add", function (req, res, next) {
    console.log("req.body.context  " + req.body.context);
    let body = req.body;
    friend.addFriend(body.me_id1, body.me_id2, body.friendly).then(function () {
        friend.addFriend(body.me_id2, body.me_id1, body.friendly).then(function () {
            return res.json({ success: 1, message: "好友新增成功" });
        }).catch(function (err) {
            return res.json({ success: -1, message: err.sql });
        });
    }).catch(function (err) {
        return res.json({ success: -1, message: err.sql });
    });

});

router.get("/find", function (req, res, next) {
    
        friend.find(req.body.me_id1)
    .then(function (friendContent) {
    
        return res.json({ success: 1, message: friendContent });
    });

});


router.get("/update", function (req, res, next) {
    let body = req.body;
    let music_path = 'music_path';
    friend.update(body.id, body.title, body.content, body.place, body.permission, music_path, body.me_id).then(function () {
        return res.json({ success: 1, message: "好友更新成功" });
    }).catch(err => {
        return res.json({ success: -1, message: err });
    });

});
router.get("/delete", function (req, res, next) {
    let body = req.body;
    friend.delete(body.id, body.permission, body.me_id).then(function () {

        return res.json({ success: 1, message: "好友刪除成功" });
    }).catch(err => {
        return res. json({ success: -1, message: err });
    });

});

router.get("/friendUpsert", function (req, res, next) {
    let body = req.body;
    console.log(body)
    friend.friendUpsert(body.me_id1, body.me_id2, body.friendly).then(function (y) {
        console.log("yyyy " + y)
        return res.json({ success: 1, message: "好友更新成功" });
    }).catch(err => {
        console.log("yyyy " + err)
        return res.json({ success: -1, message: err });
    });

});

module.exports = router;
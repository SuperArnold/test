var express = require('express');
var router = express.Router();
var diary = require('../module/diary');
var uuid = require('uuid/v1');

router.get("/add", function (req, res, next) {
    console.log("req.body.context  " + req.body.context);
    let body = req.body;
    let music_path = 'music_path';
    diary.addDiary(uuid(), body.title, body.content, body.place, body.permission, Date.now(), music_path, body.me_id).then(function () {
        return res.json({ success: 1, message: "日誌新增成功" });
    }).catch(function (err) {
        return res.json({ success: -1, message: err.sql });
    });;

});

router.get("/find", function (req, res, next) {
    offset = 0;
    if (req.body.offset)
        offset = req.body.offset;
    console.log("req.body.offset  " + req.body.offset);
    diary.find(req.body.me_id, offset).then(function (diaryContent) {

        return res.json({ success: 1, message: diaryContent[0] });
    });

});

router.get("/findOneDiary", function (req, res, next) {
    offset = 0;
    if (req.body.offset)
        offset = req.body.offset;
    console.log("req.body.offset11111111111111  " + req.body.me_id1);
    diary.findOneDiary(req.body.id, req.body.me_id1).then(function (diaryContent) {

        return res.json({ success: 1, message: diaryContent });
    });

});

router.get("/update", function (req, res, next) {
    let body = req.body;
    let music_path = 'music_path';
    diary.update(body.id, body.title, body.content, body.place, body.permission, music_path, body.me_id).then(function () {
        return res.json({ success: 1, message: "日誌更新成功" });
    }).catch(err => {
        return res.json({ success: -1, message: err });
    });

});
router.get("/delete", function (req, res, next) {
    let body = req.body;
    diary.delete(body.id, body.permission, body.me_id).then(function () {

        return res.json({ success: 1, message: "日誌刪除成功" });
    }).catch(err => {
        return res.json({ success: -1, message: err });
    });

});

module.exports = router;
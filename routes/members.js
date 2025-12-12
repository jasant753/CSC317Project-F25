const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/', memberController.showMemberSearch);

router.get('/:username', memberController.showMemberProfile);

module.exports = router;

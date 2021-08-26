'use strict';

const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('../middleware/authentication-ensurer');

/**
 * ログアウトAPI
 * GETされるとログアウトする
 */
router.get('/', authenticationEnsurer, (req, res) => {
  req.logout();
  res.json({error: ''});
});

module.exports = router;

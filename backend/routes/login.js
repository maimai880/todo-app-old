'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * ログインAPI
 * usernameとpasswordをPOSTすると、ログインを試みる
 * ログインに成功すると{error: ''}を返す
 * ログインに失敗すると{error: 'エラー名'}を返す
 *
 * エラー詳細:
 *  'username or password is wrong': username、もしくはpasswordの間違いでapp.jsの認証処理に失敗した
 */
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user) return res.json({error: 'username or password is wrong'});

    req.logIn(user, err => {
      if (err) return next(err);

      return res.json({error: ''});
    });
  })(req, res, next);
});

module.exports = router;

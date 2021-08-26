'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const authenticationEnsurer = require('../middleware/authentication-ensurer');

/**
 * ユーザー名取得API
 * GETすると{username}を返す
 */
router.get('/', authenticationEnsurer, (req, res, next) => {
  res.json({username: req.user});
});

/**
 * サインアップAPI
 * usernameとpasswordをPOSTすると、それぞれが適切か検査する
 * 適切であればアカウントを作成し{error: ''}を返す
 * 不適切であれば{target: 'ターゲット', error: 'エラー名'}を返す
 *
 * エラー詳細:
 *  'username is too short': ユーザー名が0文字である
 *  'username is too long': ユーザー名が16文字以上である
 *  'username includes invalid character': ユーザー名が半角英数以外の文字を含んでいる
 *  'user is already exits': ユーザー名が既に使われている
 *  'password is too short': パスワードが八文字未満である
 *  'password is too long': パスワードが72文字以上である
 *  'password include invalid character': 半角英数,!,",#,$,%,',(,),*,.,\,/,:,;,<,=,>,?,@,[,],^,`,{,|,},~
 *                                        以外の無効な文字を含んでいる
 *  'password doesn't include alphabet or number': 半角英数のどちらかが含まれていない
 */
router.post('/', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const usernameError = inspectUsername(username);
  if (usernameError) return res.json({target: 'username', error: usernameError});
  const passwordError = inspectPassword(password);
  if (passwordError) return res.json({target: 'password', error: passwordError});

  const [, created] = await User.findOrCreate({
                                                where   : {username},
                                                defaults: {
                                                  username,
                                                  password: await bcrypt.hash(password, 10)
                                                }
                                              });

  if (created)
    res.json({error: ''});
  else
    res.json({target: 'username', error: 'user is already exits'});
});

function inspectUsername(username) {
  if (username.length === 0) {
    return 'username is too short';
  } else if (username.length > 15) {
    return 'username is too long';
  } else if (/[^\w]/.test(username)) {
    return 'username includes invalid character';
  } else {
    return '';
  }
}

function inspectPassword(password) {
  if (password.length < 8)
    return 'password is too short';
  else if (password.length >= 72)
    return 'password is too long';
  else if (/[^\w!"#$%'()*,.\\/:;<=>?@\[\]^`{|}~]/.test(password))
    return 'password includes invalid character';
  else if (!(/[a-zA-Z]/.test(password) && /\d/.test(password)))
    return 'password doesn\'t include alphabet or number';
  else
    return '';
}

module.exports = router;

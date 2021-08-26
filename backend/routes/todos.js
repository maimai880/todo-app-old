'use strict';

const express = require('express');
const path = require('path');
const router = express.Router();
const Todo = require('../models/todo');
const authenticationEnsurer = require('../middleware/authentication-ensurer');

router.all('*', authenticationEnsurer);

/**
 * TODO表示API
 * GETするとログイン中のユーザーのTODOを返すことを試みる
 * 成功すると{todoList : [{id, title, memo, done, created_at, done_at, username}, ...]}を変えす
 * 失敗すると{error: "エラー名"}を変えす
 *
 * エラー詳細:
 *  'you don't have any TODOs': ユーザーのTODOがない
 */
router.get('/list', async (req, res, next) => {
  const todoList = await Todo.findAll({where: {username: req.user}});
  if (todoList.length)
    return res.json({todoList});
  else
    return res.json({error: 'you don\'t have any TODOs'});
});

/**
 * TODO作成API
 * titleとmemoをPOSTするとそれぞれを検査する
 * 適切であればTODOを作成し{todo: {id, title, memo, done, created_at, done_at, username}}を返す
 * 不適切であれば{target: 'ターゲット', error: 'エラー名'}を返す
 *
 * エラー詳細:
 *  'str is empty': trmした結果が空白である
 *  'str is too long': 141文字以上である
 *  'same todo is already exists': title, memoと作成者が同じTODOが既に存在する
 */
router.post('/', async (req, res, next) => {
  const title = req.body.title.trim();
  const memo = req.body.memo.trim();
  const username = req.user;

  const titleError = inspectTitleOrMemo(title);
  if (titleError) return res.json({target: 'title', error: titleError});
  const memoError = inspectTitleOrMemo(memo);
  if (memoError) return res.json({target: 'memo', error: memoError});

  const [todo, created] = await Todo.findOrCreate({
                                                    where   : {title, memo, username},
                                                    defaults: {
                                                      title,
                                                      memo,
                                                      created_at: new Date,
                                                      username
                                                    }
                                                  });
  if (created)
    res.json({todo});
  else
    res.json({error: 'same todo is already exists'});
});

/**
 * TODO更新API
 * /:idにtitle, memoをPUTするとそれぞれを検査する
 * 適切であればTODOを更新し{error: ''}を返す
 * 不適切であれば{target: 'ターゲット', error: 'エラー名'}を返す
 *
 * エラー詳細:
 *  'str is empty': titleかmemoが空白である
 *  'str is too long': titleかmemoが141文字以上である
 *  'same todo is already exists': title, memoと作成者が同じTODOが既に存在する
 *  'the todo is not yours': idで指定したtodoがユーザーの物でない
 */
router.put('/:id', async (req, res, next) => {
  const title = req.body.title;
  const memo = req.body.memo;
  const id = req.params.id;

  const titleError = inspectTitleOrMemo(title);
  if (titleError) return res.json({target: 'title', error: titleError});
  const memoError = inspectTitleOrMemo(memo);
  if (memoError) return res.json({target: 'memo', error: memoError});

  const sameTodo = await Todo.findOne({where: {title, memo, username: req.user}});
  if (sameTodo) return res.json({error: 'same todo is already exists'});

  const targetTodo = await Todo.findOne({where: {id}});

  if (targetTodo.username !== req.user) return res.json('the todo is not yours');

  targetTodo.title = title;
  targetTodo.memo = memo;
  await targetTodo.save();

  res.json({error: ''});
});

/**
 * TODO削除API
 * DELETEするとidで指定したTODOがユーザーの物であるか調べる
 * そうであればTODOを削除し{error: ''}を返す
 * そうでなければ{error: 'the todo is not yours'}を返す
 */
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  const todo = await Todo.findOne({where: {id}});

  if (todo.username !== req.user) return res.json({error: 'the todo is not yours'});

  await todo.destroy();

  return res.json({error: ''});
});

/**
 * DONE更新API
 * PUTするとidで指定したTODOがユーザーの物であるか調べる
 * そうであればdoneとdone_atを更新し{error: ''}をかえす
 * そうでなければ{error: 'the todo is not yours'}を返す
 */
router.put('/:id/done', async (req, res, next) => {
  const todo = await Todo.findOne({where: {id: req.params.id}});

  if (todo.username !== req.user) return res.json({error: 'the todo is not yours'});

  if (todo.done) {
    todo.done = false;
    todo.done_at = null;
  } else {
    todo.done = true;
    todo.done_at = new Date();
  }
  await todo.save();

  return res.json({error: ''});
});

/**
 * title、またはmemoを検査し、異常性のテキストを返す
 * @param {String} str
 * @return {string}
 */
function inspectTitleOrMemo(str) {
  if (str.length <= 0)
    return 'str is empty';
  else if (str.length > 140)
    return 'str is too long';
  else
    return '';
}

module.exports = router;

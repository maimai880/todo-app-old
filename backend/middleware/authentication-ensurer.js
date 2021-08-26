'use strict';

const ensure = (req, res, next) => {
  if (req.isAuthenticated())
    return next();
  else
    res.json({error: 'you are not logged in'});
};

module.exports = ensure;

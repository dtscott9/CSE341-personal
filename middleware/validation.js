const validator = require('./helper');

const saveSong = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    artist: 'required|string',
    album: 'string',
    year: 'numeric',
    genre: 'required|string',
    lyrics: 'string',
    video: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveSong
};
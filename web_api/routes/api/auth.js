const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const db = require('../../models');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcypt = require('bcryptjs');

// @route GET api/auth
// @desc test route
// @access public
router.get('/', auth, async (req, res) => {
  try {
    const user = await db.User.findOne({
        where: {
            id: req.body.id
        }
    })
    res.json(user);
  } catch (err) {
      console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route POST api/auth
// @desc Authentication user &get Token
// @access public
router.post(
  '/',
  [
    check('email', 'please enter valid email').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await db.User.findOne({
          where: {
              email: email
          }
      })
      if (user === null) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      return res.status(500).send('server Error, <api/user.js>' + err.message);
    }
  }
);

module.exports = router;

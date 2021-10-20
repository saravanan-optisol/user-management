const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/User
// @desc Register User
// @access public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please enter valid email').isEmail(),
    check('password', 'give the password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
         console.log('if validaatioan')
       return res.status(400).json({ errors: errors.array() });
     }
    const {name, email, password} = req.body
    try {
      let checkuser = await db.User.findAll({
          where: {
              email: email
          }
      });
      if (checkuser.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'email already exists' }] });
      }

      const salt = await bcrypt.genSalt(10);
      const pwd = await bcrypt.hash(password, salt);

      const user = await db.User.create({
          username: name,
          email: email,
          password: pwd,
          role: 'user'
      })

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
      console.log(err.message);
      return res.status(500).send('server er    r' + err.message);
    }
  }
);

module.exports = router;

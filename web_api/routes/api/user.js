const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/user/new
// @desc Register User
router.post(
  '/new',
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
      const salt = await bcrypt.genSalt(10);
      const pwd = await bcrypt.hash(password, salt);

      if (checkuser.length > 0) {
        let updateData = {}

        if(name) updateData.username = name;
        if(password) updateData.password = pwd;

        await db.User.update(
          updateData,{
            where: {
              email: req.body.email
            }
          }
        );

        res.send('user details updated')
      }

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
      return res.status(500).send('server err' + err.message);
    }
  }
);

// @route DELETE api/user/delete/:id
// @desc Delete User
router.delete('/delete/:id', async(req, res)=>{
  try {
    let checkuser = await db.User.findOne({
      where: {
          id: req.params.id
      }
  });
  if (checkuser === null) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'user not found' }] });
  }

  await db.User.destroy({
    where: {
      id: req.params.id
    }
  })

  res.json({msg : ['user deleted']});
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('server err' + err.message);
  }
});

// @route GET api/user/all
// @desc Get all User
router.get('/all', async (req, res) =>{
  try {
    const users = await db.User.findAll();
    if(!users){
      res.send('user not exists');
    }

    res.status(200).json({users});
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('server err' + err.message);
  }
})

module.exports = router;

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.register = async function (req, res) {
  const { username, email, password, name } = req.body;

  const isEmpty = (value) => !value || value.trim() === '';

  if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(name))
  {
    return res.status(400).json({message: 'Please fill all the mandatory Fields'});
  }
  try {
    let user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({message: 'User Email already exists. Try Logging in'});
    }

    user = await User.create({username,password,name,email,});

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.status(201).json({message: `User registered successfully. Try logging in with Registered Username = ${user.username}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error',});
  }
};

module.exports.login = async function (req, res) {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(422).json({message: 'Invalid Username. Try logging in with the correct Username'});
    }

    const userPassword = await bcrypt.compare(password, user.password);

    if (!userPassword) {
      return res.status(422).json({message: 'Invalid Password. Please provide the correct password'});
    }

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Sign in successful. Here is your token, please keep it safe',
      data: { token },
    });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.status(200).json({
      message: 'Please find the Requested User Details',
      data: { user },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};
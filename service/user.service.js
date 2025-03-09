const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.schema");

require("dotenv").config({ path: ".env" });

const userRegistration = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    const checkIfUserExists = await User.findOne({
      email: email,
    });
    console.log(checkIfUserExists);

    if (checkIfUserExists) {
      console.log("checkIfUserExists", checkIfUserExists);
      return res
        .status(400)
        .json({ error: "The entry has already been created" });
    }

    const generateSalt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, generateSalt);

    const createUser = await User.create({
      user_name: user_name,
      email: email,
      password: securePassword,
    });

    if (!createUser) {
      return res.status(400).json({ error: "Unable To Create User" });
    }

    const getToken = await generateAuthToken(createUser);
    return res.status(200).json({ token: getToken, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.userRegistration = userRegistration;

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res
        .status(400)
        .json({ error: "Invalid email/mobile number. Please try again" });
    }

    const verifyPassword = await bcrypt.compare(findUser.password, password);
    console.log(verifyPassword);

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ error: "Incorrect Password. Please try again" });
    }

    const getToken = await generateAuthToken(findUser);
    return res.status(200).json({ token: getToken, success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};
exports.userLogin = userLogin;

const generateAuthToken = async (user) => {
  try {
    const data = {
      user: {
        _id: user.id,
        user_name: user.user_name,
        email: user.email,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    return authToken;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

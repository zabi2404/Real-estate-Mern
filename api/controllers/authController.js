import User from "../models/user_models.js";
import bcrypt from "bcrypt";
import { errorHnadle } from "../utils/error.js";
import jwt from "jsonwebtoken"


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // hashsynv mean don't have to use await 
  const newUser = new User({ username, email, password: hashedPassword })
  try {

    await newUser.save();
    res.status(201).json("user created")
  } catch (error) {

    next(error)
  }
}


export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) { return next(errorHnadle(404, "User not found")) };
    const checkCredentials = bcrypt.compareSync(password, validUser.password)
    if (!checkCredentials) { return next(errorHnadle(404, "Wrong Credentials")) }

    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET) // a secure way to snd data to frontend just sending useer id in it to verify user it send to server on every req and in server we cheeck this token to verify user
    res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }) // storing token in cookies in front end it get back on every req to the server
    .status(200)
    .json( rest ) // sending info about the user excluding the user password and caputre this on the frontend and save into local storage using redux

  } catch (error) {
    next(error)
  }

}


  export const google = async (req, res, next) => {
    try {
      const { username, email, photoURL } = req.body;
    console.log(req.body);
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = user._doc;
        res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
          .status(200)
          .json(rest)

      } else {
        const passwordGenerator = Math.random().toString(36);
        const hashedPassword = bcrypt.hashSync(passwordGenerator, 10)
        const newUser =  new User({ username:username ? username.split(" ").join("").toLowerCase()+Math.random().toString(36):email.split("@")[0], email, password: hashedPassword, avatar: photoURL })
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = newUser._doc;
        res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
          .status(200)
          .json(rest)
      }
    } catch (error) {
      next(error)
    }

  }


  export const signout = async (req, res, next) => {

try {
  
  res.clearCookie("token").status(200).json("User sign Out");

} catch (error) {
  next(error)
}

  }
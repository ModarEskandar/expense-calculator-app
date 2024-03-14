import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../schema/user.schema';
import { createUser, findUser, findUserById, signToken } from '../services/user.service';
import AppError from '../utils/appError';
import userModel from '../models/user.models';
import TokenModel from '../models/token.model';
import { sendEmail } from '../utils/Emails/sendEmail';

// Exclude this fields from the response
export const excludedFields = ['password'];
const MAIL_URL = `localhost:8080/api/auth`;

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + 15 * 60 * 1000
  ),
  maxAge: 15 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {

    const user = await createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user from the collection
    const user = await findUser({ email: req.body.email });

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Create an Access Token
    const { access_token:accessToken } = await signToken(user);

    // Send Access Token in Cookie
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    res.status(200).json({
      status: 'success',
      accessToken,
    });
  } catch (err: any) {
    next(err);
  }
};

export const resetPasswordRequestController = async (req: Request,
  res: Response,
  next: NextFunction)=>{
  try {

    const user = await findUser({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist!");

    let token = await TokenModel.findOne({ userId: user._id });
    if (!token) {
      const { access_token:accessToken } = await signToken(user);

      token = await new TokenModel({
        user: user._id,
        token: accessToken,
      }).save();
    }

    const link = `${MAIL_URL}/${token.user}/${token.token}`;
    const result  = sendEmail(user.email, "Password reset", {name: user.name,link: link},"/Template/requestResetPassword.handlebars");

    res.send("password reset link sent to your email account");
  } catch (err:any) {
    next(err);
    
  }
}

export const resetPasswordController = async (req: Request,
  res: Response,
  next: NextFunction)=>{
  try {
    const userId = req.params.user;
    const password = req.body.password;

      const token = await TokenModel.findOne({ user: userId,token: req.params.token });

    if (!token)
      return res.status(400).send("The link is not valid anymore! try again.");

      const user = await findUserById(userId!);
      if (!user)
        return res.status(400).send("The link is not valid anymore! try again.");
        console.log("user",user);
    await new userModel().updateOne({
      ...user,password
    });
    await new TokenModel().deleteOne({token});

    res.json("Password reset sucessfully.");
  } catch (err:any) {
    next(err);
  }
}


require('dotenv').config();
import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../data-source';
import { SignInInterface, SignUpInterface } from '../../utils/Auth.interface';
import { Dispatcher } from '../../models/dispatcher.model';
const authRepository = AppDataSource.getRepository(Dispatcher);

//dispatcher sign-up
export const sign_up = async (signUpInterface: SignUpInterface) => {
  let auth = authRepository.create(signUpInterface);

  return await authRepository.save(auth);
};

//dispatcher sign_in
export const sign_in = async (
  signInInterface: SignInInterface,
  res: Response
) => {
  //check if user exits and approved

  let foundAuth = await authRepository.findOne({
    where: {
      phoneNumber: signInInterface.phoneNumber,
    },
  });

  if (!foundAuth)
    return res.status(202).json({
      status: 'success',
      message: "Sorry, the entered credential doesn't exist",
    });

  //check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    signInInterface.password,
    foundAuth.password
  );
  if (!isPasswordCorrect)
    return res.status(202).json({
      message: 'The entered password is not correct',
    });
  let token = jwt.sign(
    {
      id: foundAuth.id,
    },
    process.env.JWT_KEY
  );
  let { password, ...otherCredentials } = foundAuth;
  res.status(200).json({
    userData: otherCredentials,
    access_token: token,
  });
};

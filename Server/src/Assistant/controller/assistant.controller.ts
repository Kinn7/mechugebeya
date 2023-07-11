import { NextFunction, Request, Response } from 'express';
import assistantService = require('../services/assistant.service');
//import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { validate, validateOrReject } from 'class-validator';
import { SignInDto, SignUpDto } from '../../Customer/dto/customer-auth.dto';

export async function AssistantSignUp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  let signUpDto = new SignUpDto();
  signUpDto.firstName = req.body.firstName;
  signUpDto.lastName = req.body.lastName;
  signUpDto.email = req.body.email;
  signUpDto.phoneNumber = req.body.phoneNumber;
  signUpDto.password = hash;
  validate(signUpDto).then((errors) => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      //   console.log(errors[0].constraints);
      res.status(404).json({
        message: errors[0].constraints,
      });
    } else {
      assistantService.sign_up(signUpDto);
      res.status(200).json({
        message: 'Account Created Successfully!',
      });
    }
  });
}

export async function AssistantSignin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let signInDto = new SignInDto();
  signInDto.phoneNumber = req.body.phoneNumber;
  signInDto.password = req.body.password;

  validate(signInDto).then((errors) => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      //   console.log(errors[0].constraints);
      res.status(404).json({
        message: errors[0].constraints,
      });
    } else {
      assistantService.sign_in(signInDto, res);
      //   res.status(200).json({
      //     message: 'Account Created Successfully!',
      //   });
    }
  });
}

export async function getAssistants(req: Request, res: Response, next: NextFunction){
  res.status(200).json(await assistantService.getAssistants())
}

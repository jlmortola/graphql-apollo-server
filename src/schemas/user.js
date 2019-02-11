import Joi from 'joi';

const username =  Joi.string().alphanum().min(3).max(30).required().label('username');
const password= Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().label('password');
const email= Joi.string().email({ minDomainAtoms: 2 }).required().label('email');
const name= Joi.string().max(254).required().label('name');
const birthyear= Joi.number().integer().min(1900).max(2013);

export const signUp = Joi.object().keys({
    username,
    password,
    email,
    name,
    birthyear,
})

export const signIn = Joi.object().keys({
    email,
    password,
})
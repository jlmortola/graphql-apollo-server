import Joi from 'joi';

export default Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required().label('username'),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().label('password'),
    name: Joi.string().max(254).required().label('name'),
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainAtoms: 2 }).required().label('email'),
})
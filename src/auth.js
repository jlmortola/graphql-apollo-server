import {AuthenticationError} from 'apollo-server-express';
import User from './models/user';

export const checkSignIn = req => {
    if (!req.session.userId) throw new AuthenticationError('You must log in first')
}

export const checkSignOut = req => {
    if (req.session.userId) throw new AuthenticationError('You are already sign in')
}

export const signInAttempt = async (email, pass) => {
    
    const msg = 'Login or password not found';  

    const user = await User.findOne({email});
    if (!user) throw new AuthenticationError(msg);
    
    const password = await user.checkPassword(pass);
    if(!password) throw new AuthenticationError(msg);
    
    return user

}

export const signOut = async req => {
    await req.session.destroy
}
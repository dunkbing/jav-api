import passport from 'passport';
import { UserModel as User } from '../models/user.model.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

passport.use('signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  /**
   * 
   * @param {String} email 
   * @param {String} password 
   * @param {import('passport-local').VerifyFunction} done 
   */
  async (email, password, done) => {
    try {
      const user = await User.create({ email, password });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
));

passport.use('login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  /**
   * 
   * @param {String} email 
   * @param {String} password 
   * @param {import('passport-local').VerifyFunction} done 
   */
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'user not found' });
      }

      const valid = await user.isValidPassword(password);
      if (!valid) {
        return done(null, false, { message: 'Wrong Password' });
      }

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      done(error);
    }
  }
));

passport.use(
  new JwtStrategy(
    {
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
)

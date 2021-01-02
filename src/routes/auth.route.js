import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  /**
   * 
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   * @param {import('express').NextFunction} next 
   */
  async (req, res, next) => {
    res.json({
      message: 'sign up successfully',
      user: req.user,
    })
  },
);

router.post(
  'login',
  /**
   * 
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   * @param {import('express').NextFunction} next 
   */
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            return next(new Error('An error occured'));
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'secret');

              return res.json({ token });
            }
          )
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

export default router;

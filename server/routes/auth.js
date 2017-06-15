const express = require('express');
const middleware = require('../middleware');
const router = express.Router();
const bodyParser = require('body-parser')
const models = require('../../db/models');

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });


router.route('/login')
  .get((req, res) => {
      res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.route('/delete')
  .get((req, res) => {
    models.Profile.where({ id: req.user.id }).fetch()
      .then(profile => {
        if (!profile) {
          throw profile;
        }
        return profile.destroy();
      })
      .then(() => {
        res.redirect('/login')
        res.sendStatus(200);
      })
      .error(err => {
        res.status(503).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

router.route('/update')
  .post((req, res) => {
    models.Profile.where({ id: req.user.id }).fetch()
      .then(profile => {
        if (!profile) {
          throw profile;
        }
        console.log('req.body: ', req.body)
        //profile.save(req.body, { method: 'update' });
      })
      .then(() => {
        console.log('here')
          res.sendStatus(201);
            // res.send({phoneNumber: req.body.phoneNumber})
      })
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

router.route('/retrieve')
  .get((req, res) => {
    models.Profile.fetchAll()
      .then(profiles => {
        res.status(200).send(profiles);
      })
      .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
        res.status(503).send(err);
      });
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {createArticle,getArticles,getArticle,updateArticle,deleteArticle,} = require('../controllers/articleController');

router.post('/articles', passport.authenticate('jwt', { session: false }), createArticle);
router.get('/articles', getArticles);
router.get('/articles/:id', getArticle);
router.put('/articles/:id', passport.authenticate('jwt', { session: false }), updateArticle);
router.delete('/articles/:id', passport.authenticate('jwt', { session: false }), deleteArticle);

module.exports = router;

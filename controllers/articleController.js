const Article = require('../models/article');
const mongoose = require('mongoose');

exports.createArticle = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  try {
    const newArticle = new Article({
      title,
      content,
      author: req.user._id,
    });

    const article = await newArticle.save();

    return res.status(201).json({
      message: 'Article has been successfully posted',
      data: { article },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', ['username', 'email']);

    return res.status(200).json({
      message: 'Please find all the articles',
      data: { articles },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.getArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid article ID format. Please enter a valid Article ID.' });
  }

  try {
    const article = await Article.findById(id).populate('author', ['username', 'email']);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json({
      message: 'Please find the requested article',
      data: { article },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid article ID format. Please enter a valid Article ID.' });
  }

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this article' });
    }

    article.title = title || article.title;
    article.content = content || article.content;

    await article.save();

    return res.status(200).json({
      message: 'Article has been updated successfully',
      data: { article },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid article ID format. Please enter a valid Article ID.' });
  }

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this article' });
    }

    await Article.deleteOne({ _id: id });

    return res.status(200).json({ message: 'Article removed successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all blog posts and JOIN with user data
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['title', 'post'],
                },
            ],
        });

        // Serialize data so the template can read it
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            blogPosts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogPost/:id', async (req, res) => {
    try {
        const blogPostData = await blogPost.findByPk(req.params.post_id, {
            include: [
                {
                    model: User,
                    attributes: ['title', 'post'],
                },
            ],
        });

        const blogPost = blogPostData.get({ plain: true });

        res.render('blogPost', {
            ...blogPost,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: blogPost }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const users = userData.map((blogPost) => blogPost.get({ plain: true }));

        res.render('homepage', {
            users,
            // Pass the logged in flag to the template
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
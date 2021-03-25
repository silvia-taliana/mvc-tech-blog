const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// getting all blog posts and displaying on homepage
router.get('/', async (req, res) => {
    try {
        // Get all blog posts and JOIN with user data
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

        console.log(blogPosts);
        // Pass serialized data and session flag into template
        res.render('homepage', {
            blogPosts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// getting blog post by id and displaying on the full post page
router.get('/blogPost/:id', withAuth, async (req, res) => {
    try {
        console.log(req.params.id);
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'user_id', 'createdAt', 'post_id'],
                    include: ['commenter'],
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        let fullPost = blogPostData.get({ plain: true });
        console.log(fullPost);

        res.render('fullPost', {
            fullPost,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// displaying the edit post page
router.get('/updatePost', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('updatePost');
});

// getting only blog posts created by the user logged in and displaying on their dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });

        const user = userData.get({ plain: true });
        console.log(user);

        res.render('dashboard', {
            user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// directing user to the homepage if logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
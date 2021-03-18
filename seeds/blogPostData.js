const { BlogPost } = require('../models');

const blogPostData = [
    {
        title: 'Middleware',
        post: 'A great blog explaining middleware',
        user_id: 1
    },
    {
        title: 'CRUD',
        post: 'A great blog explaining CRUD',
        user_id: 2
    },
    {
        title: 'APIs',
        post: 'A great blog explaining APIs',
        user_id: 3
    },
];

const seedBlogPost = () => BlogPost.bulkCreate(blogPostData);

module.exports = seedBlogPost;
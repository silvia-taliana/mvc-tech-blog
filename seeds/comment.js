const { Comment } = require('../models');

const commentData = [
    {
        comment: 'Excellent post!',
        user_id: 1,
        post_id: 2
    },
    {
        comment: 'Awesome post!',
        user_id: 2,
        post_id: 3
    },
    {
        comment: 'Great post!',
        user_id: 3,
        post_id: 1
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
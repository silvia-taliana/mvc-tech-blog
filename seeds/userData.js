const { User } = require('../models');

const userData = [
    {
        name: 'Jerry Seinfeild',
        email: 'jerryseinfeild@email.com',
        password: 'password123'
    },
    {
        name: 'Jake Peralta',
        email: 'jakeperalta@email.com',
        password: 'password123'
    },
    {
        name: 'Leslie Knope',
        email: 'leslieknope@email.com',
        password: 'password123'
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
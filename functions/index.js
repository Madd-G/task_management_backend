const admin = require('firebase-admin');

admin.initializeApp();

// AUTH
const authAPI  = require('./konek/auth');

// BUSINESS PROFILE
const businessProfileAPI = require('./konek/business_profile');

// TASK
const taskAPI = require('./konek/task');

// USER
const userAPI = require('./konek/user');


module.exports = {
    ...authAPI,
    ...businessProfileAPI,
    ...taskAPI,
    ...userAPI
};


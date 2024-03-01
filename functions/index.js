const admin = require('firebase-admin');

admin.initializeApp();

// AUTH
const authAPI  = require('./konek/auth');

// BUSINESS PROFILE
const businessProfileAPI = require('./konek/business_profile');

// PRODUCT
const productAPI = require('./konek/product');

module.exports = {
    ...authAPI,
    ...businessProfileAPI,
    ...productAPI
};


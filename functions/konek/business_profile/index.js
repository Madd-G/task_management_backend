const { updateBusinessName } = require('./updateBusinessName')
const { getBusinessProfile } = require('./getBusinessProfile');
const { uploadLogo } = require('./uploadLogo');
const { uploadFile } = require('./uploadFile');
const { uploadTest } = require('./uploadTest');


module.exports = {
    updateBusinessName,
    getBusinessProfile,
    uploadLogo,
    uploadFile,
    uploadTest
};

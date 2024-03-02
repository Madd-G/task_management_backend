const { updateBusinessName } = require('./updateBusinessName')
const { getBusinessProfile } = require('./getBusinessProfile');
const { uploadLogo } = require('./uploadLogo');
const { uploadFile } = require('./uploadFile');
const { uploadTest } = require('./uploadTest');
const { deleteBusinessSector } = require('./deleteBusinessSector');
const { addBusinessSector } = require('./addBusinessSector');

module.exports = {
    updateBusinessName,
    getBusinessProfile,
    uploadLogo,
    uploadFile,
    uploadTest,
    addBusinessSector,
    deleteBusinessSector
};

const { getBusinessProfile } = require('./getBusinessProfile');
const { uploadLogo } = require('./uploadLogo');
const { uploadFile } = require('./uploadFile');
const { uploadTest } = require('./uploadTest');
const { deleteBusinessSector } = require('./deleteBusinessSector');
const { addBusinessSector } = require('./addBusinessSector');
const { updateBusinessName } = require('./updateBusinessName')
const { updateBusinessValue } = require('./updateBusinessValue')


module.exports = {
    getBusinessProfile,
    uploadLogo,
    uploadFile,
    uploadTest,
    addBusinessSector,
    deleteBusinessSector,
    updateBusinessName,
    updateBusinessValue
};

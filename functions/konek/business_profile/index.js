const { addBusinessSector } = require('./addBusinessSector');
const { deleteBusinessSector } = require('./deleteBusinessSector');
const { getBusinessProfile } = require('./getBusinessProfile');
const { updateBusinessLogo } = require('./updateBusinessLogo')
const { updateBusinessName } = require('./updateBusinessName')
const { updateBusinessValue } = require('./updateBusinessValue')

module.exports = {
    addBusinessSector,
    deleteBusinessSector,
    getBusinessProfile,
    updateBusinessLogo,
    updateBusinessName,
    updateBusinessValue,
};

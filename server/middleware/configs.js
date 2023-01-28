const { Setting } = require('../models');
const { Op } = require('sequelize');

const settingsInit = (req, res, next) => {
  Setting.findAll()
    .then((result) => {
      const siteName = result.find((item) => item.setting_name === 'siteName');
      const siteDesc = result.find((item) => item.setting_name === 'siteDesc');

      if (!siteName) {
        Setting.create({
          setting_name: 'siteName',
          setting_value: 'Site Name',
        })
          .then((result) => {
            res.locals.siteName = result.setting_value;
          })
          .catch((error) => next(error));
      } else {
        res.locals.siteName = siteName.setting_value;
      }

      if (!siteDesc) {
        Setting.create({
          setting_name: 'siteDesc',
          setting_value: '',
        })
          .then((result) => {
            res.locals.siteDesc = result.setting_value;
          })
          .catch((error) => next(error));
      } else {
        res.locals.siteDesc = siteDesc.setting_value;
      }

      next();
    })
    .catch((error) => next(error));
};

module.exports = settingsInit;

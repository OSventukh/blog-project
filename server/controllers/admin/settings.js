const { Setting } = require('../../models');

exports.getConfiguration = (req, res, next) => {
  res.render('admin/settings', {
    pageTitle: 'Settings',
    templateName: 'settings'
  });
};

exports.postGeneralConfiguration = (req, res, next) => {
  const { siteName, siteDesc } = req.body;

  Setting.findAll()
    .then((result) => {
      const siteNameObj = result.find(
        (item) => item.setting_name === 'siteName'
      );
      const siteDescObj = result.find(
        (item) => item.setting_name === 'siteDesc'
      );

      siteNameObj.setting_value = siteName;
      siteDescObj.setting_value = siteDesc;

      result = [...result, siteNameObj, siteDescObj];

      result.forEach((item) => item.save());
      return result;
    })
    .then(() => {
      res.redirect('/admin/settings');
    })
    .catch((error) => {
      next(error);
    });
};

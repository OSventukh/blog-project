exports.getIndex = (req, res, next) => {
  res.render('admin/index', {
    pageTitle: 'Admin Panel',
    templateName: 'admin-home-page'
  });
};

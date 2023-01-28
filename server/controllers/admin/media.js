const { readdir } = require('fs/promises');
const path = require('path');
const { deleteImages } = require('../../utils/file');

exports.getAllMedia = (req, res, next) => {
  readdir('media/images').then((files) => {
    res.render('admin/media', {
      pageTitle: 'Media',
      media: files,
      templateName: 'media',
    });
  });
};

exports.deleteMedia = (req, res, next) => {
  deleteImages(req.body.values);
};

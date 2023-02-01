const fs = require('fs/promises');
const path = require('path');

exports.deleteImages = (images) => {
  Promise.all(images.map((image) => {
    const imagePath = path.join('media', 'images', image)
    fs.unlink(imagePath)
      
  }))
};

exports.isFileExist = (filePath) => {
  return fs.readFile(filePath, (error, data) => {
    if (error) {
      return false;

    }
    return true;
  })
}

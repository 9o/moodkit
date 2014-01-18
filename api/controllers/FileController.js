var sid = require('shortid');
var fs = require('fs');
var mkdirp = require('mkdirp');
//var io = require('socket.io');

var UPLOAD_PATH = 'public/images';

// Setup id generator
sid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
sid.seed(42);

function safeFilename(name) {
  name = name.replace(/ /g, '-');
  name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
  name = name.replace(/\.+/g, '.');
  name = name.replace(/-+/g, '-');
  name = name.replace(/_+/g, '_');
  return name;
}

function fileMinusExt(fileName) {
  return fileName.split('.').slice(0, -1).join('.');
}

function fileExtension(fileName) {
  return fileName.split('.').slice(-1);
}

// Where you would do your processing, etc
// Stubbed out for now
function processImage(id, name, path, cb) {
  console.log('Processing image');

  cb(null, {
    'result': 'success',
    'id': id,
    'name': name,
    'path': path
  });
}


module.exports = {
  upload: function (req, res) {
    var file = req.files.userPhoto,
    id = sid.generate(),
    fileName = id + "." + fileExtension(safeFilename('test')),
    dirPath = UPLOAD_PATH + '/' + id,
    filePath = dirPath + '/' + fileName;

    try {
      mkdirp.sync(dirPath, 0755);
    } catch (e) {
      console.log(e);
    }

    // fs.readFile('/home/pi/Documents/'+ fileName, function (err, data) {
    //   if (err) {
    //     res.json({'error': 'could not read file'});
    //   } else {
    //     fs.writeFile('/home/pi/Documents/'+ fileName, data, function (err) {
    //       if (err) {
    //         res.json({'error': 'could not write file to storage'});
    //       } else {
            processImage(id, fileName, filePath, function (err, data) {
              if (err) {
                res.json(err);
              } else {
                res.json(data);
              }
            });
    //       }
    //     })
    //   }
    // });
  },
  show: function (req, res, next) {
    // User.findOne( req.param('id'), function foundUser (err, user) {
    //  if (err) return next(err);
    //  if (!user) return next();
      // res.view({
      //  face: face
    // });

    res.view('file/show');
  },
/**
* Overrides for the settings in `config/controllers.js`
* (specific to GifController)
*/
_config: {}
};
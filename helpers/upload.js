require('dotenv').config();
const aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3-transform');
const sharp = require('sharp');


// ================== Upload image on S3 bucket Function Start==================//

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: process.env.S3_REGION
  });
 
const s3 = new aws.S3();

exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {  
        cb(null, `${Date.now()}-original-${file.originalname}`);
    }
});
 
exports.upload1 = multer({
   storage: multerS3({
     s3: s3,
     bucket: process.env.S3_BUCKET,
    //  acl: 'public-read',
    //  shouldTransform: function (req, file, cb) {
    //    cb(null, /^image/i.test(file.mimetype))
    //  },
     key: function (req, file, cb) {
         cb(null, Date.now().toString()+'original'+"."+file.originalname.split('.').pop())
     }
    //  transforms: [{
    //    id: 'original',
    //    key: function (req, file, cb) {
    //     console.log("+++++++++++++++", file);
    //        cb(null, Date.now().toString()+'original'+"."+file.originalname.split('.').pop())
    //    },
    //    transform: function (req, file, cb) {
    //      cb(null, sharp())
    //    }
    //  }, 
    //  {
    //    id: 'thumbnail',
    //    key: function (req, file, cb) {
    //        cb(null, Date.now().toString()+'thumbnail'+ ".jpg")
    //    },
    //    transform: function (req, file, cb) {
    //      cb(null, sharp().resize(50, 50))
    //    }
    //  }
    // ]
   })
 })
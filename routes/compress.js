var express = require('express');
var multer = require('multer');
var path = require("path");
var compress_images = require('compress-images');

var storage = multer.diskStorage({
  destination : "./public/images/",
  filename: function(req , file , cb){
    cb(null , (new Date()).getFullYear()+"_" + (new Date()).getMonth() + "_" + (new Date()).getDate() + "_" + (new Date()).getHours() + "_" + (new Date()).getMinutes() + "_" + file.originalname  )
  }
}) ;

// var storage = multer.diskStorage();

var upload = multer({ storage : storage});

var router = express.Router();



router.post('/', upload.any() ,function(req, res, next) {
    

    console.log("BEFORE");  
    upload.any(req , res, (err) => {
      next(err);
    });
    console.log("AFTER");
    

    const INPUT_path_to_your_images = './public/images/' + (new Date()).getFullYear()+"_" + (new Date()).getMonth() + "_" + (new Date()).getDate() + "_" + (new Date()).getHours() + "_" + (new Date()).getMinutes() + "_" + req.files[0].originalname;
    const OUTPUT_path = './public/compressed/';
    

    compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
      { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
      function (error, completed, statistic) {
        console.log("-------------");
        console.log(error);
        console.log(completed);
        console.log(statistic);
        console.log("-------------");

        res.statusCode = 200;
        res.sendFile("D:/Projects/bebackend" + '/public/compressed/' + (new Date()).getFullYear()+"_" + (new Date()).getMonth() + "_" + (new Date()).getDate() + "_" + (new Date()).getHours() + "_" + (new Date()).getMinutes() + "_" + req.files[0].originalname);
      }
);



      
    
});


router.post('/stat', upload.any() ,function(req, res, next) {
    

  console.log("BEFORE");  
  upload.any(req , res, (err) => {
    next(err);
  });
  console.log("AFTER");
  

  const INPUT_path_to_your_images = './public/images/' + (new Date()).getFullYear()+"_" + (new Date()).getMonth() + "_" + (new Date()).getDate() + "_" + (new Date()).getHours() + "_" + (new Date()).getMinutes() + "_" + req.files[0].originalname;
  const OUTPUT_path = './public/compressed/';
  

  compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    function (error, completed, statistic) {
      console.log("-------------");
      console.log(error);
      console.log(completed);
      console.log(statistic);
      console.log("-------------");

      
      res.statusCode = 200;
      res.setHeader("Content-Type" , "application/json");
      res.send(statistic);
    }
);



    
  
});



module.exports = router;

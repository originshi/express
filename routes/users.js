var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use((req, res, next)=>{
  console.log('guaqi')
  next();
})
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

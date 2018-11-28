var express = require('express');
var router = express.Router();
const request = require("request")


/* GET home page. */
router.get('/', function(req, res, next) {
    var options = {
        json: true,
        url: 'https://api.github.com/user/repos',
        headers: {
            "Authorization" : `TOKEN ${process.env.TOKEN}`,
            'User-Agent': 'request'
        }
      };

    request(options,function callback(error, response, body) {
        if (error) res.status(400).json({err: error.message})
        else{
            console.log(process.env.TOKEN, "========")
            res.status(200).json({body, response})
        }
    } )
      
});

router.get('/starred', function(req, res, next) {
    var options = {
        json: true,
        url: 'https://api.github.com/user/starred',
        headers: {
            "Authorization" : `TOKEN ${process.env.TOKEN}`,
            'User-Agent': 'request'
        }
      };

    request(options,function callback(error, response, body) {
        if (error) res.status(400).json({err: error.message})
        else{
            if(req.query.name == undefined)res.status(200).json({body})
            else{
                let result = body.filter((element) =>{
                    return element.name == req.query.name
                })

                res.status(200).json({result})
            }
        }
    } )
      
});

router.get('/starred/filter', function(req, res, next) {
    var options = {
        json: true,
        url: 'https://api.github.com/user/starred',
        headers: {
            "Authorization" : `TOKEN ${process.env.TOKEN}`,
            'User-Agent': 'request'
        }
      };

    request(options,function (error, response, body) {
        if (error) res.status(400).json({err: error.message})
        else{
            result = body.filter((element) =>{
                return element.stargazers_count >= req.query.star
            })
            res.status(200).json({result})


        }
    } )
      
});

router.post("/", function(req,res,next){
    var options = {
        json: true,
        method: "POST",
        url: 'https://api.github.com/user/repos',
        body: {
            "name": req.body.repoName,
            "auto_init": true
        },
        headers: {
            "Authorization" : `TOKEN ${process.env.TOKEN}`,
            'User-Agent': 'request'
        }
      };

      request(options,function (error, response, body) {
        if (error) res.status(400).json({err: error.message})
        else{
            res.status(200).json({body})
        }
    } )
})

router.get('/user', function(req, res, next) {
    var options = {
        json: true,
        url: `https://api.github.com/users/${req.query.user}/repos`,
        headers: {
            "Authorization" : `TOKEN ${process.env.TOKEN}`,
            'User-Agent': 'request'
        }
      };

    request(options,function (error, response, body) {
        if (error) res.status(400).json({err: error.message})
        else{
            
            res.status(200).json({body})


        }
    } )
      
});

router.get('/unstar', function(req, res, next) {
    var options = {
        json: true,
        url: `https://api.github.com/user/starred/${req.query.owner}/${req.query.repo}`,
        headers: {
            "Authorization" : `TOKEN ${process.env.TOKEN}`,
            'User-Agent': 'request'
        },
        method: "DELETE"
      };

    request(options,function (error, response, body) {
        if (error) res.status(400).json({err: error.message})
        else{
            
            res.status(200).json({msg: "you sucessfully unstar this repo"})


        }
    } )
      
});



module.exports = router;

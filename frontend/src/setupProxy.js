const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {

  app.use(proxy('/api', 
    {
        "target": "http://localhost:8081",
        "secure": false,
        pathRewrite: {
            "^/api": "" 
        },
        "changeOrigin": true
    }))
    
}
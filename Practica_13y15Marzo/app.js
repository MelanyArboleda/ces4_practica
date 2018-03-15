var http = require('http');
var fs = require('fs');
var path = require('path');
var url =  require('url');


function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: Resource not found.');
    response.end();
}

var mimeLookup = {
    '.js': 'application/javascript',
    '.html': 'text/html'
    //'.css': 'text/css'
};

var server = http.createServer(function (req, res) {
    console.log(req.url, req.method)
    if (req.method == 'GET') {
        var fileurl = '/Errores.html';
        if (req.url == '/')
            fileurl = '/Errores.html';
        else
            fileurl = req.url;
        var filepath = path.resolve('./' + fileurl);
        console.log(filepath);
        var fileExt = path.extname(filepath);
        var mimeType = mimeLookup[fileExt];
        if (!mimeType) {
            send404(res);
            return;
        }
        fs.exists(filepath, function (exists) {
            if (!exists) {
                send404(res);
                return;
            };
            res.writeHead(200, { 'content-type': mimeType });
            fs.createReadStream(filepath).pipe(res);
            if(url){
              var q = url.parse(req.url, true).query;
              var txt = q.status + " dsag " + q.message;
              console.log(q);
            }    
        });
    } else {
        send404(res);
    }
}).listen(3030);

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
};

var server = http.createServer(function (req, res) {
    if (req.method == 'GET') {
        var fileurl = '/Errores.html';
        if (req.url == '/')
            fileurl = '/Errores.html';
        else
            fileurl = req.url;
        var filepath = path.resolve('./' + fileurl);
        var q = url.parse(req.url, true).query;
        if(q.status){
            var txt = q.status + " dsag " + q.message;
            res.write(`<h1> Status : ${q.status} </h1>`);
            res.write(`<span> Message : ${q.message} </span> <br>`);
            res.write(`<h3><a href="/" > Back </a></h3>`);
            res.end();
            return;
        }
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
            
        });
    } else {
        send404(res);
    }
}).listen(3030);

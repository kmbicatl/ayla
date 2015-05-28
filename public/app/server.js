var application_root	= __dirname;
var	express				= require('express');
var path				= require('path'); // path parsing module
var	url					= require("url");
var favicon				= require('serve-favicon');
var bodyParser			= require('body-parser');
//var methodOverride	= require('method-override');
var	errorhandler		= require('errorhandler');
var expressLogger		= require('express-logger');
var expressjson			= require('express-json');
var multipart			= require('connect-multiparty');
var config				= require('./libs/config');
var	log					= require('./libs/log')(module);
var	router				= express.Router();
var fs					= require("fs");
var crypto              = require('crypto');
var mime				= require('mime');
var http				= require('http');
var jade				= require('jade');
var md5					= require('MD5');

var app					= express();
var multipartMiddleware = multipart();

app.use(router);
/*
app.all('/', function (req, res) {
		res.setHeader('content-type', "text/html");
		res.writeHead(200);
		html = fs.readFileSync("./index.html", "utf8");
		res.write(html);
		res.end();
});*/

//app.use('/assets',express.static(path.join(application_root,'public', '/assets')));
app.use('/css',express.static(path.join(application_root,'/css')));
app.use('/js',express.static(path.join(application_root, '/js')));
app.use('/img',express.static(path.join(application_root, '/img')));
app.use('/ajax',express.static(path.join(application_root,'/ajax')));
app.use('/',express.static(path.join(application_root,'/')));

//app.use(favicon(__dirname + '/public/favicon.ico')); // use standard favicon
//app.use(express.logger('dev')); // log all requests

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressjson);       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(errorhandler({ dumpExceptions: true, showStack: true }));
//app.use(methodOverride); // HTTP PUT and DELETE support
app.use(express.static(path.join(application_root, "public")));
app.use(expressLogger);

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});


app.listen(3001, function(){
    console.log('Express server listening on port 3001');
	log.info('Express server listening on port 3001');
});



var options = {
//  hostname: 'http://216.117.39.230',
  hostname: 'https://google.com',
  port: 80,
 // path: '/solr/KonicaMinolta/select',
 //params:'q="a"&wt=json&indent=true&rows=100&fl=*',
  method: 'GET'
};

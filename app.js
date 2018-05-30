var express = require("express");
var app = express();

var request = require("request");
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3001; 

app.get("/", function(req, res){
	res.render("search");
});

app.get("/results", function(req, res){
	var search = req.query.search;
	if( search.length > 0){
		var url = "http://www.omdbapi.com/?apikey=b08e95e3&s=" + search;
		request(url, function(err, response, body){
			if(!err && response.statusCode == 200){
				var data = JSON.parse(body);
				res.render("results", {data});
			}
		})
	} else {
		res.redirect("/");
	}	
});

app.get("/movie/:id", function(req, res){
	var url = "http://www.omdbapi.com/?apikey=b08e95e3&i=" + req.params.id;
	request(url, function(err, response, body){
		if(!err && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("movie", {data});
		}
	})
});

app.listen(PORT, function(){
	console.log("server starts");
});
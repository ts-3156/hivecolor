var all_hash = {};
var baseUrl = 'http://hivecolor.com/id/';

function count_all(_id){

	if(_id > 120)
		return;

	var pageId = (_id ? _id : 1);
	var url = baseUrl + pageId;

	var fb = -1, tw = -1, hatebu = -1;

	function allFinish() {
		if (fb == -1 || tw == -1 || hatebu == -1)
			return;

		var total = (fb + tw + hatebu)
		if(total > 10){
			console.log(url + ': ' + total);
			all_hash[url] = total;
		}

		count_all(_id + 1);
	}

	function insertScript(url) {
	  var target = document.createElement('script');
		target.charset = 'utf-8';
		target.src = url;
		document.body.appendChild(target);
	}

	function likeCount(_url) {
		var pageURL = (_url) ? _url : location.href;
		pageURL = encodeURIComponent(pageURL);
		var callback_name = 'jsonp_fb_like';
		var url = 'http://graph.facebook.com/' + pageURL + '?callback=' + callback_name;

		insertScript(url);

		window[callback_name] = function(data){
			var count = (data.shares) ? data.shares : 0;
			fb = count;
			//console.log('fb like: ' + count);
			//all_hash[_url] = all_hash[_url] + count;
			allFinish();
		};
	}

	function tweetCount(_url) {
		var pageURL = (_url) ? _url : location.href;
		pageURL = encodeURIComponent(pageURL);
		var callback_name = 'jsonp_tw';
		var url = 'http://urls.api.twitter.com/1/urls/count.json?url=' + pageURL + '&callback=' + callback_name  + '&noncache=' + new Date();

		insertScript(url);

		window[callback_name] = function(data){
			tw = data.count;
			//console.log('tw: ' + data.count);
			//all_hash[_url] = all_hash[_url] + data.count;
			allFinish();
		};
	}

	function hatebuCount(_url) {
		var pageURL = (_url) ? _url : location.href;
		pageURL = encodeURIComponent(pageURL);
		var callback_name = 'jsonp_hatebu';
		var url = 'http://api.b.st-hatena.com/entry.count?url=' + pageURL + '&callback=' + callback_name;

		insertScript(url);

		window[callback_name] = function(data){
			var count = (data) ? data : 0;
			hatebu = count;
			//console.log('hatebu: ' + count);
			//all_hash[_url] = all_hash[_url] + count;
			allFinish();
		};
	}

	likeCount(url);
	tweetCount(url);
	hatebuCount(url);

}

count_all(1);



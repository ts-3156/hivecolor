var likeCount = function(_id ,_url) {
	if(!_id)	return;
	var pageURL = (_url) ? _url : location.href;
	pageURL = encodeURIComponent(pageURL);
	var callback_name = 'jsonp_' + _id;
	var url = '//graph.facebook.com/' + pageURL + '?callback=' + callback_name;
	//JSONの読み込み
	var target = document.createElement('script');
	target.charset = 'utf-8';
	target.src = url;
	document.body.appendChild(target);
	window[callback_name] = function(data){
		//読み込み結果
		var count = (data.shares)? data.shares : 0;
		//document.getElementById(_id).innerHTML = count;
		var elements = document.getElementsByClassName(_id);
				var i = 0;
				for(i = 0; i < elements.length; i++)
					elements[i].innerHTML = count;
	};
}

var tweetCount = function(_id ,_url) {
	if(!_id)	return;
	var pageURL = (_url) ? _url : location.href;
	pageURL = encodeURIComponent(pageURL);
	var callback_name = 'jsonp_' + _id;
	var url = '//urls.api.twitter.com/1/urls/count.json?url=' + pageURL + '&callback=' + callback_name  + '&noncache=' + new Date();
	//JSONの読み込み
	var target = document.createElement('script');
	target.charset = 'utf-8';
	target.src = url;
	document.body.appendChild(target);
	window[callback_name] = function(data){
		//読み込み結果
		//document.getElementById(_id).innerHTML = data.count;
		var elements = document.getElementsByClassName(_id);
				var i = 0;
				for(i = 0; i < elements.length; i++)
					elements[i].innerHTML = '<a href="//twitter.com/search?q=' + pageURL + '" target="_blank">' + data.count + '</a>';
	};
}

var hatebuCount = function (_id ,_url) {
	if(!_id)	return;
	var pageURL = (_url) ? _url : location.href;
	pageURL = encodeURIComponent(pageURL);
	var callback_name = 'jsonp_' + _id;
	var url = '//api.b.st-hatena.com/entry.count?url=' + pageURL + '&callback=' + callback_name;
	//JSONの読み込み
	var target = document.createElement('script');
	target.charset = 'utf-8';
	target.src = url;
	document.body.appendChild(target);
	window[callback_name] = function(data){
		//読み込み結果
		var count = (data)? data : 0;
		//document.getElementById(_id).innerHTML = count;
		var elements = document.getElementsByClassName(_id);
				var i = 0;
				for(i = 0; i < elements.length; i++)
					elements[i].innerHTML = count;
	};
}

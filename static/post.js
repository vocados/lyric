function callAjax(c, b) {
    var a = new XMLHttpRequest;
    a.onreadystatechange = function() {
        4 == a.readyState && 200 == a.status && b(JSON.parse(a.responseText))
    };
    a.open("GET", c, !0);
    a.send()
}

function getList(c) {
	var arr = [], idx = 0, row ;
	for(var i=0, len = c.data.length; i<len; i++) {
		row = c.data[i];
		
		if (location.pathname == row.url) {
			continue;
		}
		
		arr[idx++] = '<a href="' + row.url + '" class="list-group-item list-group-item-action flex-column align-items-start">'
		arr[idx++] = '  <div class="d-flex w-100 justify-content-between">'
		arr[idx++] = '    <h5 class="mb-1">' + row.subject + '</h5>'
		arr[idx++] = '    <small>' + row.artist + '</small>'
		arr[idx++] = '  </div>'
		arr[idx++] = '  <p class="mb-1">' + row.lyric + '</p>'
		arr[idx++] = '</a>'
	}
	
	$("#listGroup").html(arr.join(''));
}
$(document).ready(function() {
	var artist = location.pathname.split('/')[2];
	
	console.log(artist);
	
    callAjax("/json/"+artist+"/last.json", function(c) {
        callAjax("/json/"+artist+"/"+c.last+".json", function(d) {
        	getList(d);
        });
    })
});
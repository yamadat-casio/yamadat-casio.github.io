var strServiceId = "";
var strHostName = "localhost";

function init(){
	clr();
	strServiceId = null;
	document.information.id.value = strServiceId;
}

function clr(){
	document.request.profile.value ="";
	document.request.api.value ="";
	document.request.method.selectedIndex =0;
	document.request.id.checked =false;
	document.information.log.value = "";
	document.information.req.value = "";
	clrOption();
}

function clrOption(){
	document.request.option1.value ="";
	document.request.option2.value ="";
	document.request.option3.value ="";
}

function setup(){
	clr();
	document.request.profile.value ="servicediscovery";
	send_request();

}

function send_request(){
	var profile = document.request.profile.value;
	var api = document.request.api.value;
	var id_flag = document.request.id.checked;
	var url = "http://"+strHostName+":4035/gotapi/"+ profile;
	var opt_flag = false;
	var method = "GET";

	if(api != null && api != ""){
		url += "/" + api;
	}
	if( id_flag ){
		url += "?";
	}
	if( id_flag ){
		url += "serviceId="+strServiceId;
		opt_flag = true;
	}
	
	
	document.information.req.value = url;
	
	//アクセス開始
	http_request( method, url, null )
}


function http_request(method, url, callback ){
	document.information.log.value = method;
//	$.ajax({
//		url : url,
//		type : method,
//		dataType : "json",
//		success callback
//	});
}

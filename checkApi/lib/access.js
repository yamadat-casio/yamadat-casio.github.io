var strServiceId = "";
var strHostName = "localhost";

//起動時
$(function(){
	allClr();
        $.ajaxSetup({
            dataType: 'json',
            timeout: 10000,
            headers: {
                'pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT'
            }
        });
	addLog("init<br>")
});

//リクエストボタン
$(function(){
	$("#request-btn").click(function(){
		sendRequest();
	});
});
//セットアップボタン
$(function(){
	$("#setup-btn").click(function(){
		clr();
		$("#profile-fld").val("servicediscovery");
		sendRequest();
	});
});
//クリアボタン
$(function(){
	$("#clr-btn").click(clr);
});

function allClr(){
	$("#log-text").val("");
	clr();
}

function clr(){
	$("#profile-fld").val("");
	$("#api-fld").val("");
	$("#req-text").val("");
	$("#resp-text").val("");
	$("#service-id-chk").val(false);
	document.request.method.selectedIndex =0;
	clrOption();
}

function clrOption(){
	document.request.option1.value ="";
	document.request.option2.value ="";
	document.request.option3.value ="";
}

function addLog(message){
	$("#log-text").html($("#log-text").html()+message);
}

function sendRequest(){
	addLog("request<br>");

	var profile = $("#profile-fld").val();
	var api = $("#api-fld").val();
	var id_flag = $("#service-id-chk").prop("checked");
	var url = "http://"+strHostName+":4035/gotapi/"+ profile;
	var opt_flag = false;
	var method = $("#method").val();

	if(api != null && api != ""){
		url += "/" + api;
	}
	if( id_flag ){		//引数有り
		url += "?";
	}
	if( id_flag ){
		url += "serviceId="+strServiceId;
		opt_flag = true;
	}
	
	$("#req-text").html(url);
	
	$.ajax({
		type: method,
		url: url,
		success: receiveResponse
//		error: function(msg){
//			errorHttp(msg);
//		}
        }).done(function (data, textStatus, jqXHR) {
		addLog('status:' + jqXHR.status + ', textStatus: ' + textStatus + "<br>");
        }).fail(function (jqXHR, textStatus, errorThrown) {
		addLog('status:' + jqXHR.status + ', textStatus: ' + textStatus + ', errorThrown: ' + errorThrown + "<br>");
        }).always(function () {
        });
}


function receiveResponse(message){
	var profile = $("#profile-fld").val();
	addLog("success<br>");
	$("#resp-text").html(JSON.stringify(message));
	
	if(profile == "servicediscovery"){
		addLog("checkId<br>");
		for (var _i = 0, _a = message.services; _i < _a.length; _i++) {
			var service = _a[_i];
			if (service.hasOwnProperty('name') && service.name == 'Exilim') {
				strServiceId = service.id;
				$("#service-id-text").html(strServiceId);
				break;
			}
		}
	}
}



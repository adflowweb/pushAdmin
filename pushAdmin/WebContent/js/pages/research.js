

function addResearchFunction(){
	
	
	
	 var input_researchAdd=$('#input_researchAdd').val();
	 if(input_researchAdd==""||input_researchAdd==null){
		  alert('설문조사 항목을 입력해 주세요.');
		  return false;
	 }
	 	 
	 var radioBtn = $('<br/><input type="radio" style="width:20px; height:20px;vertical-align: baseline;" name="nameResearch" value="'+input_researchAdd+'"/>'+input_researchAdd+'<br/>');	
 	  radioBtn.appendTo('.presearch');
 	 $('#input_researchAdd').val('');
}


function researchSend(){
	 var input_researchTitle=$('#input_researchTitle').val();
	 
	 if(input_researchTitle==""||input_researchTitle==null ||input_researchTitle.length > 15){
		  alert('설문조사 제목 이 없거나 너무 깁니다 (길이 15자 이하).');
		  return false;
	 }
	 
	var researchHtml= $('.presearch').html();
	console.log(researchHtml.length);
	console.log(researchHtml);
	if(researchHtml.length==0){
		alert('설문조사 목록이 없습니다.');
		return false;
	}
	
	var smscheck=false;
	var smsTimeOut=0;
	var qos=0;
	var tokenID = sessionStorage.getItem("tokenID");
	var loginID = sessionStorage.getItem("userID");
	if (tokenID) {
		
		qos=$("#qosSelect").val();
		console.log("QOS");
		console.log(qos);
		if($("input:checkbox[id='smsckeck']").is(":checked") == true){
	    	var timeSet= $('#timeSelect').val();
	    	console.log('smsckeck change function');
	    	smscheck=true;
	    	if(timeSet==1){
	    		smsTimeOut=600;
	    	}else if(timeSet==2){
	    		smsTimeOut=1200;
	    	}else if(timeSet==3){
	    		smsTimeOut=1800;
	    	}else if(timeSet==4){
	    		smsTimeOut=3600;
	    	}
			
		} 
		var htmlEncodeResult = utf8_to_b64(researchHtml);
		var input_researchTitle = $('#input_researchTitle').val();
		var input_reservation = $('#input_reservation').val();
		var cateGorySelect="설문조사";
		dateResult = dateFormating(input_reservation);
	
		if (input_reservation) {
		    dateResult = dateResult.toISOString();
		}
		if(typeof dateResult===undefined||typeof dateResult==='undefined'){
			console.log("date Result is..undefined.....");
			dateResult="";
		}

		$
				.ajax({
					url : '/v1/messages',
					type : 'POST',
					headers : {
						'X-ApiKey' : tokenID
					},
					contentType : "application/json",
					dataType : 'json',
					async : false,
					data : '{"sender":"'
						+ loginID
						+ '","receiver":"/users","qos":'+qos+', "retained":false, "type":1,"sms":'+smscheck+', "timeOut":'+smsTimeOut+',"reservation":"'
						+ dateResult
						+ '","category":"'+cateGorySelect+'", "content":" {\\"notification\\":{\\"notificationStyle\\":1,\\"contentTitle\\":\\"'
						+ input_researchTitle
						+ '\\",\\"contentText\\":\\"'
						+ input_researchTitle + '\\",\\"imageName\\":\\"\\",\\"htmlContent\\":\\"'
						+ htmlEncodeResult + '\\",\\"ticker\\":\\"'
						+ input_researchTitle
						+ '\\",\\"summaryText\\":\\"'
						+ input_researchTitle
						+ '\\", \\"image\\":\\"\\"} } "}',
					success : function(data) {
						console.log(data);
						console.log(data.result.success);
						if (data.result.info) {
							alert("설문조사를 성공적으로 전송하였습니다.");

							wrapperFunction('research');
						
						} else {
							alert("설문조사 전송에 실패 하였습니다");
							wrapperFunction('research');
							
						}
					},
					error : function(data, textStatus, request) {
						alert("설문조사 전송에 실패 하였습니다");

						wrapperFunction('research');
					
						console.log(data);
					}
				});
	}
	
	
	
	
	
	 
}
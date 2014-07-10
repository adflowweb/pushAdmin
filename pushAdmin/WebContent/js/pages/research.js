

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
	var researchHtmlText=$('.presearch').text();
	console.log('서버로 보낼 설문조사 항목 시작 ');
	console.log(researchHtmlText);
	console.log('서버로 보낼 설문조사 항목 끝');
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
		var surveyStart = $('#input_surveyStart').val();
		var surveyEnd = $('#input_surveyEnd').val();
		console.log(surveyStart);
		console.log(surveyEnd);
		var cateGorySelect="설문조사";
		var startdateResult = dateFormating(surveyStart);
		var enddateResult=dateFormating(surveyEnd);
		console.log(startdateResult);
		console.log(enddateResult);
		if (surveyStart) {
			startdateResult = startdateResult.toISOString();
		}
		
		if(enddateResult){
			enddateResult=enddateResult.toISOString();
		}
		console.log('설문 시작 날 끝날 로그 시작');
		console.log(startdateResult);
		console.log(enddateResult);
		
		console.log('설문 시작날 끝나는날 로그 끝');
		
		
		
		
		if(typeof startdateResult===undefined||typeof startdateResult==='undefined'||enddateResult===undefined||typeof enddateResult==='undefined'){
			console.log("date Result is..undefined.....");
			alert('설문 시작일과 종료일을 설정 하여야 합니다.');
			return false;
		}

		 var startCheck= surveyDateCheck(startdateResult);
		 var endChekc=surveyDateCheck(enddateResult);
		 console.log('start!!!!!!!!!!!!!!!!!!!!!');
		 console.log(startCheck);
		 console.log(endChekc);
		 console.log('end!!!!!!!!!!!!!!!!!!!!!');
		 if(startCheck>endChekc){
			 alert('시작일이 종료일보다 큽니다.');
			 return false;
		 }
		
		
		
		var serverSendRadio="";
		var testArr=[];
		var testString="";
		//"answers":["아르헨티나","독일"]
		$('input[name=nameResearch]').each(function(){
			console.log($(this).val());
			testArr=testArr.concat($(this).val());
			serverSendRadio=serverSendRadio.concat("\\\""+$(this).val()+"\\\""+",");
			testString=testString.concat($(this).val()+",");
		});
		
		console.log('어래이');
		console.log(testArr);
		console.log(serverSendRadio);
		serverSendRadio=serverSendRadio.slice(0, -1);
		testString=testString.slice(0, -1);
		console.log('서버 전송 컨턴트');
		console.log(serverSendRadio);
		console.log('서버전송 컨텐트');
		console.log('테스트 스트링');
		console.log(testString);
		//서버로 설문 조사 전송
		//if(success){}
		//client  message send 
//		 - **  설문조사입력  **
//		 > **request : ** 
//		 *method : POST
//		 header : X-ApiKey:{tokenID}
//		 uri : /v1/bsbank/poll *
//		 >
//		 > **body : **
//		 *{"title":"월드컵우승국은?","start":"2104-07-07","end":"20140708","responses":0,"status":0, "answers":["아르헨티나","독일"]}*
//		 > **response : **
//		 *{"result":{"success":true,"info":["updates=3"]}}*
		$
		.ajax({
			url : '/v1/bsbank/poll',
			type : 'POST',
			headers : {
				'X-ApiKey' : tokenID
			},
			contentType : "application/json",
			dataType : 'json',
			async : false,
			data : '{"title":"'+input_researchTitle+'","start":"'+startdateResult+'","end":"'+enddateResult+'","responses":0,"status":0, "answers":["'+serverSendRadio+'"]}',
			success : function(data) {
				console.log(data);
				console.log(data.result.success);
				if (data.result.info) {
					console.log('설문조사 서버 전송 성공.');
					console.log('client sen start');
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
									+ startdateResult
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
				
				} else {
					alert("설문조사 전송에 실패 하였습니다");
				
					
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


function surveyDateCheck(str){
	var yyyy=str.substring(0,4);
	console.log('functino start');
	console.log(yyyy);
	var mm=str.substring(5,7);
	console.log(mm);
	var dd=str.substring(8,10);
	console.log(dd);
	var result=yyyy+mm+dd;
	result*=1;
	return result;
}
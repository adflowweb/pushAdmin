
function surveyPersonSearch() {

	var searchForm = surveySearchFormCheck();

	if (searchForm) {
		var selectValue = $('#searchSelect').val();
		console.log("select Value...start");
		console.log(selectValue);
		console.log("select value end..");
		var tokenID = sessionStorage.getItem("tokenID");
		var userID = sessionStorage.getItem("userID");

		// name
		if (selectValue == 1) {
			var input_searchContent = $('#input_searchContent').val();
			console.log(input_searchContent);
			if(input_searchContent.length<2){
				alert('이름은 2자 이상 입력 하셔야 합니다.');
				$('#input_searchContent').focus();
				return false;
			}
			$.ajax({
				// /v1/bsbank/groups/BSCP
				url : ' /v1/bsbank/users?name=' + input_searchContent ,
				type : 'GET',
				headers : {
					'X-ApiKey' : tokenID
				},
				contentType : "application/json",
				async : false,
				success : function(data) {
					//search Success
					
					if(data.result.data){

					var tableData = [];
					for ( var i in data.result.data) {
						var item = data.result.data[i];
						console.log('search Success');
						console.log(item);
						tableData.push({
							"Id" : item.gw_stf_cdnm,
							"Name" : item.gw_user_nm,
							"Dept" : item.gw_sbsd_cdnm,
							"Phone" : item.gw_stf_cdnm
						});
					}

					console.log(tableData);
					var odataTable = $('#dataTables-example-person').dataTable({
						bJQueryUI : true,
						aaData : tableData,
						bDestroy : true,
						aoColumns : [ {
							mData : 'Id'
						}, {
							mData : 'Name'
						}, {
							mData : 'Dept'
						}, {
							mData : 'Phone'
						} ]
					});

					// odataTable.ajax.reload();
					$('#dataTables-example-person tbody').on(
							'click',
							'tr',
							function() {
								console.log('클리이벤트');
								var tableData = $(this).children("td").map(
										function() {
											return $(this).text();
										}).get();

								console.log(tableData[0]);
								$('#input_researchTarget').val(tableData[0]);

							});
					}else{
						alert('해당 유저 이름이 없습니다');
					}
				},
				error : function(data, textStatus, request) {
					console.log(data);
					alert('정보를 가지고 오는데 실패 하였습니다.');
				}
			});
			

			// Id
		} else if (selectValue == 2) {
			var input_searchContent = $('#input_searchContent').val();
			$.ajax({
				// /v1/bsbank/groups/BSCP
				url : ' /v1/bsbank/users/' + input_searchContent,
				type : 'GET',
				headers : {
					'X-ApiKey' : tokenID
				},
				contentType : "application/json",
				async : false,
				success : function(data) {
					//search Success
					if(data.result.data){
					var tableData = [];
					var item = data.result.data;
					console.log('search Success');
					console.log(item);

					tableData.push({
						"Id" : item.gw_stf_cdnm,
						"Name" : item.gw_user_nm,
						"Dept" : item.gw_sbsd_cdnm,
						"Phone" : item.gw_stf_cdnm
					});
					console.log(tableData);
					var odataTable = $('#dataTables-example-person').dataTable({
						bJQueryUI : true,
						aaData : tableData,
						bDestroy : true,
						aoColumns : [ {
							mData : 'Id'
						}, {
							mData : 'Name'
						}, {
							mData : 'Dept'
						}, {
							mData : 'Phone'
						} ]
					});

					// odataTable.ajax.reload();
					$('#dataTables-example-person tbody').on(
							'click',
							'tr',
							function() {
								console.log('클리이벤트');
								var tableData = $(this).children("td").map(
										function() {
											return $(this).text();
										}).get();

								console.log(tableData[0]);
								$('#input_researchTarget').val(tableData[0]);

							});
					}else{
						alert('해당 유저 아이디가 없습니다');
					}
				},
				error : function(data, textStatus, request) {
					console.log(data);
					alert('정보를 가지고 오는데 실패 하였습니다.');
				}
			});

		}
	}

}



function addResearchFunction() {

	var input_researchAdd = $('#input_researchAdd').val();
	if (input_researchAdd == "" || input_researchAdd == null) {
		alert('설문조사 항목을 입력해 주세요.');
		return false;
	}

	var radioBtn = $('<br/><input type="radio" style="width:20px; height:20px;vertical-align: baseline;" name="nameResearch" value="'
			+ input_researchAdd + '"/>' + input_researchAdd + '<br/>');
	radioBtn.appendTo('.presearch');
	$('#input_researchAdd').val('');
}

function researchSend() {
	var input_researchTitle = $('#input_researchTitle').val();
	var noIdSurvey="";
	if($("input:checkbox[id='noIdSurvey_checkBox']").is(":checked") == true){
		noIdSurvey="true";
		
	}else{
		noIdSurvey="false";
	}

	if (input_researchTitle == "" || input_researchTitle == null
			|| input_researchTitle.length > 15) {
		alert('설문조사 제목 이 없거나 너무 깁니다 (길이 15자 이하).');
		return false;
	}

	var researchHtml = $('.presearch').html();
	var researchHtmlText = $('.presearch').text();
	console.log('서버로 보낼 설문조사 항목 시작 ');
	console.log(researchHtmlText);
	console.log('서버로 보낼 설문조사 항목 끝');
	console.log(researchHtml.length);
	console.log(researchHtml);
	if (researchHtml.length == 0) {
		alert('설문조사 목록이 없습니다.');
		return false;
	}

//	var smscheck = false;
//	var smsTimeOut = 0;
	var qos = 0;
	var tokenID = sessionStorage.getItem("tokenID");
	var loginID = sessionStorage.getItem("userID");
	if (tokenID) {

		qos = $("#qosSelect").val();
		console.log("QOS");
		console.log(qos);

		var htmlEncodeResult = utf8_to_b64(researchHtml);
		var input_researchTitle = $('#input_researchTitle').val();
		var surveyStart = $('#input_surveyStart').val();
		var surveyEnd = $('#input_surveyEnd').val();
		console.log(surveyStart);
		console.log(surveyEnd);
		var cateGorySelect = "설문조사";
		var startdateResult = dateFormating(surveyStart);
		var enddateResult = dateFormating(surveyEnd);
		console.log(startdateResult);
		console.log(enddateResult);
		if (surveyStart) {
			startdateResult = startdateResult.toISOString();
		}

		if (enddateResult) {
			enddateResult = enddateResult.toISOString();
		}
		console.log('설문 시작 날 끝날 로그 시작');
		console.log(startdateResult);
		console.log(enddateResult);

		console.log('설문 시작날 끝나는날 로그 끝');

		if (typeof startdateResult === undefined
				|| typeof startdateResult === 'undefined'
				|| enddateResult === undefined
				|| typeof enddateResult === 'undefined') {
			console.log("date Result is..undefined.....");
			alert('설문 시작일과 종료일을 설정 하여야 합니다.');
			return false;
		}

		var startCheck = surveyDateCheck(startdateResult);
		var endChekc = surveyDateCheck(enddateResult);
		console.log('start!!!!!!!!!!!!!!!!!!!!!');
		console.log(startCheck);
		console.log(endChekc);
		console.log('end!!!!!!!!!!!!!!!!!!!!!');
		if (startCheck > endChekc) {
			alert('시작일이 종료일보다 큽니다.');
			return false;
		}

		var serverSendRadio = "";
		var testArr = [];
		var testString = "";
		// "answers":["아르헨티나","독일"]
		$('input[name=nameResearch]').each(
				function() {
					console.log($(this).val());
					testArr = testArr.concat($(this).val());
					serverSendRadio = serverSendRadio.concat($(this).val() + '","');
					testString = testString.concat($(this).val() + ",");
				});

		console.log('어래이');
		console.log(testArr);
		console.log(serverSendRadio);
		serverSendRadio = serverSendRadio.slice(0, -3);
		testString = testString.slice(0, -1);
		console.log('서버 전송 컨턴트');
		console.log(serverSendRadio);
		console.log('서버전송 컨텐트');
		console.log('테스트 스트링');
		console.log(testString);
		
		var test='{"title":"' + input_researchTitle + '","start":"'
		+ startdateResult + '","end":"' + enddateResult
		+ '","responses":0,"status":0, "answers":["'
		+ serverSendRadio + '"]}';
		console.log("test log start");
		console.log(test);
		var input_researchTarget=$('#input_researchTarget').val();
		var sendTarget=[];
	
		console.log(input_researchTarget);

		sendTarget= input_researchTarget.split('(');
		console.log(sendTarget[0]);
		var receiver="";
		if(sendTarget.length>1){
			receiver="/groups/"+sendTarget[0];
		}else if(sendTarget[0]==null||sendTarget[0]==""){
			('타겟을 지정하지 않음');
			if (confirm("전 직원 설문 조사로 발송 하시겠습니까??") == true) { // 확인
				receiver="/users";
			} else { // 취소
				return;
			}
		
		}else{
			receiver="/users/"+sendTarget[0];
		}
		console.log('설문 조사 대상 시작');
		console.log(sendTarget);
		console.log(receiver);
		console.log('설문조사 대상 끝');
		$
				.ajax({
					url : '/v1/bsbank/polls',
					type : 'POST',
					headers : {
						'X-ApiKey' : tokenID
					},
					contentType : "application/json",
					dataType : 'json',
					async : false,
					data : '{"title":"' + input_researchTitle + '","start":"'
							+ startdateResult + '","end":"' + enddateResult
							+ '","responses":0,"status":0, "answers":["'
							+ serverSendRadio + '"]}',
					success : function(data) {
						console.log(data);
						console.log(data.result.success);
						if (data.result.data) {
							console.log('설문조사 서버 전송 성공.');
							console.log('client sen start');
							console.log(data);
							var pollID = data.result.data.id;
							console.log(pollID);
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
												+ '","receiver":"'+receiver+'","qos":'
												+ qos
												+ ', "retained":false,"type":1,"sms":"", "timeOut":"","reservation":"","category":"'
												+ cateGorySelect
												+ '", "content":" {\\"notification\\":{\\"notificationStyle\\":1,\\"contentTitle\\":\\"'
												+ input_researchTitle
												+ '\\",\\"contentText\\":\\"'
												+ input_researchTitle
												+ '\\",\\"pollID\\":\\"'
												+ pollID
												+ '\\",\\"imageName\\":\\"\\",\\"noid\\":\\"'+noIdSurvey+'\\",\\"htmlContent\\":\\"'
												+ htmlEncodeResult
												+ '\\",\\"ticker\\":\\"'
												+ input_researchTitle
												+ '\\",\\"summaryText\\":\\"'
												+ input_researchTitle
												+ '\\", \\"image\\":\\"\\"} } "}',
										success : function(data) {

											console.log(data.result.success);
											if (data.result.info) {
												console.log('info.....');
												alert("설문조사를 성공적으로 전송하였습니다.");

												wrapperFunction('research');

											} else {
												console.log(data.result);
												console.log('else info');
												alert("설문조사 전송에 실패 하였습니다");
												wrapperFunction('research');

											}
										},
										error : function(data, textStatus,
												request) {
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

function surveySearchFormCheck() {
	var input_searchContent = $('#input_searchContent').val();
	if (input_searchContent == null || input_searchContent == "") {
		alert("검색할 대상을 입력해주세요");
		$('#input_searchContent').focus();
		return false;
	}
	return true;
}

function surveyDateCheck(str) {
	var yyyy = str.substring(0, 4);
	console.log('functino start');
	console.log(yyyy);
	var mm = str.substring(5, 7);
	console.log(mm);
	var dd = str.substring(8, 10);
	console.log(dd);
	var result = yyyy + mm + dd;
	result *= 1;
	return result;
}
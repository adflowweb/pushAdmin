
alreadyclickedA=false;
alreadyclickedB=false;
alreadyclickedC=false;
$('#dataTables-example-groupA tbody').on('click','tr',function(){
    var el=$(this);
    console.log(el);
    if (alreadyclickedA){
    	alreadyclickedA=false; // reset
        clearTimeout(alreadyclickedTimeout); // prevent this from happening
        // do what needs to happen on double click. 
        console.log('double click!!');
        
    	var tableData = el.find("td").map(function() {
			return $(this).text();
		}).get();
    	 if ($("input:checkbox[id='input_targetcheck']").is(
		 ":checked") == true) {
		
		 var inputMessageTarget = tableData[0] + "["
		 + tableData[1] + "],";
		 $('#input_messageTarget').val(
		 $('#input_messageTarget').val()
		 + inputMessageTarget);
		
		 } else {
		
		 $('#input_messageTarget').val(
		 tableData[0] + "[" + tableData[1] + "]");
		
		 }
		// get group info
    }else{
    	alreadyclickedA=true;
    
        console.log(el);
        console.log(el.closest("tr"));
        console.log(el.closest("tr").children("td"));
        console.log(el);
        alreadyclickedTimeout=setTimeout(function(){
        	alreadyclickedA=false; // reset when it happens
            console.log('singleclick');
    		var tokenID = sessionStorage.getItem("tokenID");
			var loginID = sessionStorage.getItem("userID");

			var tableDataElse =el.find("td").map(function() {
				return $(this).text();
			}).get();

			console.log(tableDataElse[0]);
			$
					.ajax({
						// /v1/bsbank/groups/BSCP
						url : '/v1/bsbank/groups/' + tableDataElse[0],
						type : 'GET',
						headers : {
							'X-ApiKey' : tokenID
						},
						contentType : "application/json",
						async : false,
						success : function(data) {
							var tableData = [];
							if (data.result.data) {

								for ( var i in data.result.data) {

									var item = data.result.data[i];
									console.log(item);
									tableData
											.push({
												"Group Id" : item.gw_deptmt_cdnm,
												"Group Name" : item.gw_dpnm,
												"Group Code" : item.gw_sbsd_cdnm
											});
								}

								console.log(tableData);
								var odataTable = $(
										'#detaildataTables-example-groupB')
										.dataTable({
											bJQueryUI : true,
											aaData : tableData,
											bDestroy : true,
											aoColumns : [ {
												mData : 'Group Id'
											}, {
												mData : 'Group Name'
											}, {
												mData : 'Group Code'

											} ]
										});

								// odataTable.ajax.reload();
								$(
										'#detaildataTables-example-groupB tbody')
										.on('click','tr',
									function() {
										    var el=$(this);
										    console.log(el);
										    if (alreadyclickedB){
										    	alreadyclickedB=false; // reset
										        clearTimeout(alreadyclickedTimeout); // prevent this from happening
										        // do what needs to happen on double click. 
										        console.log('double click!!');
										        
										    	var tableData = el.find("td").map(function() {
													return $(this).text();
												}).get();
										    	 if ($("input:checkbox[id='input_targetcheck']").is(
												 ":checked") == true) {
												
												 var inputMessageTarget = tableData[0] + "{"
												 + tableData[1] + "},";
												 $('#input_messageTarget').val(
												 $('#input_messageTarget').val()
												 + inputMessageTarget);
												
												 } else {
												
												 $('#input_messageTarget').val(
												 tableData[0] + "{" + tableData[1] + "}");
												
												 }
												// get group info
										    }else{
										    	alreadyclickedB=true;
										        
										        console.log(el);
										        console.log(el.closest("tr"));
										        console.log(el.closest("tr").children("td"));
										        console.log(el);
										        alreadyclickedTimeout=setTimeout(function(){
										        	alreadyclickedB=false; // reset when it happens
										            console.log('singleclick');
										    		var tokenID = sessionStorage.getItem("tokenID");
													var loginID = sessionStorage.getItem("userID");

													var tableDataElse =el.find("td").map(function() {
														return $(this).text();
													}).get();

													console.log(tableDataElse[0]);
													$
													.ajax({
														// /v1/bsbank/groups/BSCP
														url : '/v1/bsbank/users?dept='
																+ tableDataElse[0],
														type : 'GET',
														headers : {
															'X-ApiKey' : tokenID
														},
														contentType : "application/json",
														async : false,
														success : function(
																data) {
															var tableData = [];
															if (data.result.data) {

																for ( var i in data.result.data) {

																	var item = data.result.data[i];
																	console
																			.log(item);
																	tableData
																			.push({
																				"personId" : item.gw_stf_cdnm,
																				"personName" : item.gw_user_nm,
																				"personCode" : item.gw_psinm
																			});
																}

																console
																		.log(tableData);
																var odataTable = $(
																		'#detaildataTables-example-groupC')
																		.dataTable(
																				{
																					bJQueryUI : true,
																					aaData : tableData,
																					bDestroy : true,
																					aoColumns : [
																							{
																								mData : 'personId'
																							},
																							{
																								mData : 'personName'
																							},
																							{
																								mData : 'personCode'

																							} ]
																				});
																$(
																		'#detaildataTables-example-groupC tbody')
																		.on(
																				'click',
																				'tr',
																				function() {
																				    var el=$(this);
																				    console.log(el);
																				    if (alreadyclickedC){
																				    	alreadyclickedC=false; // reset
																				        clearTimeout(alreadyclickedTimeout); // prevent this from happening
																				        // do what needs to happen on double click. 
																				        console.log('double click!!');
																				        
																				    	var tableData = el.find("td").map(function() {
																							return $(this).text();
																						}).get();
																				    	 if ($("input:checkbox[id='input_targetcheck']").is(
																						 ":checked") == true) {
																						
																						 var inputMessageTarget = tableData[0] + "(" + tableData[1] + "),";
																						 $('#input_messageTarget').val(
																						 $('#input_messageTarget').val()
																						 + inputMessageTarget);
																						
																						 } else {
																						
																						 $('#input_messageTarget').val(
																						 tableData[0] + "(" + tableData[1] + ")");
																						
																						 }
																						// get group info
																				    }else{
																				    	
																				    	alreadyclickedC=true;
																				        
																				        console.log(el);
																				        console.log(el.closest("tr"));
																				        console.log(el.closest("tr").children("td"));
																				        console.log(el);
																				        alreadyclickedTimeout=setTimeout(function(){
																				        	alreadyclickedC=false; // reset when it happens
																				            console.log('singleclick');
																							var tableDataElse =el.find("td").map(function() {
																								return $(this).text();
																							}).get();

																							console.log(tableDataElse[0]);
																				        },300);
																				    	
																				    }
																				});

															} else {
																alert('직원 정보를 가지고 오는데 실패 하였습니다.');
															}
														},
														error : function(
																data,
																textStatus,
																request) {
															console
																	.log(data);
															alert('직원 정보를 가지고 오는데 실패 하였습니다.');
														}
													});
													
										        },300);
										    }

												

												});
							} else {
								alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
							}
						},
						error : function(data, textStatus, request) {
							console.log(data);
							alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
						}
					});
   
        },300); // <-- dblclick tolerance here
    }
    return false;
});


// click group message send..
function groupMessageFunction() {
	console.log('message send click..');
	var smscheck = false;
	var smsTimeOut = 0;
	var qos = 0;
	var checkForm = individualFormCheck();
	if (checkForm) {

		var tokenID = sessionStorage.getItem("tokenID");
		var loginID = sessionStorage.getItem("userID");
		if (tokenID) {

			qos = $("#qosSelect").val();
			console.log("QOS");
			console.log(qos);

			// input_targetcheck
			if ($("input:checkbox[id='smsckeck']").is(":checked") == true) {

				var timeSet = $('#timeSelect').val();
				console.log('smsckeck change function');
				smscheck = true;
				if (timeSet == 1) {
					smsTimeOut = 1;
				} else if (timeSet == 2) {
					smsTimeOut = 10;
				} else if (timeSet == 3) {
					smsTimeOut = 30;
				} else if (timeSet == 4) {
					smsTimeOut = 60;
				}

			}
			var messageType = $('#message_type').val();
			console.log('메세지 타입 시작');
			console.log(messageType);
			console.log('메세지 타입 끝');
			var textAreaContents = GetContents();
			var textAreaPlainText = ckGetPlainText();
			var htmlEncodeResult = utf8_to_b64(textAreaContents);
			var input_messageTarget = $('#input_messageTarget').val();
			var input_messageTitle = $('#input_messageTitle').val();
			var input_reservation = $('#input_reservation').val();
			var cateGorySelect = $('#cateGorySelect').val();
			dateResult = dateFormating(input_reservation);
			var imageText = document.getElementById("backImg").value;
			var imageFile = document.getElementById("backImg").files[0];
			var replaceImageText = imageText.replace(/^.*\\/, "");
			var uuid = guid();
			replaceImageText = uuid + replaceImageText;
			var formdata = new FormData();
			formdata.append("imageText", imageText);
			formdata.append("imageFile", imageFile);
			formdata.append('uuid', uuid);
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "/pushAdmin/FileUploader", true);
			xhr.send(formdata);
			xhr.onload = function(e) {

				if (this.status == 200) {

					console.log('image send res code 200 return');

				}

			};
			if (input_reservation) {
				dateResult = dateResult.toISOString();
			}
			if (typeof dateResult === undefined
					|| typeof dateResult === 'undefined') {
				console.log("date Result is..undefined.....");
				dateResult = "";
			}
			if (!cateGorySelect) {
				cateGorySelect = "기타";
			}
			console.log(cateGorySelect);
			console.log('group message Target start');
			console.log(input_messageTarget);
			console.log('group message Target end');
			input_messageTarget = input_messageTarget.slice(0, -1);
			var inputMsgArr = [];
			inputMsgArr = input_messageTarget.split(',');
			console.log('send group message target');
			var splitTargetArrA = [];
			var splitTargetArrB = [];
			var splitTargetArrC = [];
			var receiver = "";
			for (var i = 0; i < inputMsgArr.length; i++) {
				//A 2
				splitTargetArrA = inputMsgArr[i].split('[');
				//B 3
				splitTargetArrB = inputMsgArr[i].split('{');
				//C 0
				splitTargetArrC = inputMsgArr[i].split('(');
				
				if (splitTargetArrA.length > 1) {
					receiver = "/groups/" + splitTargetArrA[0];
					$('#message_type').val('2');
					messageType=$('#message_type').val();
					console.log('group Message Send');
					console.log(receiver);
					console.log('messageType start');
					console.log(messageType);
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
										+ '","receiver":"'+receiver
										+ '","qos":'
										+ qos
										+ ', "retained":false, "type":'
										+ messageType
										+ ',"sms":'
										+ smscheck
										+ ', "timeOut":'
										+ smsTimeOut
										+ ',"reservation":"'
										+ dateResult
										+ '","category":"'
										+ cateGorySelect
										+ '", "content":" {\\"notification\\":{\\"notificationStyle\\":1,\\"contentTitle\\":\\"'
										+ input_messageTitle
										+ '\\",\\"contentText\\":\\"'
										+ textAreaPlainText
										+ '\\",\\"imageName\\":\\"'
										+ replaceImageText
										+ '\\",\\"htmlContent\\":\\"'
										+ htmlEncodeResult
										+ '\\",\\"ticker\\":\\"'
										+ input_messageTitle
										+ '\\",\\"summaryText\\":\\"'
										+ input_messageTitle
										+ '\\", \\"image\\":\\"\\"} } "}',

								success : function(data) {
									console.log(data);
									console.log(data.result.success);
									if (data.result.info) {
										alert("계열사 메세지 성공적으로 전송하였습니다.");
										wrapperFunction('groupMessage');
										$('#input_messageTarget').focus();
									} else {
										alert("계열사 메세지 전송에 실패 하였습니다");
										wrapperFunction('groupMessage');
										$('#input_messageTarget').focus();
									}
								},
								error : function(data, textStatus, request) {
									alert(" 계열사  메세지 전송에 실패 하였습니다");
									wrapperFunction('groupMessage');
									$('#input_messageTarget').focus();
								}
							});

				}
				if (splitTargetArrB.length > 1) {
					receiver = "/groups/" + splitTargetArrB[0];
					$('#message_type').val('3');
					messageType=$('#message_type').val();
					console.log('group Message Send');
					console.log(receiver);
					console.log('messageType start');
					console.log(messageType);
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
										+ '","receiver":"'+receiver
										+ '","qos":'
										+ qos
										+ ', "retained":false, "type":'
										+ messageType
										+ ',"sms":'
										+ smscheck
										+ ', "timeOut":'
										+ smsTimeOut
										+ ',"reservation":"'
										+ dateResult
										+ '","category":"'
										+ cateGorySelect
										+ '", "content":" {\\"notification\\":{\\"notificationStyle\\":1,\\"contentTitle\\":\\"'
										+ input_messageTitle
										+ '\\",\\"contentText\\":\\"'
										+ textAreaPlainText
										+ '\\",\\"imageName\\":\\"'
										+ replaceImageText
										+ '\\",\\"htmlContent\\":\\"'
										+ htmlEncodeResult
										+ '\\",\\"ticker\\":\\"'
										+ input_messageTitle
										+ '\\",\\"summaryText\\":\\"'
										+ input_messageTitle
										+ '\\", \\"image\\":\\"\\"} } "}',

								success : function(data) {
									console.log(data);
									console.log(data.result.success);
									if (data.result.info) {
										alert("부서  메세지 성공적으로 전송하였습니다.");
										wrapperFunction('groupMessage');
										$('#input_messageTarget').focus();
									} else {
										alert("부서  메세지 전송에 실패 하였습니다");
										wrapperFunction('groupMessage');
										$('#input_messageTarget').focus();
									}
								},
								error : function(data, textStatus, request) {
									alert("부서  메세지 전송에 실패 하였습니다");
									wrapperFunction('groupMessage');
									$('#input_messageTarget').focus();
								}
							});

				}
				if (splitTargetArrC.length > 1) {
					receiver = "/users/" + splitTargetArrC[0];
					$('#message_type').val('0');
					messageType=$('#message_type').val();
					console.log('group Message Send');
					console.log(receiver);
					console.log('messageType start');
					console.log(messageType);
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
										+ '","receiver":"'+receiver
										+ '","qos":'
										+ qos
										+ ', "retained":false, "type":'
										+ messageType
										+ ',"sms":'
										+ smscheck
										+ ', "timeOut":'
										+ smsTimeOut
										+ ',"reservation":"'
										+ dateResult
										+ '","category":"'
										+ cateGorySelect
										+ '", "content":" {\\"notification\\":{\\"notificationStyle\\":1,\\"contentTitle\\":\\"'
										+ input_messageTitle
										+ '\\",\\"contentText\\":\\"'
										+ textAreaPlainText
										+ '\\",\\"imageName\\":\\"'
										+ replaceImageText
										+ '\\",\\"htmlContent\\":\\"'
										+ htmlEncodeResult
										+ '\\",\\"ticker\\":\\"'
										+ input_messageTitle
										+ '\\",\\"summaryText\\":\\"'
										+ input_messageTitle
										+ '\\", \\"image\\":\\"\\"} } "}',

								success : function(data) {
									console.log(data);
									console.log(data.result.success);
									if (data.result.info) {
										alert("개인 메세지 성공적으로 전송하였습니다.");
										wrapperFunction('groupMessage');
										$('#input_messageTarget').focus();
									} else {
										alert("개인 메세지 전송에 실패 하였습니다");
										wrapperFunction('groupMessage');
										$('#input_messageTarget').focus();
									}
								},
								error : function(data, textStatus, request) {
									alert("개인 메세지 전송에 실패 하였습니다");
									wrapperFunction('groupMessage');
									$('#input_messageTarget').focus();
								}
							});

				}

			}

		}
	}
}

// form null check
function individualFormCheck() {
	var input_messageTarget = $('#input_messageTarget').val();
	var input_messageTitle = $('#input_messageTitle').val();
	var textAreaPlainText = ckGetPlainText();
	textAreaPlainText = compactTrim(textAreaPlainText);
	console.log('nullcheck..start');
	console.log(textAreaPlainText);
	var input_reservation = $('#input_reservation').val();

	if (input_messageTarget == null || input_messageTarget == "") {
		alert("메세지 보낼 대상을 입력해주세요");
		$('#input_messageTarget').focus();
		return false;
	}

	else if (input_messageTitle == null || input_messageTitle == "") {
		alert("메세지 제목  입력해주세요");
		$('#input_messageTitle').focus();
		return false;
	}

	else if (textAreaPlainText == null || textAreaPlainText == "") {
		alert("메세지 내용  입력해주세요");
		$('#input_messageContent').focus();
		return false;
	} else if (input_reservation == null || input_reservation == "") {

		if (confirm("예약 시간이 설정 되지 않아 메세지가 즉시 전송됩니다.") == true) {
			return true;
		} else {
			return false;
		}

	} else if (input_reservation) { // 예약 메세지
		var convertDate = input_reservation;
		input_reservation = compactTrim(input_reservation);
		input_reservation = input_reservation.substring(0, 10);
		var validateDateResult = validateDate(input_reservation);

		if (!validateDateResult) {
			alert('입렵하신 예약 날짜가 형식에 맞지 않습니다.');
			return false;
		} else {

			convertDate = dateFormating(convertDate);
			var nowDateTime = new Date();
			var nowTime = nowDateTime.getTime() + 300000;
			var convertPickerTime = convertDate.getTime();
			if (nowTime > convertPickerTime) {
				alert('예약메세지는 현재 시각기준보다 5분 이상 설정 되어야 합니다.');
				return false;
			}
			return true;
		}
		if (confirm("예약이 설정된 시간으로 메세지가 전송됩니다. 확인해 주세요") == true) {
			return true;
		} else {
			return false;
		}

	}

	else {
		return true;
	}

}

//
function li_groupclick(liID) {
	var tokenID = sessionStorage.getItem("tokenID");
	var loginID = sessionStorage.getItem("userID");
	console.log(liID);
	$
			.ajax({
				// /v1/bsbank/groups/BSCP
				url : '/v1/bsbank/groups/' + liID,
				type : 'GET',
				headers : {
					'X-ApiKey' : tokenID
				},
				contentType : "application/json",
				async : false,
				success : function(data) {

					if (data.result.data) {
						var liHtml = "";
						var ulClass = "";
						for ( var i in data.result.data) {

							var item = data.result.data[i];
							console.log(item);
							ulClass = item.gw_deptmt_cdnm;
							liHtml = liHtml
									+ '<ul class="'
									+ ulClass
									+ '"><li id="'
									+ item.gw_deptmt_cdnm
									+ '" onclick="javascript:lidept_groupclick(this.id);"><input type="checkbox" name="chk_info"></input>'
									+ item.gw_dpnm + '</li></ul>';
						}
						if ($('.' + ulClass).length) {

						} else {
							$('#' + liID).after(liHtml);

						}

					} else {
						alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
					}
				},
				error : function(data, textStatus, request) {
					console.log(data);
					alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
				}
			});

}

function lidept_groupclick(deptId) {
	var tokenID = sessionStorage.getItem("tokenID");
	var loginID = sessionStorage.getItem("userID");
	console.log(deptId);
	$
			.ajax({
				// /v1/bsbank/groups/BSCP
				url : '/v1/bsbank/users?dept=' + deptId,
				type : 'GET',
				headers : {
					'X-ApiKey' : tokenID
				},
				contentType : "application/json",
				async : false,
				success : function(data) {

					if (data.result.data) {
						var liHtml = "";
						var ulClass = "";
						for ( var i in data.result.data) {

							var item = data.result.data[i];
							console.log(item);
							// "personId" : item.gw_stf_cdnm,
							// "personName" : item.gw_user_nm,
							// "personCode" : item.gw_psinm

							ulClass = item.gw_stf_cdnm;
							liHtml = liHtml
									+ '<ul class="'
									+ ulClass
									+ '"><li id="'
									+ item.gw_stf_cdnm
									+ '" onclick="javascript:lipersion_groupclick(this.id);"><input type="checkbox" name="chk_info"></input>'
									+ item.gw_user_nm + '</li></ul>';

						}

						// if ($('.' + ulClass).length) {
						//
						// } else {
						$('#' + deptId).after(liHtml);

						// }

					} else {
						alert('직원 정보를 가지고 오는데 실패 하였습니다.');
					}
				},
				error : function(data, textStatus, request) {
					console.log(data);
					alert('직원 정보를 가지고 오는데 실패 하였습니다.');
				}
			});

}

function lipersion_groupclick(personID) {
	console.log(personID);
}

$("#input_targetcheck").click(function() {
	if ($(this).is(':checked')) {
		$('#input_messageTarget').val('');
	}
});

$('#categorycheck').change(function() {
	if (this.checked) {
		$('#cateGorySelect').prop('disabled', false);
	} else {
		$('#cateGorySelect').prop('disabled', 'disabled');
	}
});

$('#smsckeck').change(function() {
	if (this.checked) {
		$('#timeSelect').prop('disabled', false);
	} else {
		$('#timeSelect').prop('disabled', 'disabled');
	}
});
// 메세지 서식이미지 로딩 Event
$("#backImg").change(function() {
	console.log('file.....change...');
	console.log(this.files[0].size);
	if (this.files[0].size > 20000) {
		alert('파일 사이즈를 20kb 이하로 설정해 주십시요 .');
		wrapperFunction('groupMessage');
	}
	readURL(this);
});
// 메세지 서식 이미지 적용
function readURL(input) {
	console.log("in resadURL...");

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			console.log(e.target.result);

			$('.cke_reset').contents().find('.cke_show_borders').css(
					"background-image", "url(" + e.target.result + ")");

			$('.cke_reset').contents().find('.cke_show_borders').css(
					"background-size", "100%");

		}

		reader.readAsDataURL(input.files[0]);
	} else {
		$('.cke_reset').contents().find('.cke_show_borders').css(
				"background-image", "none");

	}
}
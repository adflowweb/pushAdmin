$(document).ready(function() {

	$('.navbar-static-side').hide();
	var localTokenId = sessionStorage.getItem("tokenID");
	// local storage token ID Check
	if (localTokenId) {
		$('.navbar-static-side').show();
		$("#page-wrapper").load("pages/messageListPageWrapper.html", function() {
			var tableData = [];
			$.ajax({
				url : '/v1/messages?type=sent',
				type : 'GET',
				headers : {
					'X-ApiKey' : localTokenId
				},
				contentType : "application/json",
				async : false,
				success : function(data) {
				
					if (data.result.data) {

						for ( var i in data.result.data) {

							var item = data.result.data[i];
							console.log(item);
							var status="";
							if(item.status==0){
								status="발송 준비중";
							}else if(item.status==1){
								status="발송됨";
							}else{
								status=item.status;
							}
							tableData.push({
								"MessageId" : item.id,
								"Sender" : item.sender,
								"Receiver" : item.receiver,
								"qos" : item.qos,
								"status":status
						
							});
						}

						console.log(tableData);
						$('#dataTables-example').dataTable({
							bJQueryUI : true,
							aaData : tableData,
							aoColumns : [ {
								mData : 'MessageId'
							}, {
								mData : 'Sender'
							}, {
								mData : 'Receiver'
							}, {
								mData : 'qos'
							},{
								mData : 'status'
							} ]
						});
					} else {
						alert('메세지 발송 정보를 가지고 오는데 실패 하였습니다.');
					}
				},
				error : function(data, textStatus, request) {
					console.log(data);
					alert('메세지 발송 정보를 가지고 오는데 실패 하였습니다.');
				}
			});
		});
		// tokenId..null
	} else {

		$("#page-wrapper").load("pages/login.html", function() {

			console.log("logind..html..");
		});

	}

});

// page wrapperfunction
function wrapperFunction(data) {

	$("#page-wrapper")
			.load(
					"pages/" + data + "PageWrapper.html",
					function() {

						console.log(data);
						var tokenID = sessionStorage.getItem("tokenID");
						var userID = sessionStorage.getItem("userID");
						console.log(tokenID);
						console.log(userID);
						// individual message page load
						if (data === "individual") {
							//input_researchTarget
							  $('#input_messageTarget').prop('disabled',true);
							  $('#cateGorySelect').prop('disabled', 'disabled');
							  $('#timeSelect').prop('disabled', 'disabled');
							  $("#timeSelect").each(function()
									  {
									      $(this).val('disable'); 
									    
									  });
					
						
							//get Category select Option
							
								$.ajax({
									url : '/v1/categories',
									type : 'GET',
									headers : {
									'X-ApiKey' : tokenID
								},
									contentType : "application/json",
									dataType : 'json',
									async : false,
									success : function(data) {
										console.log('category call success');
										console.log(data.result);
										console.log(data.result.data);
										if(data.result.data){
											for ( var i in data.result.data) {
											
												var item = data.result.data[i];
												console.log(item.id);
												console.log(item.name);
											
												$('#cateGorySelect').append('<option value="'+item.name+'">'+item.name+'</option>');
											}
											  $("#cateGorySelect").each(function()
													  {
													      $(this).val('disable'); 
													    
													  });
										}else{
											alert('카테고리 조회에 실패하였습니다.');
										
										}
								

									},
									error : function(data, textStatus, request) {
										console.log('fail start...........');
										alert('카테고리 조회에 실패하였습니다.');
										console.log('fail end.............');
									}
								});
							  
							  

							// Ckeditor create
							CKEDITOR.replace('input_messageContent');
							// datatimePicker
							var nowDate = new Date();
							var today = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
							var today_30 = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate()+30, 0, 0, 0, 0);
							$('#datetimepicker1').datetimepicker().data(
									"DateTimePicker").setMinDate(today);
							
							$('#datetimepicker1').datetimepicker().data(
							"DateTimePicker").setMaxDate(today_30);

						}
						// groupMessage page load
						if (data === "groupMessage") {
							  $('#input_messageTarget').prop('disabled',true);
							 $('#cateGorySelect').prop('disabled', 'disabled');
							  $('#timeSelect').prop('disabled', 'disabled');
							  $("#timeSelect").each(function()
									  {
									      $(this).val('disable'); 
									    
									  });
							  
						//get Category		
								$.ajax({
									url : '/v1/categories',
									type : 'GET',
									headers : {
									'X-ApiKey' : tokenID
								},
									contentType : "application/json",
									dataType : 'json',
									async : false,
									success : function(data) {
										console.log('category call success');
										console.log(data.result);
										console.log(data.result.data);
										if(data.result.data){
											for ( var i in data.result.data) {
											
												var item = data.result.data[i];
												console.log(item.id);
												console.log(item.name);
											
												$('#cateGorySelect').append('<option value="'+item.name+'">'+item.name+'</option>');
											}
											  $("#cateGorySelect").each(function()
													  {
													      $(this).val('disable'); 
													    
													  });
										}else{
											alert('카테고리 조회에 실패하였습니다.');
										
										}
								

									},
									error : function(data, textStatus, request) {
										console.log('fail start...........');
										alert('카테고리 조회에 실패하였습니다.');
										console.log('fail end.............');
									}
								});
						
							// data Table Setting
							$.ajax({
								url : '/v1/bsbank/groups',
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
											console.log(data.result);
											console.log(data.result.success);
											var item = data.result.data[i];
											console.log(item);
											tableData.push({
												"Group Id" : item.gw_sbsd_cdnm,
												"Group Name" : item.gw_sbsd_nm
											});
										}

										console.log(tableData);
										$('#dataTables-example').dataTable({
											bJQueryUI : true,
											aaData : tableData,
											aoColumns : [ {
												mData : 'Group Id'
											}, {
												mData : 'Group Name'
											} ]
										});
									} else {
										alert('Group 정보를 가지고 오는데 실패 하였습니다.');
									}
								},
								error : function(data, textStatus, request) {
									console.log(data);
									alert('Group 정보를 가지고 오는데 실패 하였습니다.');
								}
							});
							
							//ckeditor create
							CKEDITOR.replace('input_messageContent');
							
							// datetime picker create
							var nowDate = new Date();
							var today = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
							var today_30 = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate()+30, 0, 0, 0, 0);
							$('#datetimepicker1').datetimepicker().data(
									"DateTimePicker").setMinDate(today);
							
							$('#datetimepicker1').datetimepicker().data(
							"DateTimePicker").setMaxDate(today_30);
							$('#dataTables-example tbody')
									.on(
											'click',
											'tr',
											function() {

												var tableData = $(this)
														.children("td")
														.map(
																function() {
																	return $(
																			this)
																			.text();
																}).get();

												console.log(tableData[0]);
												$('#input_messageTarget').val(
														tableData[0]);
												$(
												'#message_type')
												.val(2);
												console.log($(
												'#message_type')
												.val());
												//get group info 
												$
														.ajax({
															// /v1/bsbank/groups/BSCP
															url : '/v1/bsbank/groups/'
																	+ tableData[0],
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
																					"Group Id" : item.gw_deptmt_cdnm,
																					"Group Name" : item.gw_dpnm,
																					"Group Code" : item.gw_sbsd_cdnm
																				});
																	}

																	console
																			.log(tableData);
																	var odataTable = $(
																			'#detaildataTables-example')
																			.dataTable(
																					{
																						bJQueryUI : true,
																						aaData : tableData,
																						bDestroy : true,
																						aoColumns : [
																								{
																									mData : 'Group Id'
																								},
																								{
																									mData : 'Group Name'
																								},
																								{
																									mData : 'Group Code'

																								} ]
																					});

																	// odataTable.ajax.reload();
																	$(
																			'#detaildataTables-example tbody')
																			.on(
																					'click',
																					'tr',
																					function() {
																						console
																								.log('클리이벤트');
																						var tableData = $(
																								this)
																								.children(
																										"td")
																								.map(
																										function() {
																											return $(
																													this)
																													.text();
																										})
																								.get();

																						console
																								.log(tableData[0]);
																						$(
																								'#input_messageTarget')
																								.val(
																										tableData[0]);
																						$(
																						'#message_type')
																						.val(3);
																						console.log($(
																						'#message_type')
																						.val());
																					});
																} else {
																	alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
																}
															},
															error : function(
																	data,
																	textStatus,
																	request) {
																console
																		.log(data);
																alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
															}
														});

											});

						}
						// AllMessage page load
						if (data === "allMessage") {
							
							 $('#cateGorySelect').prop('disabled', 'disabled');
							  $('#timeSelect').prop('disabled', 'disabled');
							  $("#timeSelect").each(function()
									  {
									      $(this).val('disable'); 
									    
									  });
								//get category
								$.ajax({
									url : '/v1/categories',
									type : 'GET',
									headers : {
									'X-ApiKey' : tokenID
								},
									contentType : "application/json",
									dataType : 'json',
									async : false,
									success : function(data) {
										console.log('category call success');
										console.log(data.result);
										console.log(data.result.data);
										if(data.result.data){
											for ( var i in data.result.data) {
											
												var item = data.result.data[i];
												console.log(item.id);
												console.log(item.name);
											
												$('#cateGorySelect').append('<option value="'+item.name+'">'+item.name+'</option>');
											}
											  $("#cateGorySelect").each(function()
													  {
													      $(this).val('disable'); 
													    
													  });
										}else{
											alert('카테고리 조회에 실패하였습니다.');
										
										}
								

									},
									error : function(data, textStatus, request) {
										console.log('fail start...........');
										alert('카테고리 조회에 실패하였습니다.');
										console.log('fail end.............');
									}
								});
								
							//ckdeditor create
							CKEDITOR.replace('input_messageContent');
							
							//data table create
							$('#dataTables-example').dataTable();
							
							//datetimepicker create
							var nowDate = new Date();
							var today = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
							var today_30 = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate()+30, 0, 0, 0, 0);
							$('#datetimepicker1').datetimepicker().data(
									"DateTimePicker").setMinDate(today);
							
							$('#datetimepicker1').datetimepicker().data(
							"DateTimePicker").setMaxDate(today_30);
						}
						// 추후 업데이트 
						if (data === "formManager") {
							CKEDITOR.replace('input_messageContent');
							$('#dataTables-example').dataTable();
							var nowDate = new Date();
							var today = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
							$('#datetimepicker1').datetimepicker().data(
									"DateTimePicker").setMinDate(today);
						}
						// stats page load
						if (data === "stats") {

							$(function() {
								var script = document.createElement("script");
								script.type = "text/javascript";

								if (script.readyState) { // IE
									script.onreadystatechange = function() {
										if (script.readyState == "loaded"
												|| script.readyState == "complete") {
											script.onreadystatechange = null;
											callback();
										}
									};
								} else { // Others
									script.onload = function() {
										callback();
									};
								}

								script.src = "js/demo/morris-demo.js";
								document.getElementsByTagName("head")[0]
										.appendChild(script);

								function callback() {

								}
								;
							});

						}
						// monitoring page load
						if (data === "monitoring") {
		

						}
						// userManager
						if (data === "userManager") {
							$.ajax({
								url : '/v1/users?type=admin',
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
											tableData.push({
												"Id" : item.userID,
												"Name" : item.name,
												"Dept" : item.dept,
												"Phone" : item.phone
											});
										}

										console.log(tableData);
										$('#dataTables-example').dataTable({
											bJQueryUI : true,
											aaData : tableData,
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
									} else {
										alert('유저 정보를 가지고 오는데 실패 하였습니다.');
									}
								},
								error : function(data, textStatus, request) {
									console.log(data);
									alert('유저 정보를 가지고 오는데 실패 하였습니다.');
								}
							});

							$('#dataTables-example tbody').on(
									'click',
									'tr',
									function() {

										var tableData = $(this).children("td")
												.map(function() {
													return $(this).text();
												}).get();

										console.log(tableData[0]);
										$('#input_adminID').val(tableData[0]);
									});
						}
						// 예약메세지 관리
						if (data === "reservation") {
				
							var input_reservationCancelID = "test";
							var tableData = [];
							$.ajax({
								url : '/v1/messages?type=reservation',
								type : 'GET',
								headers : {
									'X-ApiKey' : tokenID
								},
								contentType : "application/json",
								async : false,
								success : function(data) {
								
									if (data.result.data) {

										for ( var i in data.result.data) {

											var item = data.result.data[i];
											console.log(item);
									
											var date = new Date(
													item.reservation);
											var dateResult = date.yyyymmdd();
											console.log(item.content);
											var json_data = JSON.parse(item.content);
											console.log(json_data);
											console.log('end.');
											tableData.push({
												"MessageId" : item.id,
												"Sender" : item.sender,
												"Receiver" : item.receiver,
												"ReservationTime" : dateResult,
												"title":json_data.notification.contentTitle,
												"content":json_data.notification.contentText
											});
										}

										console.log(tableData);
										
										//테이블 생성
										$('#dataTables-example').dataTable({
											bJQueryUI : true,
											aaData : tableData,
											aoColumns : [ {
												mData : 'MessageId'
											}, {
												mData : 'Sender'
											}, {
												mData : 'Receiver'
											}, {
												mData : 'ReservationTime'
											} ]
										});
									} else {
										alert('예약 정보를 가지고 오는데 실패 하였습니다.');
									}
								},
								error : function(data, textStatus, request) {
									console.log(data);
									alert('예약 정보를 가지고 오는데 실패 하였습니다.');
								}
							});

							//테이블 클릭시 
							$('#dataTables-example tbody').on(
									'click',
									'tr',
									function() {

										var tableDataRow = $(this).children("td")
												.map(function() {
													return $(this).text();
												}).get();

										console.log(tableDataRow[0]);
										$('#input_reservationCancelID').val(
												tableDataRow[0]);
										 
										for (var i = 0; i < tableData.length; i++) {
											console.log('in for');
											console.log(tableData[i].MessageId);
											if(tableData[i].MessageId==tableDataRow[0]){
												console.log(tableData[i].MessageId);
												$('.reservation_detail').html(tableData[i].content);
												$('.reservation_title').html(tableData[i].title);
											}
										}
										

									});
						}

						//메세지 리스트 
						if(data==='messageList'){
							
							var tableData = [];
							$.ajax({
								url : '/v1/messages?type=sent',
								type : 'GET',
								headers : {
									'X-ApiKey' : tokenID
								},
								contentType : "application/json",
								async : false,
								success : function(data) {
								
									if (data.result.data) {

										for ( var i in data.result.data) {

											var item = data.result.data[i];
											console.log(item);
											var status="";
											if(item.status==0){
												status="발송 준비중";
											}else if(item.status==1){
												status="발송됨";
											}else{
												status=item.status;
											}
											
											tableData.push({
												"MessageId" : item.id,
												"Sender" : item.sender,
												"Receiver" : item.receiver,
												"qos" : item.qos,
												"status":status
										
											});
										}

										console.log(tableData);
										
										//테이블 생성
										$('#dataTables-example').dataTable({
											bJQueryUI : true,
											aaData : tableData,
											aoColumns : [ {
												mData : 'MessageId'
											}, {
												mData : 'Sender'
											}, {
												mData : 'Receiver'
											}, {
												mData : 'qos'
											},{
												mData : 'status'
											} ]
										});
									} else {
										alert('메세지 발송 정보를 가지고 오는데 실패 하였습니다.');
									}
								},
								error : function(data, textStatus, request) {
									console.log(data);
									alert('메세지 발송 정보를 가지고 오는데 실패 하였습니다.');
								}
							});
	
						}
						
						//설문 조사 
						if(data==="surveyList"){
						
//							*method : GET
//							header : X-ApiKey:{tokenID}
//							uri : v1/bsbank/polls/*
//							>
//							> **response : **
//							*{"result":{"success":true,"data":[{"id":12,"title":"월드컵우승국은?","start":1404691200000,"end":1404777600000,"responses":0,"status":0}]}}*
							
							
							
							var tableData = [];
							$.ajax({
								url : '/v1/bsbank/polls/',
								type : 'GET',
								headers : {
									'X-ApiKey' : tokenID
								},
								contentType : "application/json",
								async : false,
								success : function(data) {
								
									if (data.result.data) {

										for ( var i in data.result.data) {

											var item = data.result.data[i];
											console.log(item);
									
											var startDate = new Date(
													item.start);
											var startDateResult = startDate.yyyymmdd();
											
											var endDate = new Date(
													item.end);
											var endDateResult = endDate.yyyymmdd();
											
											tableData.push({
												"title" : item.title,
												"MessageId" : item.id,
												"start" : startDateResult,
												"end" : endDateResult
										
											});
										}

										console.log(tableData);
										
										//테이블 생성
										$('#dataTables-example').dataTable({
											bJQueryUI : true,
											aaData : tableData,
											aoColumns : [ {
												mData : 'title'
											}, {
												mData : 'MessageId'
											}, {
												mData : 'start'
											}, {
												mData : 'end'
											} ]
										});
									} else {
										alert('정보를 가지고 오는데 실패 하였습니다.');
									}
								},
								error : function(data, textStatus, request) {
									console.log(data);
									alert('정보를 가지고 오는데 실패 하였습니다.');
								}
							});
							
							//테이블 클릭시 
							$('#dataTables-example tbody').on(
									'click',
									'tr',
									function() {

										var tableDataRow = $(this).children("td")
												.map(function() {
													return $(this).text();
												}).get();

										console.log(tableDataRow[1]);
										var surveyID=tableDataRow[1];
										var surveyTitle="";
										$('#input_surveyCancelID').val(surveyID);
										
										for (var i = 0; i < tableData.length; i++) {
											console.log('in for');
											console.log(tableData[i].MessageId);
											if(tableData[i].MessageId==tableDataRow[1]){
												console.log(tableData[i].MessageId);
												surveyTitle=tableData[i].title;
												
												console.log('title!!!!!!');
												console.log(surveyTitle);
												
											}
										}
										

										//설문조사 
										$.ajax({
											url : '/v1/bsbank/polls/'+surveyID,
											type : 'GET',
											headers : {
												'X-ApiKey' : tokenID
											},
											contentType : "application/json",
											async : false,
											success : function(data) {
												if (data.result.data) {

													var surveyContentTag="";
													var item = data.result.data;
													var surveyBeforeTag='<div class="panel panel-default"><div class="panel-heading">'+surveyTitle+"&nbsp; &nbsp;(총 참여자 :"+item.responses+") &nbsp; &nbsp;"+'</div><div class="panel-body">';
														console.log('test length');
	
														for(var i=0 ; i<item.answers.length;i++){
															surveyContentTag=surveyContentTag.concat('<div class="alert alert-info">'+item.answers[i]+"&nbsp; &nbsp; &nbsp; &nbsp;"+item.result[i]+"&nbsp;%"+'</div>');
															
														}
		
														console.log(surveyContentTag);
													console.log('complate tag');
													var surveyEndTag='</div></div></div>';
													$('#row_survey').html(surveyBeforeTag+surveyContentTag+surveyEndTag);
												
												} else {
													alert('정보를 가지고 오는데 실패 하였습니다.');
												}
											},
											error : function(data, textStatus, request) {
												console.log(data);
												alert('정보를 가지고 오는데 실패 하였습니다.');
											}
										});

									});
				
							
							
						}
						
						// 비밀번호 변경
						if (data === "changePass") {
							console.log('changePass...in..');
							$('#input_changeUserId').val(userID);

						}
						
						//설문조사 페이지
						if(data==="research"){
							//input_researchTarget
							$('#input_researchTarget').prop('disabled',true);
							$('#input_surveyStart').prop('disabled',true);
							$('#input_surveyEnd').prop('disabled',true);
							
							//group table get
							$.ajax({
								url : '/v1/bsbank/groups',
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
											console.log(data.result);
											console.log(data.result.success);
											var item = data.result.data[i];
											console.log(item);
											tableData.push({
												"Group Id" : item.gw_sbsd_cdnm,
												"Group Name" : item.gw_sbsd_nm
											});
										}

										console.log(tableData);
										$('#dataTables-example-deptA').dataTable({
											bJQueryUI : true,
											aaData : tableData,
											aoColumns : [ {
												mData : 'Group Id'
											}, {
												mData : 'Group Name'
											} ]
										});
									} else {
										alert('Group 정보를 가지고 오는데 실패 하였습니다.');
									}
								},
								error : function(data, textStatus, request) {
									console.log(data);
									alert('Group 정보를 가지고 오는데 실패 하였습니다.');
								}
							});
							
							$('#dataTables-example-deptA tbody')
							.on(
									'click',
									'tr',
									function() {

										var tableData = $(this)
												.children("td")
												.map(
														function() {
															return $(
																	this)
																	.text();
														}).get();

										console.log(tableData[0]);
										$('#input_researchTarget').val(
												tableData[0]+"("+tableData[1]+")");
										$(
										'#message_type')
										.val(2);
										console.log($(
										'#message_type')
										.val());
										//get group info 
										$
												.ajax({
													// /v1/bsbank/groups/BSCP
													url : '/v1/bsbank/groups/'
															+ tableData[0],
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
																			"Group Id" : item.gw_deptmt_cdnm,
																			"Group Name" : item.gw_dpnm,
																			"Group Code" : item.gw_sbsd_cdnm
																		});
															}

															console
																	.log(tableData);
															var odataTable = $(
																	'#detaildataTables-example-deptB')
																	.dataTable(
																			{
																				bJQueryUI : true,
																				aaData : tableData,
																				bDestroy : true,
																				aoColumns : [
																						{
																							mData : 'Group Id'
																						},
																						{
																							mData : 'Group Name'
																						},
																						{
																							mData : 'Group Code'

																						} ]
																			});

															// odataTable.ajax.reload();
															$(
																	'#detaildataTables-example-deptB tbody')
																	.on(
																			'click',
																			'tr',
																			function() {
																				console
																						.log('클리이벤트');
																				var tableData = $(
																						this)
																						.children(
																								"td")
																						.map(
																								function() {
																									return $(
																											this)
																											.text();
																								})
																						.get();

																				console
																						.log(tableData[0]);
																				$(
																						'#input_researchTarget')
																						.val(
																								tableData[0]+"("+tableData[1]+")");
																				$(
																				'#message_type')
																				.val(3);
																				console.log($(
																				'#message_type')
																				.val());
																			});
														} else {
															alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
														}
													},
													error : function(
															data,
															textStatus,
															request) {
														console
																.log(data);
														alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
													}
												});

									});

							var nowDate = new Date();
							var today = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
							var today_30 = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate()+30, 0, 0, 0, 0);
							$('#surveyStart').datetimepicker().data(
									"DateTimePicker").setMinDate(today);
							
							$('#surveyStart').datetimepicker().data(
							"DateTimePicker").setMaxDate(today_30);
							
							$('#surveyEnd').datetimepicker().data(
							"DateTimePicker").setMinDate(today);
					
							$('#surveyEnd').datetimepicker().data(
							"DateTimePicker").setMaxDate(today_30);
							
						}
						
						
//						*method : GET
//						header : X-ApiKey:{tokenID}
//						uri : /v1/categories*
//						>
//						> **response : **
//						*{"result":{"success":true,"data":[{"id":1,"name":"오늘의날씨"},{"id":2,"name":"경조사"}]}}*
						
						//카테고리 생성 페이지 
						if(data==="category"){
							var tableData=[];
							$.ajax({
								url : '/v1/categories',
								type : 'GET',
								headers : {
								'X-ApiKey' : tokenID
							},
								contentType : "application/json",
								dataType : 'json',
								async : false,
								success : function(data) {
									console.log('category call success');
									console.log(data.result);
									console.log(data.result.data);
									if(data.result.data){
										for ( var i in data.result.data) {
										
											var item = data.result.data[i];
											console.log(item);
											tableData.push({
												"Id" : item.id,
												"Name" : item.name
											});
										}
										
										console.log(tableData);
										$('#dataTables-example').dataTable({
											bJQueryUI : true,
											aaData : tableData,
											aoColumns : [ {
												mData : 'Id'
											}, {
												mData : 'Name'
											} ]
										});
										
										$('#dataTables-example tbody').on(
												'click',
												'tr',
												function() {

													var tableData = $(this).children("td")
															.map(function() {
																return $(this).text();
															}).get();

													console.log(tableData[0]);
													$('#input_categoryID').val(tableData[0]);
												});
										
									}else{
										alert('카테고리 조회에 실패하였습니다.');
									
									}
							

								},
								error : function(data, textStatus, request) {
									console.log('fail start...........');
									alert('카테고리 조회에 실패하였습니다.');
									console.log('fail end.............');
								}
							});
							
							
							
						}
						//서식 발송 페이지 추후 업데이트 
						if(data==="excel"){
							 $('#cateGorySelect').prop('disabled', 'disabled');
							  $('#timeSelect').prop('disabled', 'disabled');
							  $("#timeSelect").each(function()
									  {
									      $(this).val('disable'); 
									    
									  });
								
								$.ajax({
									url : '/v1/categories',
									type : 'GET',
									headers : {
									'X-ApiKey' : tokenID
								},
									contentType : "application/json",
									dataType : 'json',
									async : false,
									success : function(data) {
										console.log('category call success');
										console.log(data.result);
										console.log(data.result.data);
										if(data.result.data){
											for ( var i in data.result.data) {
											
												var item = data.result.data[i];
												console.log(item.id);
												console.log(item.name);
											
												$('#cateGorySelect').append('<option value="'+item.name+'">'+item.name+'</option>');
											}
											  $("#cateGorySelect").each(function()
													  {
													      $(this).val('disable'); 
													    
													  });
										}else{
											alert('카테고리 조회에 실패하였습니다.');
										
										}
								

									},
									error : function(data, textStatus, request) {
										console.log('fail start...........');
										alert('카테고리 조회에 실패하였습니다.');
										console.log('fail end.............');
									}
								});
						
							CKEDITOR.replace('input_messageContent');
						
							var nowDate = new Date();
							var today = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
							var today_30 = new Date(nowDate.getFullYear(), nowDate
									.getMonth(), nowDate.getDate()+30, 0, 0, 0, 0);
							$('#datetimepicker1').datetimepicker().data(
									"DateTimePicker").setMinDate(today);
							
							$('#datetimepicker1').datetimepicker().data(
							"DateTimePicker").setMaxDate(today_30);
							
						}

					});
}

// login function
function loginFunction() {

	var loginId = $('#loginId').val();
	var loginPass = $('#loginPass').val();
	// form null check
	if (loginId == null || loginId == "") {
		alert("아이디 입력해주세요");
		return false;
	}

	if (loginPass == null || loginPass == "") {
		alert("비밀번호를  입력해주세요");
		return false;
	}
	var deviceID = utf8_to_b64(loginId);
	// login ajax call
	$.ajax({
		url : '/v1/adminAuth',
		type : 'POST',
		contentType : "application/json",
		dataType : 'json',
		async : false,
		data : '{"userID":"' + loginId + '","password":"' + loginPass
				+ '","deviceID":"' + deviceID + '"}',
		success : function(data) {
			console.log('login in ajax call success');
			var loginResult = data.result.data;
			// success
			console.log(data.result);
			console.log('login result');
			if (loginResult) {
				if (!data.result.errors) {
					$('.navbar-static-side').show();
					var tokenID = data.result.data.tokenID;
					sessionStorage.setItem("tokenID", tokenID);
					sessionStorage.setItem("userID", loginId);
					// mainPage load
					$("#page-wrapper").load("pages/messageListPageWrapper.html",
							function() {
						var tableData = [];
						$.ajax({
							url : '/v1/messages?type=sent',
							type : 'GET',
							headers : {
								'X-ApiKey' : tokenID
							},
							contentType : "application/json",
							async : false,
							success : function(data) {
							
								if (data.result.data) {

									for ( var i in data.result.data) {

										var item = data.result.data[i];
										console.log(item);
										var status="";
										if(item.status==0){
											status="발송 준비중";
										}else if(item.status==1){
											status="발송됨";
										}else{
											status=item.status;
										}
										tableData.push({
											"MessageId" : item.id,
											"Sender" : item.sender,
											"Receiver" : item.receiver,
											"qos" : item.qos,
											"status":status
									
										});
									}

									console.log(tableData);
									$('#dataTables-example').dataTable({
										bJQueryUI : true,
										aaData : tableData,
										aoColumns : [ {
											mData : 'MessageId'
										}, {
											mData : 'Sender'
										}, {
											mData : 'Receiver'
										}, {
											mData : 'qos'
										},{
											mData : 'status'
										} ]
									});
								} else {
									alert('메세지 발송 정보를 가지고 오는데 실패 하였습니다.');
								}
							},
							error : function(data, textStatus, request) {
								console.log(data);
								alert('메세지 발송 정보를 가지고 오는데 실패 하였습니다.');
							}
						});
							});
					// user not found or invalid password
				} else {
					alert(data.result.errors[0]);
				}
			} else {
				alert('server error');
			}

		},
		error : function(data, textStatus, request) {
			console.log('fail start...........');
			console.log(data);
			console.log(textStatus);
			console.log('fail end.............');
		}
	});

}

// logoutFunction
function logoutFunction() {
	if (confirm("로그아웃 하시 겠습니까??") == true) { // 확인
		sessionStorage.removeItem("tokenID");
		sessionStorage.removeItem("userID");
		// window.location = "/BootStrapTest/index.jsp";
		window.location.reload();
	} else { // 취소
		return;
	}

}

// //////////////UTIL/////////////////////////////////
// date validateDate Check
function validateDate(input_reservation) {
	var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
	return date_regex.test(input_reservation);
}

// compactTrim function
function compactTrim(value) {
	return value.replace(/(\s*)/g, "");
}

// dateFormating
function dateFormating(value) {
	// 06/12/20146:27PM

	var result = compactTrim(value);
	if (result.length == 16) {
		var month = result.substring(0, 2);
		console.log('달', month);
		console.log(month);
		var day = result.substring(3, 5);
		console.log(day);
		var year = result.substring(6, 10);

		var hour = result.substring(10, 11);
		console.log(hour);
		var minute = result.substring(12, 14);
		var amPm = result.substring(14, 16);
		if (amPm === 'PM') {
			hour *= 1;
			hour = hour + 12;
		}
		console.log(hour);
		value = new Date(year, month - 1, day, hour, minute);
		console.log(value);
		return value;
	}

	if (result.length == 17) {
		// 06/12/2014 06:27PM
		var month = result.substring(0, 2);
		var day = result.substring(3, 5);
		var year = result.substring(6, 10);
		var hour = result.substring(10, 12);
		console.log(hour);
		var minute = result.substring(13, 15);
		var amPm = result.substring(15, 17);
		if (amPm === 'PM') {
			hour *= 1;
			hour = hour + 12;
		}
		console.log(hour);
		value = new Date(year, month - 1, day, hour, minute);
		console.log(value);
		return value;
	}
}

// ///////////////////////////////////////////////////////////////
// utf8_to_b64(str)
function utf8_to_b64(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}
// b64_to_utf8(str)
function b64_to_utf8(str) {
	return decodeURIComponent(escape(window.atob(str)));
}

// UUID generate
var guid = (function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16)
				.substring(1);
	}
	return function() {
		return s4() + s4();
	};
})();

// CKEDITOR Get Contents
function GetContents() {
	// Get the editor instance that you want to interact with.
	var editor = CKEDITOR.instances.input_messageContent;
	return editor.getData();

}

function ckGetPlainText() {
	var html = CKEDITOR.instances.input_messageContent.getSnapshot();
	var dom = document.createElement("DIV");
	dom.innerHTML = html;
	var plain_text = (dom.textContent || dom.innerText);
	console.log(plain_text);
	return plain_text;
}

Date.prototype.yyyymmdd = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	var hour = this.getHours().toString();
	var minute = this.getMinutes().toString();
	return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/"
			+ (dd[1] ? dd : "0" + dd[0]) + " "
			+ (hour[1] ? hour : "0" + hour[0]) + ":"
			+ (minute[1] ? minute : "0" + minute[0]); // padding
};
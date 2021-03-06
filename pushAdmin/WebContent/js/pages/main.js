
$(document).ready(function() {

	$('.navbar-static-side').hide();
	var localTokenId = sessionStorage.getItem("tokenID");
	// local storage token ID Check
	if (localTokenId) {
		$('.navbar-static-side').show();
		$('#ul_userInfo').show();
		$("#page-wrapper").load("pages/messageListPageWrapper.html", function() {
			var tableData = [];
			sessionStorage.setItem("monitoringStatus", "disable");
			$('#ul_userInfo').show();
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
							var dateTime=item.issue;
							console.log(dateTime);
							var sendTime=new Date(dateTime).toISOString();
							var status="";
							if(item.status==0){
								status="발송 준비중";
							}else if(item.status==1){
								status="push 발송됨";
							}else if(item.status==2){
								status="sms 발송됨";
							}
							else{
								status=item.status;
							}
							tableData.push({
								"MessageId" : item.id,
								"Sender" : item.sender,
								"Receiver" : item.receiver,
								"qos" : item.qos,
								"status":status,
								"sendTime":sendTime
						
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
							},{
								mData : 'sendTime'
							} ],
							aaSorting: [[0,'desc']]
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
			$('#ul_userInfo').hide();
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
							sessionStorage.setItem("monitoringStatus", "disable");
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
							sessionStorage.setItem("monitoringStatus", "disable");
							console.log('롤');
							var userRole=[];
							userRole=sessionStorage.getItem("userRole");
							userRole=JSON.parse(userRole);
							console.log(userRole);
							for(var i=0;i<userRole.length;i++){
								console.log('그룹 메세지');
								console.log(userRole[i]);
								if(userRole[i].menu=="sms"){
									$('#sms_checkdiv').show();
								}
								
							}
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
										var liString="";
										for ( var i in data.result.data) {
											console.log(data.result);
											console.log(data.result.success);
											var item = data.result.data[i];
											console.log('for test log!!');
											console.log(item);
											liString=liString+'<li id="'+item.gw_sbsd_cdnm+'" onclick="javascript:li_groupclick(this.id);"><input type="checkbox" name="chk_info"></input>'+item.gw_sbsd_nm+'</li>';
										
											tableData.push({
												"Group Id" : item.gw_sbsd_cdnm,
												"Group Name" : item.gw_sbsd_nm
											});
										}
										$('#ul_group').html(liString);
										console.log(tableData);
										$('#dataTables-example-groupA').dataTable({
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
//							 filebrowserUploadUrl: '/topic/upload'
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
			

						}
						// AllMessage page load
						if (data === "allMessage") {
							sessionStorage.setItem("monitoringStatus", "disable");
							console.log('롤');
							var userRole=[];
							userRole=sessionStorage.getItem("userRole");
							userRole=JSON.parse(userRole);
							console.log(userRole);
							for(var i=0;i<userRole.length;i++){
								console.log('그룹 메세지');
								console.log(userRole[i]);
								if(userRole[i].menu=="sms"){
									$('#sms_checkdiv').show();
								}
								
							}
							
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
						
						if(data==="phoneMessage"){
							sessionStorage.setItem("monitoringStatus", "disable");
							console.log('롤');
							var userRole=[];
							userRole=sessionStorage.getItem("userRole");
							userRole=JSON.parse(userRole);
							console.log(userRole);
							for(var i=0;i<userRole.length;i++){
				
								console.log(userRole[i]);
								if(userRole[i].menu=="sms"){
									$('#sms_checkdiv').show();
								}
								
							}
							
							 $('#cateGorySelect').prop('disabled', 'disabled');
							  $('#timeSelect').prop('disabled', 'disabled');
							  $("#timeSelect").each(function()
									  {
									      $(this).val('disable'); 
									    
									  });
							
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
						}
						// 추후 업데이트 
						if (data === "formManager") {
							sessionStorage.setItem("monitoringStatus", "disable");
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
							sessionStorage.setItem("monitoringStatus", "disable");
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
							
								var element = document.createElement("script");
								element.src = "js/pages/monitoring.js";
								document.body.appendChild(element);
								sessionStorage.setItem("monitoringStatus", "enable");
						
						}
						// userManager
						if (data === "userManager") {
							sessionStorage.setItem("monitoringStatus", "disable");
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
							sessionStorage.setItem("monitoringStatus", "disable");
							var input_reservationCancelID = "test";
							var tableData = [];
							var loginUser=sessionStorage.getItem("userID");
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
										console.log('롤');
										var userRole=[];
										userRole=sessionStorage.getItem("userRole");
										userRole=JSON.parse(userRole);
										console.log(userRole);
										var userCheck="";
										if(userRole.length==0){
											userCheck="user";
										}else{
											for(var i=0;i<userRole.length;i++){
												if(userRole[i].role=="user"){
													userCheck="user";
												}else{
													userCheck="admin";
												}
											}
										}

										for ( var i in data.result.data) {

											var item = data.result.data[i];
											console.log(item);
											console.log("예약메세지 보낸이");
											console.log(item.sender);
											var date = new Date(
													item.reservation);
											var dateResult = date.yyyymmdd();
											console.log(item.content);
											var json_data = JSON.parse(item.content);
											console.log(json_data);
											console.log('end.');
											
											if(userCheck=="user"){
												if(item.sender==loginUser){
													console.log("보낸이와 로그인유저가 같은 아이디일때");
													tableData.push({
														"MessageId" : item.id,
														"Sender" : item.sender,
														"Receiver" : item.receiver,
														"ReservationTime" : dateResult,
														"title":json_data.notification.contentTitle,
														"content":json_data.notification.contentText
													});
												}
												
											}else{
												tableData.push({
													"MessageId" : item.id,
													"Sender" : item.sender,
													"Receiver" : item.receiver,
													"ReservationTime" : dateResult,
													"title":json_data.notification.contentTitle,
													"content":json_data.notification.contentText
												});
												
											}
											
										
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
							sessionStorage.setItem("monitoringStatus", "disable");
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
											var dateTime=item.issue;
											console.log(dateTime);
											var sendTime=new Date(dateTime).toISOString();
											if(item.status==0){
												status="발송 준비중";
											}else if(item.status==1){
												status="push 발송됨";
											}else if(item.status==2){
												status="sms 발송됨";
											}
											else{
												status=item.status;
											}
											
											tableData.push({
												"MessageId" :item.id,        
												"Sender" : item.sender,
												"Receiver" : item.receiver,
												"qos" : item.qos,
												"status":status,
												"sendTime":sendTime
										
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
											},{
												mData : 'sendTime'
											} ],
											aaSorting: [[0,'desc']]
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
							sessionStorage.setItem("monitoringStatus", "disable");
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
									var loginUser=sessionStorage.getItem("userID");
									if (data.result.data) {
										console.log('롤');
										var userRole=[];
										userRole=sessionStorage.getItem("userRole");
										userRole=JSON.parse(userRole);
										console.log(userRole);
										var userCheck="";
										
										if(userRole.length==0){
											userCheck="user";
										}else{
											for(var i=0;i<userRole.length;i++){
												if(userRole[i].role=="user"){
													userCheck="user";
												}else{
													userCheck="admin";
												}
											}
										}
										
										

										for ( var i in data.result.data) {
											

											var item = data.result.data[i];
											console.log(item);
											console.log('설문조사 보낸이');
											console.log(item.sender);
									
											var startDate = new Date(
													item.start);
											var startDateResult = startDate.yyyymmdd();
											
											var endDate = new Date(
													item.end);
											var endDateResult = endDate.yyyymmdd();
											if(userCheck=="user"){
												console.log("유저일경우");
												console.log(userCheck);
												if(item.sender==loginUser){
													tableData.push({
														"title" : item.title,
														"MessageId" : item.id,
														"start" : startDateResult,
														"end" : endDateResult
												
													});	
												}
												
											}else{
												tableData.push({
													"title" : item.title,
													"MessageId" : item.id,
													"start" : startDateResult,
													"end" : endDateResult
											
												});	
												
											}
										
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
//										> **request : ** 
//										*method : GET
//										header : X-ApiKey:{tokenID}
//										uri : v1/bsbank/polls/{pollID}?result=all*
//										>
//										> **response : **
//										{"result":{"success":true,"data":[{"id":1,"answerid":1,"count":0,"userid":"nadir93"},{"id":1,"answerid":2,"count":0,"userid":"nadir93"}]}}*
//dataTables-example-survey
										
										//설문 조사 디테일
										var tableDataDetail = [];
										$.ajax({
											url : '/v1/bsbank/polls/'+surveyID+'?result=all',
											type : 'GET',
											headers : {
												'X-ApiKey' : tokenID
											},
											contentType : "application/json",
											async : false,
											success : function(data) {
												var loginUser=sessionStorage.getItem("userID");
												if (data.result.data) {
													for ( var i in data.result.data) {
														
														var item = data.result.data[i];
														console.log('itme userid');
														console.log(item.userid);
														console.log('itme userid');
														console.log(item.answerid);
														console.log('itme count');
														console.log(item.count);
														if(item.userid==null||item.userid==""){
															item.userid="무기명";
														}
														tableDataDetail.push({
																	"id" : item.userid,
																	"content" : item.content
																
																});	

													}

													console.log(tableDataDetail);
													
													//테이블 생성
													$('#dataTables-example-survey').dataTable({
														bJQueryUI : true,
														aaData : tableDataDetail,
														bDestroy : true,
														aoColumns : [ {
															mData : 'id'
														}, {
															mData : 'content'
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
										
										//설문조사 통계 
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
							sessionStorage.setItem("monitoringStatus", "disable");
							$('#input_changeUserId').val(userID);

						}
						
						//설문조사 페이지
						if(data==="research"){
							sessionStorage.setItem("monitoringStatus", "disable");
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
												tableData[0]+"["+tableData[1]+"]");
						
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
																								tableData[0]+"{"+tableData[1]+"}");
																			
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
							sessionStorage.setItem("monitoringStatus", "disable");
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
							sessionStorage.setItem("monitoringStatus", "disable");
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
		url : '/v1/auth',
		type : 'POST',
		contentType : "application/json",
		dataType : 'json',
		async : false,
		data : '{"userID":"' + loginId + '","password":"' + loginPass
				+ '","deviceID":"' + deviceID + '"}',
		success : function(data) {
			console.log("ajax data!!!!!");
			console.log(data);
			console.log("ajax data!!!!!");
			
			console.log('login in ajax call success');
			var loginResult = data.result.data;

			if (loginResult) {
				if (!data.result.errors) {

					var tokenID = data.result.data.tokenID;
					
					$.ajax({
						url : '/v1/users/'+loginId,
						type : 'GET',
						headers : {
							'X-ApiKey' : tokenID
						},
						contentType : "application/json",
						async : false,
						success : function(data) {
					
							if (data.result.data) {
								var userPhone="";
								userPhone=data.result.data.phone;
								if(userPhone==null||userPhone==""||typeof userPhone===undefined||typeof userPhone==='undefined'){
									userPhone="번호없음";
								}
								sessionStorage.setItem("userPhone", userPhone);
								console.log(userPhone);
					
							} else {
								alert('유저 phone 정보를 가지고 오는데 실패 하였습니다.');
							}
						},
						error : function(data, textStatus, request) {
							console.log(data);
							alert('유저 정보를 가지고 오는데 실패 하였습니다.');
						}
					});

				
					console.log(data.result.data);
					
					var userRole=[];
					userRole=data.result.data.role;
					console.log(userRole);
					sessionStorage.setItem("tokenID", tokenID);
					sessionStorage.setItem("userID", loginId);
					sessionStorage.setItem("userRole", JSON.stringify(userRole));
					
					
					if(userRole.length==0){
						console.log('유저입니다.');
						$('.navbar-static-side').show();
						$('#adminRole_li').hide();
					}else if(userRole.length>=1){
						if(userRole[0].role=="admin"){
							$('.navbar-static-side').show();
						}
						
						if(userRole[0].role=="user"){
							console.log('이프 유저 입니다.');
							$('.navbar-static-side').show();
							$('#adminRole_li').hide();
						}
						
					}
				
					
					// mainPage load
					$("#page-wrapper").load("pages/messageListPageWrapper.html",
							function() {
						var tableData = [];
						$('#ul_userInfo').show();
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
										var dateTime=item.issue;
										console.log(dateTime);
										var sendtime=new Date(dateTime).toISOString();
										var status="";
										if(item.status==0){
											status="발송 준비중";
										}else if(item.status==1){
											status="push 발송됨";
										}else if(item.status==2){
											status="sms 발송됨";
										}
										else{
											status=item.status;
										}
										tableData.push({
											"MessageId" : item.id,
											"Sender" : item.sender,
											"Receiver" : item.receiver,
											"qos" : item.qos,
											"status":status,
											"sendtime":sendtime
									
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
										},{
											mData : 'sendtime'
										} ],
										aaSorting: [[0,'desc']]
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
				alert('로그인에 실패 하였습니다.');
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
function userInfo(){
	var userID = sessionStorage.getItem("userID");
	alert(userID+"으로 로그인 중입니다.");
}

function logoutFunction() {
	if (confirm("로그아웃 하시 겠습니까??") == true) { // 확인
		sessionStorage.removeItem("tokenID");
		sessionStorage.removeItem("userID");
		sessionStorage.removeItem("userRole");
		sessionStorage.removeItem("userPhone");
	
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
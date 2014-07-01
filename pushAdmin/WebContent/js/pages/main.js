$(document)
		.ready(
				function() {

					$('.navbar-static-side').hide();
					var localTokenId = sessionStorage.getItem("tokenID");
					// local storage token ID Check
					if (localTokenId) {
						$('.navbar-static-side').show();
						$("#page-wrapper")
								.load(
										"pages/mainPagePageWrapper.html",
										function() {
											// script add morris-demo graph
											$(function() {
												var script = document
														.createElement("script");
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
												document
														.getElementsByTagName("head")[0]
														.appendChild(script);
												function callback() {

												}
												;
											});
										});
						// tokenId..null
					} else {

						$("#page-wrapper").load("pages/login.html", function() {
							alert('token id is null..');
							console.log("logind..html..");
						});

					}

				});

// page wrapperfunction
function wrapperFunction(data) {

	$("#page-wrapper").load(
			"pages/" + data + "PageWrapper.html",
			function() {

				console.log(data);
				var tokenID = sessionStorage.getItem("tokenID");
				var userID = sessionStorage.getItem("userID");
				console.log(tokenID);
				console.log(userID);
				// individual message page load
				if (data === "individual") {

					// table data setting
//					$.ajax({
//						url : '/v1/users/' + userID,
//						type : 'GET',
//						headers : {
//							'X-ApiKey' : tokenID
//						},
//						contentType : "application/json",
//						async : false,
//						success : function(data) {
//							var tableData = [];
//
//							for ( var i in data.result.data) {
//
//								var item = data.result.data;
//								console.log(item);
//								tableData.push({
//									"Id" : item.userID,
//									"Name" : item.name,
//									"Dept" : item.dept,
//									"Phone" : item.phone
//								});
//							}
//
//							console.log(tableData);
//							$('#dataTables-example').dataTable({
//								bJQueryUI : true,
//								aaData : tableData,
//								aoColumns : [ {
//									mData : 'Id'
//								}, {
//									mData : 'Name'
//								}, {
//									mData : 'Dept'
//								}, {
//									mData : 'Phone'
//								} ]
//							});
//						},
//						error : function(data, textStatus, request) {
//							console.log(data);
//							alert('유저 정보를 가지고 오는데 실패 하였습니다.');
//						}
//					});

					// Ckeditor create
					CKEDITOR.replace('input_messageContent');
					// datatimePicker
					var nowDate = new Date();
					var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
					$('#datetimepicker1').datetimepicker().data("DateTimePicker").setMinDate(today);
					// click dataTable
//					$('#dataTables-example tbody').on(
//							'click',
//							'tr',
//							function() {
//
//								var tableData = $(this).children("td").map(
//										function() {
//											return $(this).text();
//										}).get();
//
//								console.log(tableData[0]);
//								$('#input_messageTarget').val(tableData[0]);
//							});

				}
				// groupMessage page load
				if (data === "groupMessage") {
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
								}]
							});
						},
						error : function(data, textStatus, request) {
							console.log(data);
							alert('Group 정보를 가지고 오는데 실패 하였습니다.');
						}
					});
					CKEDITOR.replace('input_messageContent');
				
					var nowDate = new Date();
					var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
					$('#datetimepicker1').datetimepicker().data("DateTimePicker").setMinDate(today);
					$('#dataTables-example tbody').on(
							'click',
							'tr',
							function() {

								var tableData = $(this).children("td").map(
										function() {
											return $(this).text();
										}).get();

								console.log(tableData[0]);
								$('#input_messageTarget').val(tableData[0]);
								
								$.ajax({
									///v1/bsbank/groups/BSCP
									url : '/v1/bsbank/groups/' + tableData[0],
									type : 'GET',
									headers : {
										'X-ApiKey' : tokenID
									},
									contentType : "application/json",
									async : false,
									success : function(data) {
										var tableData = [];

										for ( var i in data.result.data) {

											var item = data.result.data[i];
											console.log(item);
											tableData.push({
												"Group Id" : item.gw_deptmt_cdnm,
												"Group Name" : item.gw_dpnm,
												"Group Code" : item.gw_sbsd_cdnm
											});
										}

										console.log(tableData);
									var odataTable=	$('#detaildataTables-example').dataTable({
											bJQueryUI : true,
											aaData : tableData,
											bDestroy: true,
											aoColumns : [ {
												mData : 'Group Id'
											}, {
												mData : 'Group Name'
											},{
												mData : 'Group Code'
													
											}]
										});
										
									//odataTable.ajax.reload();
									$('#detaildataTables-example tbody').on('click',
											'tr',
											function() {
										console.log('클리이벤트');
										var tableData = $(this).children("td").map(
												function() {
													return $(this).text();
												}).get();

										console.log(tableData[0]);
										$('#input_messageTarget').val(tableData[0]);
								
								});
									
									},
									error : function(data, textStatus, request) {
										console.log(data);
										alert('Group 정보를 가지고 오는데 실패 하였습니다.');
									}
								});
								
							});
					
		

				}
				// AllMessage page load
				if (data === "allMessage") {
					CKEDITOR.replace('input_messageContent');
					$('#dataTables-example').dataTable();
					var nowDate = new Date();
					var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
					$('#datetimepicker1').datetimepicker().data("DateTimePicker").setMinDate(today);
				}
				
				if (data === "formManager") {
					CKEDITOR.replace('input_messageContent');
					$('#dataTables-example').dataTable();
					var nowDate = new Date();
					var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
					$('#datetimepicker1').datetimepicker().data("DateTimePicker").setMinDate(today);
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
				// userDelete
				if (data === "userDelete") {
					$.ajax({
						url : '/v1/users/' + userID,
						type : 'GET',
						headers : {
							'X-ApiKey' : tokenID
						},
						contentType : "application/json",
						async : false,
						success : function(data) {
							var tableData = [];

							for ( var i in data.result.data) {

								var item = data.result.data;
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

								var tableData = $(this).children("td").map(
										function() {
											return $(this).text();
										}).get();

								console.log(tableData[0]);
								$('#input_adminID').val(tableData[0]);
							});
				}
				// 예약메세지 관리
				if (data === "reservation") {
					var input_reservationCancelID = "test";
					$.ajax({
						url : '/v1/users/' + input_reservationCancelID,
						type : 'GET',
						headers : {
							'X-ApiKey' : tokenID
						},
						contentType : "application/json",
						async : false,
						success : function(data) {
							var tableData = [];

							for ( var i in data.result.data) {

								var item = data.result.data;
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
						},
						error : function(data, textStatus, request) {
							console.log(data);
							alert('예약 정보를 가지고 오는데 실패 하였습니다.');
						}
					});

					$('#dataTables-example tbody').on(
							'click',
							'tr',
							function() {

								var tableData = $(this).children("td").map(
										function() {
											return $(this).text();
										}).get();

								console.log(tableData[0]);
								$('#input_reservationCancelID').val(tableData[0]);
							});
				}

				// 비밀번호 변경
				if (data === "changePass") {
					console.log('changePass...in..');
					$('#input_changeUserId').val(userID);

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
	// login ajax call
	$
			.ajax({
				url : '/v1/auth',
				type : 'POST',
				headers : {
					'X-ApiKey' : 'devServer3'
				},
				contentType : "application/json",
				dataType : 'json',
				async : false,
				data : '{"userID":"' + loginId + '","password":"' + loginPass
						+ '"}',
				success : function(data) {
					console.log('login in ajax call success');
					var loginResult = data.result.success;
					// success
					console.log(data.result);
					console.log('login result');
					if (loginResult) {
						$('.navbar-static-side').show();
						var tokenID = data.result.data.tokenID;
						sessionStorage.setItem("tokenID", tokenID);
						sessionStorage.setItem("userID", loginId);
						// mainPage load
						$("#page-wrapper")
								.load(
										"pages/mainPagePageWrapper.html",
										function() {
											$(function() {
												var script = document
														.createElement("script");
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
												document
														.getElementsByTagName("head")[0]
														.appendChild(script);

												function callback() {

												}
												;
											});
										});
						// user not found or invalid password
					} else {
						alert(data.result.info[0]);
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


//logoutFunction
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



////////////////UTIL/////////////////////////////////
//date validateDate Check
function validateDate(input_reservation) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return date_regex.test(input_reservation);
}

// compactTrim function
function compactTrim(value) {
	return value.replace(/(\s*)/g, "");
}


//dateFormating
function dateFormating(value) {
	// 06/12/20146:27PM

	var result = compactTrim(value);
	if (result.length == 16) {
		var month = result.substring(0, 2);
		console.log('달',month);
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
		value = new Date(year, month-1, day, hour, minute);
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
		value = new Date(year, month-1, day, hour, minute);
		console.log(value);
		return value;
	}
}


/////////////////////////////////////////////////////////////////
//utf8_to_b64(str)
function utf8_to_b64(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}
//b64_to_utf8(str)
function b64_to_utf8(str) {
	return decodeURIComponent(escape(window.atob(str)));
}


//UUID generate
var guid = (function() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	               .toString(16)
	               .substring(1);
	  }
	  return function() {
	    return s4() + s4() ;
	  };
	})();



//CKEDITOR Get Contents
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

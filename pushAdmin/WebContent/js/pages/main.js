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
					// datatimePicker
					$('#datetimepicker1').datetimepicker();
					// click dataTable
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
							});

				}
				// groupMessage page load
				if (data === "groupMessage") {
					// data Table Setting
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
									"Group Id" : item.name,
									"Group Name" : item.dept,
									"Group Info" : item.phone
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
								}, {
									mData : 'Group Info'
								} ]
							});
						},
						error : function(data, textStatus, request) {
							console.log(data);
							alert('Group 정보를 가지고 오는데 실패 하였습니다.');
						}
					});
					$('#datetimepicker1').datetimepicker();
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
							});

				}
				// AllMessage page load
				if (data === "allMessage") {
					$('#dataTables-example').dataTable();
					$('#datetimepicker1').datetimepicker();
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
				if(data==="changePass"){
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

// logoutFunction
function logoutFunction() {
	if (confirm("로그아웃 하시 겠습니까??") == true) { // 확인
		sessionStorage.removeItem("tokenID");
		sessionStorage.removeItem("userID");
//		window.location = "/BootStrapTest/index.jsp";
		window.location.reload();
	} else { // 취소
		return;
	}

}

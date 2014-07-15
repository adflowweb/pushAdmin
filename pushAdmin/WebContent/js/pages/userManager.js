function deleteAdminFunction(){
	console.log("delelte...admin");
	var checkForm = individualFormCheck();
	if (checkForm) {
		var tokenID = sessionStorage.getItem("tokenID");

		if (tokenID) {
			loginUserId = sessionStorage.getItem("userID");
			console.log(loginUserId);
			var input_adminID = $('#input_adminID').val();
		

			$.ajax({
				url : '/v1/users/' + input_adminID,
				type : 'GET',
				headers : {
					'X-ApiKey' : tokenID
				},
				contentType : "application/json",
				dataType : 'json',
				async : false,

				success : function(data) {
					console.log(data);
					console.log(data.result.success);
					if (data.result.success) {
						
						if (!data.result.errors) {
							console.log('admin step1');
							console.log(data.result.data);
							console.log('admin step2');
							console.log(data.result.data.admin);
							console.log('admin step3');
							data.result.data.admin=false;
							console.log('admin step4');
							console.log(data.result.data.admin);
							var updateJson=JSON.stringify(data.result.data);
			
							if (data.result.data) {
								$.ajax({
									url : '/v1/users/',
									type : 'PUT',
									headers : {
										'X-ApiKey' : tokenID
									},
									contentType : "application/json",
									dataType : 'json',
									async : false,
									data:updateJson,
									success : function(data) {
										console.log('success');
										console.log(data.result);
										if(data.result.info){
											alert('관리자가 삭제 되었습니다.');
											wrapperFunction('userManager');
										}else{
											alert('관리자 삭제에 실패 하였습니다.');
										}
									},
									error : function(data) {
										console.log('fail');
									}
								});

							} else {
								alert('해당 ID 의 정보가 없습니다.');
							}
							console.log('get user info');
							$('#input_adminID').val("");
						} else {
							alert('server errors');
						}
					
						$('#input_adminID').focus();
					} else {
						alert("server errors");
						$('#input_adminID').val("");
			
						$('#input_adminID').focus();
					}
				},
				error : function(data, textStatus, request) {
					alert("관리자 등록에 실패 하였습니다.");
					$('#input_adminID').val("");
				
					$('#input_adminID').focus();
					console.log(data);
				}
			});
		}
	}
}



function insertAdminFunction() {
	console.log('message send click..');
	var checkForm = individualFormCheck();
	if (checkForm) {
		var tokenID = sessionStorage.getItem("tokenID");

		if (tokenID) {
			loginUserId = sessionStorage.getItem("userID");
			console.log(loginUserId);
			var input_userID = $('#input_userID').val();

			$.ajax({
				url : '/v1/users/' + input_userID,
				type : 'GET',
				headers : {
					'X-ApiKey' : tokenID
				},
				contentType : "application/json",
				dataType : 'json',
				async : false,

				success : function(data) {
					console.log(data);
					console.log(data.result.success);
					if (data.result.success) {
							if (data.result.data) {
								console.log('admin step1');
								console.log(data.result.data);
								console.log('admin step2');
								console.log(data.result.data.admin);
								console.log('admin step3');
								data.result.data.admin=true;
								console.log('admin step4');
								console.log(data.result.data.admin);
								var updateJson=JSON.stringify(data.result.data);
								
								$.ajax({
									url : '/v1/users/',
									type : 'PUT',
									headers : {
										'X-ApiKey' : tokenID
									},
									contentType : "application/json",
									dataType : 'json',
									async : false,
									data:updateJson,
									success : function(data) {
										console.log('success');
										console.log(data.result);
										if(data.result.info){
											alert('관리자로 등록 되었습니다.');
											wrapperFunction('userManager');
										}else{
											alert('관리자 등록에 실패 하였습니다.');
										}
									},
									error : function(data) {
										console.log('fail');
									}
								});

							} else {
								alert('해당 ID 의 정보가 없습니다.');
							}
							console.log('get user info');
							$('#input_adminID').val("");
	
						$('#input_adminID').focus();
					} else {
						alert("server errors");
						$('#input_adminID').val("");
		
						$('#input_adminID').focus();
					}
				},
				error : function(data, textStatus, request) {
					alert("관리자 등록에 실패 하였습니다.");
					$('#input_adminID').val("");
			
					$('#input_adminID').focus();
					console.log(data);
				}
			});
		}
	}
}

// form null check
function individualFormCheck() {
	var input_userID = $('#input_adminID').val();


	if (input_userID == null || input_userID == "") {
		alert("관리자 아이디를 입력해주세요");
		$('#input_adminID').focus();
		return false;
	}
	return true;


}

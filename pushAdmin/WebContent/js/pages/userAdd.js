function userAddFunction() {
	console.log('message send click..');
	var checkForm = individualFormCheck();
	if (checkForm) {
		var tokenID = sessionStorage.getItem("tokenID");

		if (tokenID) {
			loginUserId = sessionStorage.getItem("userID");
			console.log(loginUserId);
			var input_userID = $('#input_userID').val();
			// var input_userPass = $('#input_userPass').val();
			// var input_userName = $('#input_userName').val();
			// var input_userDept = $('#input_userDept').val();
			// var input_userPhone = $('#input_userPhone').val();
			// var input_userEmail = $('#input_userEmail').val();

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
							$('#input_userID').val("");
						
						// $('#input_userPass').val("");
						// $('#input_userPassR').val("");
						// $('#input_userName').val("");
						// $('#input_userDept').val("");
						// $('#input_userPhone').val("");
						// $('#input_userEmail').val("");
						$('#input_userID').focus();
					} else {
						alert("server errors");
						$('#input_userID').val("");
						// $('#input_userPass').val("");
						// $('#input_userPassR').val("");
						// $('#input_userName').val("");
						// $('#input_userDept').val("");
						// $('#input_userPhone').val("");
						// $('#input_userEmail').val("");
						$('#input_userID').focus();
					}
				},
				error : function(data, textStatus, request) {
					alert("관리자 등록에 실패 하였습니다.");
					$('#input_userID').val("");
					// $('#input_userPass').val("");
					// $('#input_userPassR').val("");
					// $('#input_userName').val("");
					// $('#input_userDept').val("");
					// $('#input_userPhone').val("");
					// $('#input_userEmail').val("");
					$('#input_userID').focus();
					console.log(data);
				}
			});
		}
	}
}

// form null check
function individualFormCheck() {
	var input_userID = $('#input_userID').val();
	// var input_userPass = $('#input_userPass').val();
	// var input_userPassR = $('#input_userPassR').val();
	// var input_userName = $('#input_userName').val();
	// var input_userDept = $('#input_userDept').val();
	// var input_userPhone = $('#input_userPhone').val();
	// var input_userEmail = $('#input_userEmail').val();

	if (input_userID == null || input_userID == "") {
		alert("관리자 아이디를 입력해주세요");
		$('#input_userID').focus();
		return false;
	}
	return true;
	// } else if (input_userPass == null || input_userPass == "") {
	// alert("관리자 비밀번호를 입력해주세요");
	// $('#input_userPass').focus();
	// return false;
	// } else if (input_userPassR == null || input_userPassR == "") {
	// alert("관리자 비밀번호를 재 입력해주세요");
	// $('#input_userPassR').focus();
	// return false;
	// } else if (input_userName == null || input_userName == "") {
	// alert("관리자 이름을 입력해주세요");
	// $('#input_userName').focus();
	// return false;
	// } else if (input_userDept == null || input_userDept == "") {
	// alert("관리자 부서를 입력해주세요");
	// $('#input_userDept').focus();
	// return false;
	// } else if (input_userPhone == null || input_userPhone == "") {
	// alert("관리자 전화번호를 입력해주세요");
	// $('#input_userPhone').focus();
	// return false;
	// } else if (input_userEmail == null || input_userEmail == "") {
	// alert("관리자 이메일을 입력해주세요");
	// $('#input_userEmail').focus();
	// return false;
	// } else if (input_userPass !== input_userPassR) {
	// alert("입력하신 비밀번호와 재입력한 비밀번호가 같지 않습니다");
	// $('#input_userPass').val("");
	// $('#input_userPassR').val("");
	// $('#input_userPass').focus();
	// return false;
	// } else if (input_userEmail !== null && input_userEmail !== "") {
	// email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	// if (!email_regex.test(input_userEmail)) {
	// alert("이메일 형식에 맞게 입력하세요");
	// $('#input_userEmail').val("");
	// $('#input_userEmail').focus();
	// return false;
	// } else {
	// return true;
	// }
	// }
	//
	// else {
	// return true;
	// }

}
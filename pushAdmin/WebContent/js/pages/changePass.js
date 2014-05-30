function changePassFunction() {

	console.log('message send click..');
	var checkForm = individualFormCheck();
	if (checkForm) {
		var tokenID = sessionStorage.getItem("tokenID");

		if (tokenID) {
			loginUserId = sessionStorage.getItem("userID");
			console.log(loginUserId);
			var input_changeUserId = $('#input_changeUserId').val();
			var input_changePassword = $('#input_changePassword').val();
			var input_changePasswordR = $('#input_changePasswordR').val();
			var input_changePasswordRR = $('#input_changePasswordRR').val();

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
						data : '{"message":"{\\"notification\\":{\\"notificationStyle\\":3,\\"contentTitle\\":\\"'
								+ input_changeUserId
								+ '\\",\\"contentText\\":\\"'
								+ input_changeUserId
								+ '\\",\\"ticker\\":\\"'
								+ input_changeUserId
								+ '\\"}}","sender":"'
								+ input_changeUserId
								+ '","receiver":"users/chlee","qos":2,"retained":false}',
						success : function(data) {
							console.log(data);
							console.log(data.result.success);
							if (data.result.success) {
								$('#input_changeUserId').val("");
								$('#input_changePassword').val("");
								$('#input_changePasswordR').val("");
								$('#input_changePasswordRR').val("");
								$('#input_changeUserId').focus();
								alert("관리자 비밀번호를 성공적으로 변경하였습니다.");
							} else {
								$('#input_changeUserId').val("");
								$('#input_changePassword').val("");
								$('#input_changePasswordR').val("");
								$('#input_changePasswordRR').val("");
								$('#input_changeUserId').focus();
								alert("관리자 비밀번호 변경에 실패하였습니다..");
							}
						},
						error : function(data, textStatus, request) {
							$('#input_changeUserId').val("");
							$('#input_changePassword').val("");
							$('#input_changePasswordR').val("");
							$('#input_changePasswordRR').val("");
							$('#input_changeUserId').focus();
							alert("관리자 비밀번호 변경에 실패하였습니다..");
							console.log(data);
						}
					});
		}
	}
}

// form null check
function individualFormCheck() {
	var input_changeUserId = $('#input_changeUserId').val();
	var input_changePassword = $('#input_changePassword').val();
	var input_changePasswordR = $('#input_changePasswordR').val();
	var input_changePasswordRR = $('#input_changePasswordRR').val();

	if (input_changeUserId == null || input_changeUserId == "") {
		alert("기존 관리자 아이디를 입력해주세요");
		$('#input_changeUserId').focus();
		return false;
	} else if (input_changePassword == null || input_changePassword == "") {
		alert("기존 관리자 비밀번호를 입력해주세요");
		$('#input_changePassword').focus();
		return false;
	} else if (input_changePasswordR == null || input_changePasswordR == "") {
		alert("새로운 관리자 비밀번호를 입력해주세요");
		$('#input_changePasswordR').focus();
		return false;
	} else if (input_changePasswordRR == null || input_changePasswordRR == "") {
		alert("새로운 관리자 비밀번호를 재 입력해주세요");
		$('#input_changePasswordRR').focus();
		return false;
	} else if (input_changePasswordR !== input_changePasswordRR) {
		alert("입력하신 비밀번호와 재입력한 비밀번호가 같지 않습니다");
		$('#input_changePasswordR').val("");
		$('#input_changePasswordRR').val("");
		$('#input_changePasswordR').focus();
		return false;
	}

	else {
		return true;
	}

}
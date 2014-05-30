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
				url : '/v1/users/'+input_adminID,
				type : 'DELETE',
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
						alert("관리자를 삭제 하였습니다.");
						$('#input_adminID').val("");
						$('#input_adminID').focus();
					} else {
						alert("관리자 삭제에 실패 하였습니다.");
						$('#input_adminID').val("");
						$('#input_adminID').focus();
					}
				},
				error : function(data, textStatus, request) {
					alert("관리자 삭제에 실패 하였습니다.");
					$('#input_adminID').val("");
					$('#input_adminID').focus();
					console.log(data);
				}
			});
		}
	}
}





function individualFormCheck() {
	var input_adminID = $('#input_adminID').val();
	if (input_adminID == null || input_adminID == "") {
		alert("삭제할 관리자 아이디를 입력해주세요");
		$('#input_adminID').focus();
		return false;
	}

	else {
		return true;
	}

}
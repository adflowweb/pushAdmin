function allMessageFunction() {
	console.log('message send click..');
	var checkForm = individualFormCheck();
	if (checkForm) {
		var tokenID = sessionStorage.getItem("tokenID");
		           
		if (tokenID) {
			var input_messageTitle = $('#input_messageTitle').val();
			var input_messageContent = $('#input_messageContent').val();

			$
					.ajax({
						url :'/v1/messages',
						type : 'POST',
						headers : {
							'X-ApiKey' : tokenID
						},
						contentType : "application/json",
						dataType : 'json',
						async : false,
						data : '{"message":"{\\"notification\\":{\\"notificationStyle\\":3,\\"contentTitle\\":\\"'
								+ input_messageTitle
								+ '\\",\\"contentText\\":\\"'
								+ input_messageContent
								+ '\\",\\"ticker\\":\\"'
								+ input_messageTitle
								+ '\\"}}","sender":"'
								+ tokenID
								+ '","receiver":"users/chlee","qos":2,"retained":false}',
						success : function(data) {
							console.log(data);
							console.log(data.result.success);
							if (data.result.success) {
								alert("메세지를 성공적으로 전송하였습니다.");
								$('#input_messageTarget').val("");
								$('#input_messageTitle').val("");
								$('#input_messageContent').val("");
								$('#input_messageTarget').focus();
							} else {
								alert("메세지 전송에 실패 하였습니다");
								$('#input_messageTarget').val("");
								$('#input_messageTitle').val("");
								$('#input_messageContent').val("");
								$('#input_messageTarget').focus();
							}
						},
						error : function(data, textStatus, request) {
							alert("메세지 전송에 실패 하였습니다");
							$('#input_messageTarget').val("");
							$('#input_messageTitle').val("");
							$('#input_messageContent').val("");
							$('#input_messageTarget').focus();
							console.log(data);
						}
					});
		}
	}
}

// form null check
function individualFormCheck() {
	var input_messageTitle = $('#input_messageTitle').val();
	var input_messageContent = $('#input_messageContent').val();

	if (input_messageTitle == null || input_messageTitle == "") {
		alert("메세지 제목  입력해주세요");
		$('#input_messageTitle').focus();
		return false;
	}

	else if (input_messageContent == null || input_messageContent == "") {
		alert("메세지 내용  입력해주세요");
		$('#input_messageContent').focus();
		return false;
	} else {
		return true;
	}

}
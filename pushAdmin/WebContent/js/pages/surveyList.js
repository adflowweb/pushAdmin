function surveyCancelFunction(){
	

	var checkForm = surcancelFormCheck();
	if (checkForm) {
		var tokenID = sessionStorage.getItem("tokenID");

		if (tokenID) {
			loginUserId = sessionStorage.getItem("userID");
			console.log(loginUserId);
			var input_surveyCancelID = $('#input_surveyCancelID').val();
		
//			> **request : ** 
//			*method : DELETE
//			header : X-ApiKey:{tokenID}
//			uri : /v1/bsbank/polls/{pollID}*
//			>
//			> **response : **
//			*{"result":{"success":"true", "info":{"updates":1}}}*
			
			
			$.ajax({
				url : '/v1/bsbank/polls/'+input_surveyCancelID,
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
					if (data.result.info) {
						alert("메세지를 취소하였습니다.");
						$('#input_surveyCancelID').val("");
						$('#input_surveyCancelID').focus();
						wrapperFunction('surveyList');
					} else {
						alert("메세지를 취소에 실패했습니다.");
						$('#input_surveyCancelID').val("");
						$('#input_surveyCancelID').focus();
						wrapperFunction('surveyList');
					}
				},
				error : function(data, textStatus, request) {
					alert("예약된 메세지를 취소에 실패했습니다.");
					$('#input_surveyCancelID').val("");
					$('#input_surveyCancelID').focus();
					wrapperFunction('surveyList');
					console.log(data);
				}
			});
		}
	}
	
}



//form check..
function surcancelFormCheck() {
	var input_surveyCancelID = $('#input_surveyCancelID').val();
	if (input_surveyCancelID == null || input_surveyCancelID == "") {
		alert("취소할 대상을 선택해 주세요.");
		$('#input_surveyCancelID').focus();
		return false;
	}

	else {
		return true;
	}

}
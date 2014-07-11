//click reservationCancelFunction
function reservationCancelFunction(){
	console.log("reservationCancelFunction...");
	var checkForm = cancelFormCheck();
	if (checkForm) {
		var tokenID = sessionStorage.getItem("tokenID");

		if (tokenID) {
			loginUserId = sessionStorage.getItem("userID");
			console.log(loginUserId);
			var input_reservationCancelID = $('#input_reservationCancelID').val();
		

			$.ajax({
				url : '/v1/messages/'+input_reservationCancelID,
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
						alert("예약된 메세지를 취소하였습니다.");
						$('#input_reservationCancelID').val("");
						$('#input_reservationCancelID').focus();
						wrapperFunction('reservation');
					} else {
						alert("예약된 메세지를 취소에 실패했습니다.");
						$('#input_reservationCancelID').val("");
						$('#input_reservationCancelID').focus();
					
					}
				},
				error : function(data, textStatus, request) {
					alert("예약된 메세지를 취소에 실패했습니다.");
					$('#input_reservationCancelID').val("");
					$('#input_reservationCancelID').focus();
					
					console.log(data);
				}
			});
		}
	}
}





// form check..
function cancelFormCheck() {
	var input_reservationCancelID = $('#input_reservationCancelID').val();
	if (input_reservationCancelID == null || input_reservationCancelID == "") {
		alert("예약을 취소할 대상을 선택해 주세요.");
		$('#input_reservationCancelID').focus();
		return false;
	}

	else {
		return true;
	}

}




//click group message send..
function groupMessageFunction() {
	console.log('message send click..');
	var checkForm = individualFormCheck();
	if (checkForm) {
		
		var tokenID = sessionStorage.getItem("tokenID");

		if (tokenID) {
			var textAreaContents = GetContents();
			var textAreaPlainText = ckGetPlainText();
			var htmlEncodeResult = utf8_to_b64(textAreaContents);
			var input_messageTarget = $('#input_messageTarget').val();
			var input_messageTitle = $('#input_messageTitle').val();
			var input_reservation = $('#input_reservation').val();
			dateResult = dateFormating(input_reservation);
			if (input_reservation) {
			    dateResult = dateResult.toISOString();
			}
			if(typeof dateResult===undefined||typeof dateResult==='undefined'){
				console.log("date Result is..undefined.....");
				dateResult="";
			}
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
								+ input_messageTitle
								+ '\\",\\"contentText\\":\\"'
								+ input_messageContent
								+ '\\",\\"ticker\\":\\"'
								+ input_messageTitle
								+ '\\"}}","sender":"'
								+ tokenID
								+ '","receiver":"users/'
								+ input_messageTarget
								+ '","qos":2,"retained":false}',
						success : function(data) {
							console.log(data);
							console.log(data.result.success);
							if (data.result.success) {
								alert("메세지를 성공적으로 전송하였습니다.");
								wrapperFunction('groupMessage');
								$('#input_messageTarget').focus();
							} else {
								alert("메세지 전송에 실패 하였습니다");
								wrapperFunction('groupMessage');
								$('#input_messageTarget').focus();
							}
						},
						error : function(data, textStatus, request) {
							alert("메세지 전송에 실패 하였습니다");
							wrapperFunction('groupMessage');
							$('#input_messageTarget').focus();
						}
					});
		}
	}
}



// form null check
function individualFormCheck() {
	var input_messageTarget = $('#input_messageTarget').val();
	var input_messageTitle = $('#input_messageTitle').val();
	var textAreaPlainText = ckGetPlainText();
	textAreaPlainText = compactTrim(textAreaPlainText);
	console.log('nullcheck..start');
	console.log(textAreaPlainText);
	var input_reservation = $('#input_reservation').val();

	if (input_messageTarget == null || input_messageTarget == "") {
		alert("메세지 보낼 대상을 입력해주세요");
		$('#input_messageTarget').focus();
		return false;
	}

	else if (input_messageTitle == null || input_messageTitle == "") {
		alert("메세지 제목  입력해주세요");
		$('#input_messageTitle').focus();
		return false;
	}

	else if (textAreaPlainText == null || textAreaPlainText == "") {
		alert("메세지 내용  입력해주세요");
		$('#input_messageContent').focus();
		return false;
	} else if (input_reservation == null || input_reservation == "") {

		if (confirm("예약 시간이 설정 되지 않아 메세지가 즉시 전송됩니다.") == true) {
			return true;
		} else {
			return false;
		}

	} else if (input_reservation) { // 예약 메세지
		var convertDate = input_reservation;
		input_reservation = compactTrim(input_reservation);
		input_reservation = input_reservation.substring(0, 10);
		var validateDateResult = validateDate(input_reservation);

		if (!validateDateResult) {
			alert('입렵하신 예약 날짜가 형식에 맞지 않습니다.');
			return false;
		} else {

			convertDate = dateFormating(convertDate);
			var nowDateTime = new Date();
			var nowTime = nowDateTime.getTime() + 300000;
			var convertPickerTime = convertDate.getTime();
			if (nowTime > convertPickerTime) {
				alert('예약메세지는 현재 시각기준보다 5분 이상 설정 되어야 합니다.');
				return false;
			}
			return true;
		}
		if (confirm("예약이 설정된 시간으로 메세지가 전송됩니다. 확인해 주세요") == true) {
			return true;
		} else {
			return false;
		}

	}

	else {
		return true;
	}

}



//메세지 서식이미지 로딩 Event
$("#backImg").change(function() {
	console.log('file.....change...');
	readURL(this);
});
//메세지 서식 이미지 적용
function readURL(input) {
	console.log("in resadURL...");

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			console.log(e.target.result);

			$('.cke_reset').contents().find('.cke_show_borders').css(
					"background-image", "url(" + e.target.result + ")");

			$('.cke_reset').contents().find('.cke_show_borders').css(
					"background-size", "100%");

		}

		reader.readAsDataURL(input.files[0]);
	} else {
		$('.cke_reset').contents().find('.cke_show_borders').css(
				"background-image", "none");

	}
}
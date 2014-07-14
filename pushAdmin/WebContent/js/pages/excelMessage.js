//excel send click
function excelFunction() {
	console.log('excelclick');

	var formResult = excelFormCheck();

	if (formResult) {

		fileCheck();

		// //
		var tokenID = sessionStorage.getItem("tokenID");

		if (tokenID) {

			var textAreaContents = GetContents();
			var textAreaPlainText = ckGetPlainText();
			console.log('plain TExt');
			console.log(textAreaPlainText);
			console.log('endplanin text');
			var htmlEncodeResult = utf8_to_b64(textAreaContents);
			console.log("htmlEncodeResult..");
			console.log(htmlEncodeResult);

			var input_messageTitle = $('#input_messageTitle').val();
			var input_reservation = $('#input_reservation').val();
			var cateGorySelect = $('#cateGorySelect').val();
			dateResult = dateFormating(input_reservation);
			var imageText = document.getElementById("backImg").value;
			var imageFile = document.getElementById("backImg").files[0];
			var replaceImageText = imageText.replace(/^.*\\/, "");
			var uuid = guid();
			console.log("유유아이디");
			console.log(uuid);
			console.log("유유아이디");
			replaceImageText = uuid + replaceImageText;
			console.log(replaceImageText);
			var formdata = new FormData();
			formdata.append("imageText", imageText);
			formdata.append("imageFile", imageFile);
			formdata.append('uuid', uuid);
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "/pushAdmin/FileUploader", true);
			xhr.send(formdata);
			xhr.onload = function(e) {

				if (this.status == 200) {

					console.log(this.responseText);

				}

			};
			if (input_reservation) {
				dateResult = dateResult.toISOString();
			}
			if (typeof dateResult === undefined
					|| typeof dateResult === 'undefined') {
				console.log("date Result is..undefined.....");
				dateResult = "";
			}
			var smscheck = false;
			var smsTimeOut = 0;
			var qos = 0;
			qos = $("#qosSelect").val();
			var cateGorySelect = $('#cateGorySelect').val();
			console.log("QOS");
			console.log(qos);
			if($("input:checkbox[id='smsckeck']").is(":checked") == true){
				
		    	var timeSet= $('#timeSelect').val();
		    	console.log('smsckeck change function');
		    	smscheck=true;
		    	if(timeSet==1){
		    		smsTimeOut=1;
		    	}else if(timeSet==2){
		    		smsTimeOut=10;
		    	}else if(timeSet==3){
		    		smsTimeOut=30;
		    	}else if(timeSet==4){
		    		smsTimeOut=60;
		    	}
				
			}
			if (!cateGorySelect) {
				cateGorySelect = "기타";
			}
			console.log(cateGorySelect);
		}
	}

}

// 메세지 서식이미지 로딩 Event
$("#backImg").change(function() {
	console.log('file.....change...');
	console.log(this.files[0].size);
	if (this.files[0].size > 20000) {
		alert('파일 사이즈를 20kb 이하로 설정해 주십시요 .');
		wrapperFunction('excel');
	}
	readURL(this);
});
// 메세지 서식 이미지 적용
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

// form null check
function excelFormCheck() {
	var excelValue = $('#excelFile').val();
	var input_messageTitle = $('#input_messageTitle').val();
	var textAreaPlainText = ckGetPlainText();
	textAreaPlainText = compactTrim(textAreaPlainText);
	console.log('nullcheck..start');
	console.log(textAreaPlainText);
	var input_reservation = $('#input_reservation').val();

	var excelObj = document.getElementById('excelFile');

	// if(objValue==''){
	// alert('엑셀 파일을 선택해 주세요.');
	// return false;
	// }
	//        

	if (input_messageTitle == null || input_messageTitle == ""
			|| input_messageTitle.length > 15) {
		alert("메세지 제목 이 없거나 너무 깁니다 (길이 15자 이하)");
		;
		$('#input_messageTitle').focus();
		return false;
	}

	else if (textAreaPlainText == null || textAreaPlainText == "") {
		alert("메세지 내용  입력해주세요");
		$('#input_messageContenteExcel').focus();
		return false;
	} else if (excelValue == null || excelValue == "") {
		alert('엑셀 파일을 선택해 주세요');
		$('#excelFile').focus();
		return false;

	} else if (excelObj) {
		var lastIndex = -1;
		var filePaht = "";
		filePath = excelObj.value;
		lastIndex = filePath.lastIndexOf('.');
		extension = filePath.substring(lastIndex + 1, filePath.len);
		if (!((extension.toLowerCase() == "xls" || extension.toLowerCase() == "xlsx"))
				&& extension != "") {
			alert('xls 파일만 첨부가능 합니다.');

			return false;
		}
		return true;

	}

	else if (input_reservation == null || input_reservation == "") {

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
$('#categorycheck').change(function() {
	if (this.checked) {
		$('#cateGorySelect').prop('disabled', false);
	} else {
		$('#cateGorySelect').prop('disabled', 'disabled');
	}
});

$('#smsckeck').change(function() {
	if (this.checked) {
		$('#timeSelect').prop('disabled', false);
	} else {
		$('#timeSelect').prop('disabled', 'disabled');
	}
});

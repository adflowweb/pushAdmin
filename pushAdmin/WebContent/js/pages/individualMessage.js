// message send click
function individualFunction() {
	console.log('message send click..');
	var checkForm = individualFormCheck();
	if (checkForm) {

		var tokenID = sessionStorage.getItem("tokenID");
		var loginID = sessionStorage.getItem("userID");
		if (tokenID) {
			var textAreaContents = GetContents();
			var textAreaPlainText = ckGetPlainText();
			console.log('plain TExt');
			console.log(textAreaPlainText);
			console.log('endplanin text');
			var htmlEncodeResult = utf8_to_b64(textAreaContents);
			console.log("htmlEncodeResult..");
			console.log(htmlEncodeResult);
			var input_messageTarget = $('#input_messageTarget').val();
			var input_messageTitle = $('#input_messageTitle').val();
			var input_reservation = $('#input_reservation').val();
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
						data : '{"sender":"'
								+ loginID
								+ '","receiver":"/users/'
								+ input_messageTarget
								+ '","qos":1, "retained":false, "sms":false, "timeOut":600,"reservation":"'
								+ dateResult
								+ '", "content":" {\\"notification\\":{\\"notificationStyle\\":1,\\"contentTitle\\":\\"'
								+ input_messageTitle
								+ '\\",\\"contentText\\":\\"'
								+ textAreaPlainText + '\\",\\"imageName\\":\\"'
								+ replaceImageText
								+ '\\",\\"htmlContent\\":\\"'
								+ htmlEncodeResult + '\\",\\"ticker\\":\\"'
								+ input_messageTitle
								+ '\\",\\"summaryText\\":\\"'
								+ input_messageTitle
								+ '\\", \\"image\\":\\"\\"} } "}',

						success : function(data) {
							console.log(data);
							console.log(data.result.success);
							if (data.result.success) {
								alert("메세지를 성공적으로 전송하였습니다.");
								wrapperFunction('individual');

								$('#input_messageTarget').focus();
							} else {
								alert("메세지 전송에 실패 하였습니다");
								wrapperFunction('individual');
								$('#input_messageTarget').focus();
							}
						},
						error : function(data, textStatus, request) {
							alert("메세지 전송에 실패 하였습니다");
							wrapperFunction('individual');
							$('#input_messageTarget').focus();
						}
					});
		}
	}
}

function individualSearch() {

	var searchForm = searchFormCheck();

	if (searchForm) {
		var selectValue = $('#searchSelect').val();
		console.log("select Value...start");
		console.log(selectValue);
		console.log("select value end..");
		var tokenID = sessionStorage.getItem("tokenID");
		var userID = sessionStorage.getItem("userID");
		// name
		if (selectValue == 1) {

			// Id
		} else if (selectValue == 2) {
			var input_searchContent = $('#input_searchContent').val();
			$.ajax({
				// /v1/bsbank/groups/BSCP
				url : ' /v1/bsbank/users/' + input_searchContent,
				type : 'GET',
				headers : {
					'X-ApiKey' : tokenID
				},
				contentType : "application/json",
				async : false,
				success : function(data) {
					var tableData = [];
					var item = data.result.data;
					console.log(item);

					tableData.push({
						"Id" : item.gw_stf_cdnm,
						"Name" : item.gw_user_nm,
						"Dept" : item.gw_sbsd_cdnm,
						"Phone" : item.gw_stf_cdnm
					});
					console.log(tableData);
					var odataTable = $('#dataTables-example').dataTable({
						bJQueryUI : true,
						aaData : tableData,
						bDestroy : true,
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

					// odataTable.ajax.reload();
					$('#dataTables-example tbody').on(
							'click',
							'tr',
							function() {
								console.log('클리이벤트');
								var tableData = $(this).children("td").map(
										function() {
											return $(this).text();
										}).get();

								console.log(tableData[0]);
								$('#input_messageTarget').val(tableData[0]);

							});

				},
				error : function(data, textStatus, request) {
					console.log(data);
					alert('정보를 가지고 오는데 실패 하였습니다.');
				}
			});

		}
	}

}

function searchFormCheck() {
	var input_searchContent = $('#input_searchContent').val();
	if (input_searchContent == null || input_searchContent == "") {
		alert("검색할 대상을 입력해주세요");
		$('#input_searchContent').focus();
		return false;
	}
	return true;
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

	else if (input_messageTitle == null || input_messageTitle == ""
			|| input_messageTitle.length > 15) {
		alert("메세지 제목 이 없거나 너무 깁니다 (길이 15자 이하)");
		;
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

// 메세지 서식이미지 로딩 Event
$("#backImg").change(function() {
	console.log('file.....change...');
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
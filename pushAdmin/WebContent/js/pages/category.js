function insertCategoryFunction() {
	var tokenID = sessionStorage.getItem("tokenID");
	var input_categoryName = $('#input_categoryName').val();

	if (input_categoryName == null || input_categoryName == "") {
		alert('등록할 카테고리 이름을 입력해 주세요!');
		return false;
	}

	
//	 - ** 카테고리 정보 입력하기 **
//	 > **request : ** 
//	 *method : POST
//	 header : X-ApiKey:{tokenID}
//	 uri : /v1/categories
//	 body : {"name":"환율정보"}*
//	 >
//	 > **response : **
//	 *{"result":{"success":"true", "info":{"updates":1}}}*
//	headers : {
//		'X-ApiKey' : tokenID
//	},

	$.ajax({
		url : '/v1/categories',
		type : 'GET',
		headers : {
		'X-ApiKey' : tokenID
	},
		contentType : "application/json",
		dataType : 'json',
		async : false,
		success : function(data) {
			console.log('category call success');
			console.log(data.result);
			console.log(data.result.data);
			
			if(data.result.data){
			
				for ( var i in data.result.data) {

					var item = data.result.data[i];
					console.log('itme name');
					console.log(item.name);
					console.log('category name');
					console.log(input_categoryName);
					var itemname=trim(item.name);
					var categoryName=trim(input_categoryName);
					if(itemname===categoryName){
						console.log('등록된 카테고리 이름이 있습니다.');
						alert('등록된 카테고리 이름이 있습니다.');
						return false;
					}
			
				}
	
				$.ajax({
					url : '/v1/categories',
					type : 'POST',
					headers : {
					'X-ApiKey' : tokenID
				},
					contentType : "application/json",
					dataType : 'json',
					async : false,
					data : '{"name":"'+input_categoryName+'"}',
					success : function(data) {
						console.log('category call success');
						console.log(data.result);
						console.log(data.result.info);
						if(data.result.info){
							alert('카테고리 등록에 성공하였습니다.');
							wrapperFunction('category');
						}else{
							alert('카테고리 등록에 실패하였습니다.');
						}
				

					},
					error : function(data, textStatus, request) {
						console.log('fail start...........');
						alert('카테고리 등록에 실패하였습니다.');
						console.log('fail end.............');
					}
				});
				

			}else{
				alert('카테고리 등록 실패하였습니다.');
			}
	

		},
		error : function(data, textStatus, request) {
			console.log('fail start...........');
			alert('카테고리 등록 실패하였습니다.');
			console.log('fail end.............');
		}
	});
	
	

	
	
}


function trim(str) {
    str = str.replace(/(^\s*)|(\s*$)/, "");
    return str;
}

function deleteCategoryFunction() {
	var input_categoryID = $('#input_categoryID').val();
	var tokenID = sessionStorage.getItem("tokenID");
	if (input_categoryID == null || input_categoryID == "") {
		alert('삭제할 카테고리 이름을 입력해 주세요!');
		return false;
	}
	
//	> **request : ** 
//	*method : DELETE
//	header : X-ApiKey:{tokenID}
//	uri : /v1/categories/{categoryID}*
//	>
//	> **response : **
//	*{"result":{"success":true,"info":["updates=1"]}}*
	
	
	
	$.ajax({
		url : '/v1/categories/'+input_categoryID,
		type : 'DELETE',
		headers : {
		'X-ApiKey' : tokenID
	},
		contentType : "application/json",
		dataType : 'json',
		async : false,
		success : function(data) {
			console.log('category call success');
			console.log(data.result);
			console.log(data.result.info);
			if(data.result.info){
				alert('카테고리 삭제 에 성공하였습니다.');
				wrapperFunction('category');
			}else{
				alert('카테고리 삭제에 실패하였습니다.');
			}
	

		},
		error : function(data, textStatus, request) {
			console.log('fail start...........');
			alert('카테고리 삭제 에 실패하였습니다.');
			console.log('fail end.............');
		}
	});

}
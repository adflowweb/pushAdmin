var tokenID = sessionStorage.getItem("tokenID");
var loginID = sessionStorage.getItem("userID");

var tableData = $(this).children("td").map(function() {
	return $(this).text();
}).get();

console.log(tableData[0]);

// if ($("input:checkbox[id='input_targetcheck']").is(
// ":checked") == true) {
//
// var inputMessageTarget = tableData[0] + "("
// + tableData[1] + "),";
// $('#input_messageTarget').val(
// $('#input_messageTarget').val()
// + inputMessageTarget);
//
// } else {
//
// $('#input_messageTarget').val(
// tableData[0] + "(" + tableData[1] + ")");
//
// }
// get group info
$
		.ajax({
			// /v1/bsbank/groups/BSCP
			url : '/v1/bsbank/groups/' + tableData[0],
			type : 'GET',
			headers : {
				'X-ApiKey' : tokenID
			},
			contentType : "application/json",
			async : false,
			success : function(data) {
				var tableData = [];
				if (data.result.data) {

					for ( var i in data.result.data) {

						var item = data.result.data[i];
						console.log(item);
						tableData.push({
							"Group Id" : item.gw_deptmt_cdnm,
							"Group Name" : item.gw_dpnm,
							"Group Code" : item.gw_sbsd_cdnm
						});
					}

					console.log(tableData);
					var odataTable = $('#detaildataTables-example-groupB')
							.dataTable({
								bJQueryUI : true,
								aaData : tableData,
								bDestroy : true,
								aoColumns : [ {
									mData : 'Group Id'
								}, {
									mData : 'Group Name'
								}, {
									mData : 'Group Code'

								} ]
							});

					// odataTable.ajax.reload();
					$('#detaildataTables-example-groupB tbody')
							.on(
									'click',
									'tr',
									function() {
										console.log('클리이벤트');
										var tableData = $(this).children("td")
												.map(function() {
													return $(this).text();
												}).get();

										console.log(tableData[0]);

										// if ($(
										// "input:checkbox[id='input_targetcheck']")
										// .is(
										// ":checked") ==
										// true) {
										//
										// var
										// inputMessageTarget
										// = tableData[0]
										// + "("
										// + tableData[1]
										// + "),";
										// $(
										// '#input_messageTarget')
										// .val(
										// $(
										// '#input_messageTarget')
										// .val()
										// +
										// inputMessageTarget);
										//
										// } else {
										//
										// $(
										// '#input_messageTarget')
										// .val(
										// tableData[0]
										// + "("
										// + tableData[1]
										// + ")");
										//
										// }

										$('#message_type').val(3);
										console.log($('#message_type').val());

										$
												.ajax({
													// /v1/bsbank/groups/BSCP
													url : '/v1/bsbank/users?dept='
															+ tableData[0],
													type : 'GET',
													headers : {
														'X-ApiKey' : tokenID
													},
													contentType : "application/json",
													async : false,
													success : function(data) {
														var tableData = [];
														if (data.result.data) {

															for ( var i in data.result.data) {

																var item = data.result.data[i];
																console
																		.log(item);
																tableData
																		.push({
																			"personId" : item.gw_stf_cdnm,
																			"personName" : item.gw_user_nm,
																			"personCode" : item.gw_psinm
																		});
															}

															console
																	.log(tableData);
															var odataTable = $(
																	'#detaildataTables-example-groupC')
																	.dataTable(
																			{
																				bJQueryUI : true,
																				aaData : tableData,
																				bDestroy : true,
																				aoColumns : [
																						{
																							mData : 'personId'
																						},
																						{
																							mData : 'personName'
																						},
																						{
																							mData : 'personCode'

																						} ]
																			});
															$(
																	'#detaildataTables-example-groupC tbody')
																	.on(
																			'click',
																			'tr',
																			function() {
																				console
																						.log('클리이벤트');
																				var tableData = $(
																						this)
																						.children(
																								"td")
																						.map(
																								function() {
																									return $(
																											this)
																											.text();
																								})
																						.get();

																				console
																						.log(tableData[0]);
																				// if
																				// ($(
																				// "input:checkbox[id='input_targetcheck']")
																				// .is(
																				// ":checked")
																				// ==
																				// true)
																				// {
																				//
																				// var
																				// inputMessageTarget
																				// =
																				// tableData[0]
																				// +
																				// ",";
																				//
																				// $(
																				// '#input_messageTarget')
																				// .val(
																				// $(
																				// '#input_messageTarget')
																				// .val()
																				// +
																				// inputMessageTarget);
																				//
																				// }
																				// else
																				// {
																				// $(
																				// '#input_messageTarget')
																				// .val(
																				// tableData[0]
																				// +
																				// "("
																				// +
																				// tableData[1]
																				// +
																				// ")");
																				//
																				// }
																				$(
																						'#message_type')
																						.val(
																								3);
																				console
																						.log($(
																								'#message_type')
																								.val());
																			});

														} else {
															alert('직원 정보를 가지고 오는데 실패 하였습니다.');
														}
													},
													error : function(data,
															textStatus, request) {
														console.log(data);
														alert('직원 정보를 가지고 오는데 실패 하였습니다.');
													}
												});

									});
				} else {
					alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
				}
			},
			error : function(data, textStatus, request) {
				console.log(data);
				alert('세부 Group 정보를 가지고 오는데 실패 하였습니다.');
			}
		});
var tokenID = sessionStorage.getItem("tokenID");
var combined;
var idle;
var used;
var free;
var heapMax;
var heapUsed;
var heapFree;
var diskUsed;
var diskFree;
var tps;
var smsmonitor;


if(monitoringInterval){
	console.log('in clear');
	clearInterval(monitoringInterval);
}




	$.ajax({
		url : '/v1/server',
		type : 'GET',
		headers : {
			'X-ApiKey' : tokenID
		},
		contentType : "application/json",
		async : false,
		success : function(data) {

			if (data.result.success) {


				var item = data.result.data;
				console.log(item);
//				var heapMax;
//				var heapUsed;
//				var heapFree;
				
				combined = item.cpu.combined;
				idle = item.cpu.idle;
				combined = combined * 100;
				idle = idle * 100;
				used=item.memory.used*0.001;
				free=item.memory.free*0.001;
				
				heapMax=item.heap.heapMax*0.001;
				heapUsed=item.heap.heapUsed*0.001;
				heapFree=heapMax-heapUsed;
				used=used.toFixed(1);
				free=free.toFixed(1);
				heapMax=heapMax.toFixed(1);
				heapUsed=heapUsed.toFixed(1);
				heapFree=heapFree.toFixed(1);
				diskUsed=item.disk[0].used;
				diskFree=item.disk[0].avail;
				diskUsed=diskUsed.slice(0, -1);
				diskFree=diskFree.slice(0, -1);
				diskUsed *= 1;
				diskFree *= 1;
				tps=item.tps;
				combined=combined.toFixed(1);
				idle=idle.toFixed(1);
				
				smsmonitor=item.sms;
				if(smsmonitor){
					$('#sms_monitor').html('<button type="button" style="width:100%" class="btn btn-success">On</button>');
				}else{
					$('#sms_monitor').html('<button type="button" style="width:100%" class="btn btn-danger">Off</button>');
				}

			} else {
				console.log('server errors');
			}

		},
		error : function(data, textStatus, request) {
			console.log(data);

		}
	});

	var morrisDataCpu=Morris.Donut({
		element : 'morris-donut-chart-cpu',
		data : [ {
			label : "Combined",
			value : combined
		}, {
			label : "idle",
			value : idle
		} ],
	
//		  colors: [
//		    'red',
//		    'rgb(11, 98, 164)',
//		  ],
		resize : true
	});
	
	var morrisDataMemory=Morris.Donut({
		element : 'morris-donut-chart-memory',
		data : [ {
			label : "Memory used",
			value : used
		}, {
			label : "Memory free",
			value : free
		} ],
//		 colors: [
//				    'rgb(11, 98, 164)',
//				    'aqua',
//				  ],
		resize : true
	});

	var morrisDataheap=Morris.Donut({
		element : 'morris-donut-chart-heap',
		data : [ {
			label : "Heap Used",
			value : heapUsed
		}, {
			label : "Heap Free",
			value : heapFree
		} ],
		resize : true
	});
	
	var morrisDatadisk=Morris.Donut({
		element : 'morris-donut-chart-disk',
		data : [ {
			label : "Disk used",
			value : diskUsed
		}, {
			label : "Disk free",
			value : diskFree
		} ],
		resize : true
	});
	//tps

	var morrisDataTps=Morris.Donut({
		element : 'morris-donut-chart-tps',
		data : [ {
			label : "TPS",
			value : tps
		}],
		resize : true
	});
	
	var monitoringInterval=setInterval(function() {
		console.log('!!!');
		var monitoringStatus=sessionStorage.getItem("monitoringStatus");
		console.log('monitoring status');
		console.log(monitoringStatus);
		if(	monitoringStatus=="enable"){
			
	$.ajax({
		url : '/v1/server',
		type : 'GET',
		headers : {
			'X-ApiKey' : tokenID
		},
		contentType : "application/json",
		async : false,
		success : function(data) {

			if (data.result.success) {


				var item = data.result.data;
				console.log(item);
				combined = item.cpu.combined;
				idle = item.cpu.idle;
				combined = combined * 100;
				idle = idle * 100;
				used=item.memory.used*0.001;
				free=item.memory.free*0.001;
				used=used.toFixed(1);
				free=free.toFixed(1);
				combined=combined.toFixed(1);
				idle=idle.toFixed(1);
				heapMax=item.heap.heapMax*0.001;
				heapUsed=item.heap.heapUsed*0.001;
				heapFree=heapMax-heapUsed;
		
				heapMax=heapMax.toFixed(1);
				heapUsed=heapUsed.toFixed(1);
				heapFree=heapFree.toFixed(1);
				diskUsed=item.disk[0].used;
				diskFree=item.disk[0].avail;
				diskUsed=diskUsed.slice(0, -1);
				diskFree=diskFree.slice(0, -1);
				diskUsed *= 1;
				diskFree *= 1;
				console.log('disk start');
				console.log(diskUsed);
				console.log(diskFree);
				console.log('disk end');
				morrisDataCpu.setData([ {
					label : "Combined",
					value : combined
				}, {
					label : "idle",
					value : idle
				} ]);
				
				morrisDataMemory.setData([ {
					label : "Memory used",
					value : used
				}, {
					label : "Memory free",
					value : free
				} ]);
				
				morrisDataheap.setData([ {
					label : "Heap Used",
					value : heapUsed
				}, {
					label : "Heap Free",
					value : heapFree
				} ]);
				//morrisDataheap
				//morrisDatadisk
				morrisDatadisk.setData([ {
					label : "Disk used",
					value : diskUsed
				}, {
					label : "Disk free",
					value : diskFree
				} ]);
				//morrisDataTps
				morrisDataTps.setData([ {
					label : "TPS",
					value : tps
				} ]);
			} else {
				console.log('server errors');
			}

		},
		error : function(data, textStatus, request) {
			console.log(data);

		}
	});
		}
	
	}, 10000);


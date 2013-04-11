	$(function(){
		var list = typeof(localStorage.flvUrlList)=='undefined' ? false : JSON.parse(localStorage.flvUrlList);
		if (list) {
			$('#logs').html('<table class="table" align="center"></table>')
			//list.reverse(); //逆序
			//$('#logs').html();
			for (var i = 0; i < list.length; i++) {
				$('#logs table').prepend('<tr><td style="width: 220px">' + list[i].time + '</td><td><input value="' + list[i].url + '"></td></tr>');
			}
		}
		
	});
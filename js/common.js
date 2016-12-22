Wlife.factory('moveSmart',function(){
	return {
		scroll:function(){
			var barHeader = document.getElementById('bar-header');
			var topLoading = document.getElementById('toploading');
			window.onscroll = function() {
				var t = document.documentElement.scrollTop || document.body.scrollTop;
				barHeader.style.opacity = t / 200;
				topLoading.style.fontSize = -t + 30 + 'px';
			};
		},
		getTime:function(){
			var dd = new Date(); 
			
			var y = dd.getFullYear(); 
			var m = dd.getMonth()+1;//获取当前月份的日期 
			var d = dd.getDate(); 
			return m+"-"+d; 
		}
	}
})

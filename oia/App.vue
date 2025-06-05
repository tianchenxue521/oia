<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			// #ifdef APP-PLUS
			  plus.navigator.setFullscreen(true) //隐藏状态栏
			// #endif
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>  
    body::after {  
        content: none !important;  
    }  
</style>

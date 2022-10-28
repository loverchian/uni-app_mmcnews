<template>
	<view>
	   <navbar></navbar>
	
	</view>
	
</template>

<script>
	export default {
		
	
		data() {
			return{
			message:'hello',
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: function (res) {
					console.log('成功',res)
				}
			});
           
		},
		methods: {
			 change(e){
				 console.log('我被改变了'+e);
			 }
			
		}
	}
</script>

<style lang="scss">
	.height{
		border:1px red solid;
		height: 500rpx;
	}
</style>

<template>
	<view class="home">
	
			<navbar></navbar>
			<!-- <tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab> -->
			<tab :list= "tabList"  @tab="tab"></tab>
			<view class="home-list">
				<list :tab="tabList" @change="change"></list>
			</view>
			
			<!-- <view class="home-list">
	        <list :tabs="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view> -->
		</view>
</template>

<script>
	export default {


		data() {
			return {
				tabList: [],
				tabIndex:0,
				activeIndex: 1
				
			}
		},
		onLoad() {
			//console.log("res");
			this.getLabel()

		},
		methods: {
            change(current){
				//this.tabIndex=current
				console.log('dangqian');
			},
			getLabel() {
				
				this.$api.get_label({
					name: 'get_label'
				}).then((res) => {
					const {
						data
					} = res
					this.tabList = data
				})

			},
			tab(item, index) {
				//console.log(item, index);
				this.activeIndex = index

			},
		}
	}
</script>

<style lang="scss">
page {
		height: 100%;
		display: flex;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.home-list {
			flex: 1;
			//overflow: hidden;
			box-sizing: border-box;
			.list-scroll{
				height:100%;
				display:flex;
				flex-direction: column;
			}
		}
	}
</style>

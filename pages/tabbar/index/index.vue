<template>
	<view class="home">
	
			<navbar></navbar>
			<!-- 将tabList数值传送给list -->
			<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
			<view class="home-list">
				<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
			
			</view>

		</view>
</template>

<script>
	export default {


		data() {
			return {
				tabList: [],
				tabIndex:0,
				activeIndex: 0
				
			}
		},
		onLoad() {
			//console.log("res");
			this.getLabel()//页面一进入就调取getlabel云函数

		},
		methods: {
            change(current){
				this.tabIndex=current
				//console.log('当前swiper的值',current);
			},
			getLabel() {
				
				this.$api.get_label({
					name: 'get_label' //云函数的名字
				}).then((res) => { //将请求到的云函数数据，赋值到res
					const {data} = res  //这句话是const{data}=res.data的简化写法
					this.tabList = data
				})

			},
			tab(item, index) {
				//console.log("Tab页面： ",index);
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

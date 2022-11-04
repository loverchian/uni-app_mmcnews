<template>
	<view class="home">
	
			<navbar></navbar>
	
			<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
	
			<list-scroll>
				<list-card v-for="item in 5"></list-card>
			</list-scroll>
	
	
	
		</view>
</template>

<script>
	export default {


		data() {
			return {
				tabList: [],
			}
		},
		onLoad() {
			//console.log("res");
			this.getLabel()

		},
		methods: {

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
				console.log(item, index);
				//this.activeIndex = index

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
			overflow: hidden;
			box-sizing: border-box;
			.list-scroll{
				height:100%;
				display:flex;
				flex-direction: column;
			}
		}
	}
</style>

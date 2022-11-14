<template>
	<!-- Tab选项卡滑动页内容 -->
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :list="listCatchData[index]"></list-item>
			</list-scroll>
		</swiper-item>

	</swiper>

</template>

<script>
	import listItem from './list-item.vue'

	export default {
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		name: "list",

		components: {
			listItem
		},

		data() {
			return {
				list: [],
				listCatchData: {}
			};
		},
		watch: {
			tab(newVals) {
				if (newVals.length === 0) return
				this.getList(this.activeIndex)
				// this.listCatchData = {}
				// this.load = {}
				// this.getList(0)
			}
		},
		created() {
			//this.getList(0)
		},
		methods: {
			change(e) {
				const {
					current
				} = e.detail
				//console.log(this.tab[current])
				this.getList(current)
				this.$emit('change', current)
			},
			getList(current) {
				this.$api.get_list({
					name: this.tab[current].name
				}).then(res => {
					//console.log(res);
					const {
						data
					} = res
					//console.log('请求数据', data);
					//this.list=data
					//this.listCatchData[current] = data
					this.$set(this.listCatchData,current,data)
				})
			}
		},
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}
		}
	}
</style>

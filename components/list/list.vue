<template>
	<!-- Tab选项卡滑动页内容 -->
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
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
				listCatchData: {},
				load: {},
				pageSize: 10
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
			loadmore() {
				if (this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				console.log("触发上拉事件")
				this.page++
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
				//this.getList(current)
			},
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
					// page: this.load[current].page,
					// pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					const {
						data
					} = res
					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current, oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					this.$set(this.listCatchData, current, oldList)
					console.log(res)
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

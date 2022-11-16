<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons :type="like?'heart-filled':'heart'" size="20" color="#f07373"></uni-icons>

	</view>
</template>

<script>
	export default {
		name: "likes",
 		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
               like:false
			};
		},
			watch: {
					item(newVal) {
		
						this.like = this.item.is_like
					}
				},
		created() {
					this.like = this.item.is_like
				},
		methods: {
			likeTap() {
				console.log('收藏成功')
				this.like = !this.like
				this.setupdateLikes()
				//this.updateLikes(); 
			},
			setupdateLikes() {
				//uni.showLoading()
				this.$api.update_like({
					//article_id: this.item._id
					user_id:'635fe887b1fb0700017c0894',
					article_id:this.item._id
				}).then(res => {
					// uni.hideLoading()
					// uni.showToast({
					// 	title: this.like ? "取消收藏" : "收藏成功",
					// 	icon: "none"
					// })
					// uni.$emit('update_article', this.types)

					console.log(res)
				});
			}
		}
	}
</script>

<style lang="scss">
	.icons {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>

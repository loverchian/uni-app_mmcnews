<template>
	<view class="detail">

		<view class="detail-title">
			{{formData.title}}
		</view>

		<view class="detail-header">
			<view class="detail-header__logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>

			<view class="detail-header__content">
				<view class="detail-header__content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header__content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>

			<button class="detail-header__button" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>

		</view>

		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="formData.content" :noData="noData"> </u-parse>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="(item,index) in commentsList" :key="item.comment_id">
					<comment-box :comments="item" @reply="reply"></comment-box>
				</view>
			</view>

		</view>

		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box" @click="open">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="likeAction(formData._id)">
					<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="thumbsAction(formData._id)">
					<uni-icons :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup'" size="22" color="#F07373"></uni-icons>
				</view>

			</view>

		</view>

		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header__item" @click="close">取消</text>
					<text class="popup-header__item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容"></textarea>
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				formData: {},
				noData: '<p style="text-align:center;color:#666">详情加载中...</p>',
				commentsValue: '',
				commentsList: [],
				replyFormData: {}
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)

			this.getDetail();

			this.getComments();
			
		},
		onReady() {

		},
		methods: {
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then(res => {
					console.log(res)
					const {
						data
					} = res
					this.formData = data[0]
				}).catch(e => {

				});
			},

			//请求评论内容
			getComments() {
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res => {
					console.log(res)
					const {
						data
					} = res
					this.commentsList = data
				}).catch(e => {

				});
			},
			// 打开评论发布窗口
			openComment() {
				this.$refs.popup.open();
			},
			// 关闭弹框
			close() {
				this.$refs.popup.close();
			},
			//发布
			submit() {
				if (!this.commentsValue) {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
					return;
				}
				this.setUpdateComment({
					content: this.commentsValue,
					...this.replyFormData
				})

			},
			setUpdateComment(content) {
				uni.showLoading()
				const formData = {
					...content,
					article_id: this.formData._id
				}
				this.$api.update_comment(formData).then(res => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: '评论发布成功'
					})
					this.getComments()
					this.close()
					this.replyFormData = {}
					this.commentsValue = ""
				}).catch(e => {
					uni.hideLoading()
				});
			},
			//回复评论
			reply(comments) {
				this.replyFormData = {
					comment_id: comments.comments.comment_id,
					is_reply: comments.is_reply
				}
				if (comments.comments.reply_id) {
					this.replyFormData.reply_id = comments.comments.reply_id
				}
				console.log(this.replyFormData)
				// 打开当前输入框
				this.$refs.popup.open();
			},
			// 关注
			follow(authorid) {
				this.setUpdateAuthor(authorid)
			},
			setUpdateAuthor(authorid) {
				uni.showLoading()
				this.$api.update_author({
					author_id: authorid
				}).then(res => {
					uni.hideLoading();
					console.log(res)
					this.formData.is_author_like = !this.formData.is_author_like
					uni.$emit('update_author')
					uni.showToast({
						title: this.formData.is_author_like ? "关注作者成功" : "取消关注作者",
						icon: "none"
					})
				}).catch(e => {
					console.log(e)
					uni.hideLoading();
				})
			},
			// 收藏
			likeAction(articleid) {
				// console.log(this.formData)
				this.setUpdateList(articleid)
			},
			setUpdateList(article_id) {
				uni.showLoading()
				this.$api.update_likes({
					article_id: article_id
				}).then(res => {
					console.log("收藏成功")
					
					uni.$emit('update_article','follow')
					
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.showToast({
						title: this.formData.is_like ? "收藏成功" : "取消收藏",
						icon: "none"
					})
				}).catch(e => {
					uni.hideLoading()
				})
			},
			// 点赞
			thumbsAction(articleid) {
				this.setUpdateThumbs(articleid)
				
			},

			setUpdateThumbs(articleid) {
				uni.showLoading()
				this.$api.update_thumbs({
					article_id:articleid
				}).then(res => {
					console.log(res)
					this.formData.is_thumbs_up = !this.formData.is_thumbs_up
					this.formData.thumbs_up_count = this.formData.thumbs_up_count+1
					
					uni.hideLoading()
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}).catch(e => {

				});
			},
			//打开评论列表
			open() {
				uni.navigateTo({
					url:"/pages/detail-comments/detail-comments?id="+this.formData._id
				})
			}






		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header__logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header__content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header__content-title {
				font-size: 14px;
				color: #333;
			}

			.detail-header__content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}


		.detail-header__button {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			background-color: $mk-base-color;
			color: #FFFFFF;
		}

	}

	.detail-content {
		min-height: 500px;
		margin-top: 20px;

		.detail-html {
			padding: 0 15px;
		}

		.detail-comment {
			margin-top: 30px;

			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
			}

			.comment-content {
				padding: 0 15px;
				border-top: 1px #eee solid;
			}
		}
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border: 1px #f5f5f5 solid;
		background-color: #FFFFFF;
		box-sizing: border-box;

		.detail-bottom__input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;

			text {
				color: #999;
				font-size: 14px;
			}
		}

		.detail-bottom__icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom__icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}

	}

	.popup-wrap {
		background-color: #FFFFFF;

		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px #f5f5f5 solid;

			.popup-header__item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}

		.popup-content {
			width: 100%;
			padding: 10px 15px;
			box-sizing: border-box;

			.popup-textarea {
				width: 100%;
				height: 200px;
			}

			.popup-count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}

	}
</style>

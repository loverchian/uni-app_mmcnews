<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header__logo">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="comments-header__info">
				<view class="title">meHaotian</view>
				<view>2020-03-03</view>
			</view>
		</view>
		<view class="comments-content">
			<view>uniapppp是一个很棒<</view>
		</view>
	</view>
</template>

<script>
	export default {
		//name: "comment-box",
		props: {
			comments: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.comments-box {
		margin: 15px 0;

		.comments-header {
			display: flex;

			.comments-header__logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.comments-header__info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;

				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;

					.reply-text {
						margin: 0 10px;
						font-size: 12px;
						font-weight: bold;

					}
				}
			}
		}

		.comments-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;

			.comments-info {
				margin-top: 15px;
				display: flex;

				.comments-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px #ccc solid;
				}
			}

			.comments-reply {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px #eee solid;
			}

		}
	}
</style>

<template>
	<el-header class="header-split-line">
		<el-row :gutter="20" type="flex" justify="end" align="middle">
			<el-col :span="8" align="left" id="title">
				<div class="grid-content bg-purple">你应该走着去 而不是跑着去</div>
			</el-col>
			<el-col :span="16">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#F5F5F5">
					<el-menu-item index="1"><router-link to="/summarize" class="navFontSize">Summarize</router-link></el-menu-item>
					<el-menu-item index="2"><router-link to="/symbol" class="navFontSize">Symbol</router-link></el-menu-item>
					<el-menu-item index="3"><router-link to="/step" class="navFontSize">Step</router-link></el-menu-item>
					<el-menu-item index="4"><router-link to="/Prebs" class="navFontSize">Prebs</router-link></el-menu-item>
					<el-menu-item index="5"><router-link to="/note-write" class="navFontSize">NoteWrite</router-link></el-menu-item>
				</el-menu>
			</el-col>
		</el-row>

	</el-header>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.white-space {
		margin: 1px;
	}

	.el-row {
		height: 100%;
	}

	#title {
		height: 100%;

		div {
			line-height: 60px;
			font-size: 140%;
		}
	}
	
	router-link{
		font-size: 140%;
	}

	a {
		text-decoration: none;
	}
	
	.navFontSize {
		font-size: 120%;
		color: #555555
	}
</style>

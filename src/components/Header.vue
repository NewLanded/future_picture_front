<template>
	<el-header class="header-split-line">
		<el-row :gutter="20" type="flex" justify="end" align="middle">
			<el-col :span="2">
				<div class="white-space"></div>
			</el-col>
			<el-col :span="10" align="left" id="title">
				<div class="grid-content bg-purple">时间的朋友</div>
			</el-col> 
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<router-link to="/summarize">Summarize</router-link>
				</div>
			</el-col> |
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<router-link to="/symbol">Symbol</router-link>
				</div>
			</el-col> |
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<router-link to="/note">Note</router-link>
				</div>
			</el-col> |
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<router-link to="/note-write">NoteWrite</router-link>
				</div>
			</el-col> |

			<el-col :span="4">
				<div class="white-space"></div>
			</el-col>
		</el-row>
		
	</el-header>
</template>

<script>
</script>

<style lang="less" scoped="scoped">

	
	.white-space{
		margin: 1px;
	}
	
	.el-row{
		height: 100%;
	}
	
	#title{
		height: 100%;
		div{
			line-height: 60px;
			font-size: 140%;
		}
	}
	
	a{
		text-decoration: none;
	}
	
</style>

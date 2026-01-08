<template>
	<div id="debug">
		<div :class="{ active: debug.orchestra }">G</div>
		<div :class="{ active: debug.buildPanel }">D</div>
	</div>
	<lazy-debug-orchestra />
	<lazy-debug-build-panel />
</template>

<script setup lang="ts">
import useAppStore from '~/store/useAppStore';

const $store = useAppStore();
const debug = computed(() => $store.getDebug);
</script>

<style lang="scss" scoped>
#debug {
	position: fixed;
	right: 0;
	top: 0;
	z-index: 99999;
	display: flex;

	> div {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		flex: 0 0 16px;
		font-family: monospace;
		font-size: 9px;
		font-weight: bold;
		line-height: 1cap;
		color: white;

		&:nth-child(1) {
			background-color: white;
			border: 2px solid #c93b09;
			color: #c93b09;

			&.active {
				background-color: #c93b09;
				color: white;
			}
		}

		&:nth-child(2) {
			background-color: white;
			border: 2px solid #5692f5;
			color: #5692f5;

			&.active {
				background-color: #5692f5;
				color: white;
			}
		}
	}
}
</style>

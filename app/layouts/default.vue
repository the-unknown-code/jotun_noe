<template>
	<lenis :options="{}">
		<div :class="['container']">
			<page-transition>
				<slot />
			</page-transition>
		</div>
	</lenis>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
	position: relative;
	z-index: 1;
}
</style>

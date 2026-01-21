<template>
	<div v-if="company"
		class="page-reader">
		<p>
			<span>Company Name</span>
			<span>{{ company?.company }}</span>
		</p>
		<p>
			<span>N° of Invitee</span>
			<span>{{ company?.pax }}</span>
		</p>
		<p>
			<span>Guest List</span>
			<span>{{ company?.guest }}</span>
		</p>
		<p>
			<span>Food Notes</span>
			<span>{{ company?.special_request }}</span>
		</p>
		<p>
			<span>Table</span>
			<span>-</span>
		</p>
	</div>
</template>

<script setup lang="ts">
import useAppStore from '~/store/useAppStore';

const $store = useAppStore();
const $route = useRoute();

const company = computed(() => {
	const id = $route.query.id;
	return $store.companies.find((c: any) => c.id === id);
});
</script>

<style lang="scss" scoped>
.page-reader {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: var(--spacer-16);
	min-height: 100dvh;
	color: black;
	font-weight: bold;
	padding: var(--spacer-16);
	visibility: hidden;
	opacity: 0;
	display: none;

	p {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacer-4);
		padding-bottom: var(--spacer-8);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		text-align: center;

		span {
			&:nth-child(1) {
				font-size: 13px;
			}

			&:nth-child(2) {
				font-size: 22px;
			}
		}
	}
}
</style>

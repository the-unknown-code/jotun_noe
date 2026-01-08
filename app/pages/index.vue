<template>
	<main ref="$main" class="page-index">
		<div class="page-index__background">
			<img
				ref="$background"
				src="/images/background.webp"
				alt="JOTUN - Invitation"
			/>
		</div>
		<div class="page-index__content">
			<img
				id="jotun"
				class="animate"
				src="/images/logo.webp"
				alt="JOTUN - Invitation"
			/>
			<div id="logo">
				<img
					class="animate"
					src="/images/title_01.webp"
					alt="JOTUN - Invitation"
				/>
				<img
					class="animate"
					src="/images/title_02.webp"
					alt="JOTUN - Invitation"
				/>
				<img
					class="animate"
					src="/images/title_03.webp"
					alt="JOTUN - Invitation"
				/>
				<img
					class="animate"
					src="/images/title_04.webp"
					alt="JOTUN - Invitation"
				/>
			</div>
			<div id="company">
				<p class="animate">
					<span>to: </span>
					<span>Company Name</span>
				</p>
			</div>
			<div id="info">
				<img class="animate" src="/images/line.webp" alt="JOTUN - Invitation" />
				<p class="animate">
					We are pleased to invite you to attend the
					<b>Applicator Night Award 2026</b>, an exclusive evening dedicated to
					honouring outstanding achievements and valuable contributions.
				</p>
				<p class="animate">
					Location<br />
					<span>
						<b>February 6, 2026, Black Owl PIK</b><br />beginning at
						<b>18:00</b>.
					</span>
				</p>
				<p class="animate">
					Dess Code<br />
					<span>
						<b>Burgundy & Maroon tones</b>
					</span>
				</p>
				<img class="animate" src="/images/line.webp" alt="JOTUN - Invitation" />
			</div>
			<div id="qr-code">
				<img
					class="animate"
					src="/images/qr-code.webp"
					alt="JOTUN - Invitation"
				/>
				<p class="animate">Please present the QR Code above upon arrival.</p>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import gsap from 'gsap/all';

const $main = ref<HTMLElement | null>(null);
const initialize = () => {
	if (!$main.value) return;
	const $animate = $main.value.querySelectorAll('.animate');

	gsap.set($animate, {
		opacity: 0,
		y: 40,
	});

	gsap.to($animate, {
		delay: 0.25,
		opacity: 1,
		y: 0,
		duration: 1.35,
		ease: 'power2.inOut',
		stagger: 0.135,
	});
};

tryOnMounted(async () => {
	await nextTick();
	initialize();
});
</script>

<style lang="scss" scoped>
.page-index {
	min-height: 100vh;
	color: #e7c79a;
	padding-bottom: var(--spacer-64);
	background-color: #031e45;

	.animate {
		opacity: 0;
	}

	&__background {
		@include fill(absolute);
		transform: translateY(0) !important;
		z-index: 0;

		img {
			@include fill(absolute);
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top center;
		}
	}

	&__content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacer-32);
		z-index: 1;

		#jotun {
			width: 120px;
			height: auto;
		}

		#logo {
			position: relative;
			width: 100%;
			aspect-ratio: 1370/636;

			img {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
			}
		}

		#company {
			margin: var(--spacer-32) 0;

			p {
				span {
					&:nth-child(1) {
						font-size: 16px;
					}
					&:nth-child(2) {
						font-size: 32px;
					}
				}
			}
		}

		#info {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: var(--spacer-16);
			text-align: center;

			p {
				font-size: 17px;

				b {
					font-family: 'BentonModDisp-RegularItalic';
				}

				span {
					font-size: 18px;
				}
			}

			img {
				position: relative;
				width: 150px;
				height: auto;
			}
		}

		#qr-code {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: var(--spacer-16);
			margin-top: var(--spacer-64);

			img {
				position: relative;
				width: 150px;
				height: auto;
			}

			p {
				font-size: 15px;
			}
		}
	}
}
</style>

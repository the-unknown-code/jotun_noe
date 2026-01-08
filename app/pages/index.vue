<template>
	<section>
		<audio
			ref="$audio"
			type="audio/mpeg"
			src="/sound/ambience.mp3"
			loop
			autoplay
		></audio>
		<div class="page-index__background">
			<img
				ref="$background"
				src="/images/background.webp"
				alt="JOTUN - Invitation"
			/>
		</div>
		<div id="stars">
			<img
				v-for="i in 10"
				:key="i"
				class="star"
				src="/images/star.webp"
				alt="JOTUN - Invitation"
			/>
		</div>

		<main ref="$main" :class="['page-index', { 'is-visible': isVisible }]">
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
					<img
						class="animate"
						src="/images/line.webp"
						alt="JOTUN - Invitation"
					/>
					<p class="animate">
						We are pleased to invite you to attend the
						<b>Applicator Night Award 2026</b>, an exclusive evening dedicated
						to honouring outstanding achievements and valuable contributions.
					</p>
					<p class="animate">
						Location<br />
						<span>
							<b>February 6, 2026, Black Owl PIK</b><br />beginning at
							<b>18:00</b>.
						</span>
					</p>
					<p class="animate">
						Dress Code<br />
						<span>
							<b>Burgundy & Maroon tones</b>
						</span>
					</p>
					<img
						class="animate"
						src="/images/line.webp"
						alt="JOTUN - Invitation"
					/>
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
		<div id="intro" ref="$intro">
			<img
				id="jotun"
				class="animate"
				src="/images/logo.webp"
				alt="JOTUN - Invitation"
			/>
			<p @click="initialize">Open Invitation</p>
		</div>
	</section>
</template>

<script setup lang="ts">
import gsap from 'gsap/all';

const $audio = ref<HTMLAudioElement | null>(null);
const $main = ref<HTMLElement | null>(null);
const $intro = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const initialize = () => {
	if (!$main.value) return;

	isVisible.value = true;
	$audio.value?.play();
	const $animate = $main.value.querySelectorAll('.animate');

	gsap.to($intro.value, {
		opacity: 0,
		duration: 1.35,
		ease: 'power2.inOut',
	});

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
	// initialize();
});
</script>

<style lang="scss" scoped>
@keyframes star-shine {
	0% {
		transform: scale(1) rotate(0deg);
	}
	20% {
		transform: scale(1.25) rotate(72deg);
		filter: brightness(2.2);
	}
	40% {
		transform: scale(1.05) rotate(144deg);
	}
	60% {
		transform: scale(1.18) rotate(216deg);
		filter: brightness(2.5);
	}
	80% {
		transform: scale(1) rotate(288deg);
	}
	100% {
		transform: scale(1) rotate(360deg);
		filter: brightness(0.7);
	}
}

section {
	position: relative;
	min-height: 100vh;
	background-color: #031e45;

	#intro {
		@include fill(fixed);
		display: flex;
		flex-direction: column;
		gap: var(--spacer-16);
		align-items: center;
		justify-content: center;
		font-size: 24px;
		font-weight: 700;
		color: #e7c79a;
		z-index: 10;

		img {
			width: 120px;
		}

		p {
			text-decoration: underline;
		}
	}

	#stars {
		@include fill(absolute);
		width: 100%;
		height: 100%;
		z-index: 1;
		pointer-events: none;

		img {
			position: absolute;
			width: 50px;
			height: auto;

			/* Randomize star position, animation, and size for 10 stars */
			@for $i from 1 through 10 {
				&:nth-child(#{$i}) {
					opacity: #{0.25 + random(51) / 100};
					$top: random(90); // percent of viewport height
					$left: random(90); // percent of viewport width
					$size: 20 + random(41); // size in px, from 50 to 90
					$dur: 2 + random(25) / 10; // random duration 2s to 4.5s
					$animation_types: (linear);
					$animtype: nth($animation_types, random(length($animation_types)));
					top: #{$top}vh;
					left: #{$left}vw;
					width: #{$size}px;
					animation: star-shine #{$dur}s #{$animtype} infinite;
					will-change: transform, opacity, filter;
					transform-origin: 50% 50%;
					pointer-events: none;
				}
			}
		}
	}
}

.page-index {
	min-height: 100dvh;
	color: #e7c79a;
	padding-bottom: var(--spacer-64);
	display: none;

	&.is-visible {
		display: block;
	}

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
		z-index: 10;

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

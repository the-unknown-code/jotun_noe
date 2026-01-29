<template>
	<section>
		<audio ref="$audio"
			type="audio/mpeg"
			src="/sound/ambience.mp3"
			loop
			autoplay></audio>
		<div class="page-index__background">
			<video src="/video/background.mp4"
				autoplay
				loop
				muted
				playsinline></video>
		</div>
		<!--		<div id="stars">
			<img
				v-for="i in 20"
				:key="i"
				class="star"
				src="/images/star.webp"
				alt="JOTUN - Invitation"
			/>
		</div>
		-->

		<main ref="$main"
			:class="['page-index', { 'is-visible': isVisible }]">
			<div class="page-index__content">
				<img id="jotun"
					class="animate"
					src="/images/logo.webp"
					alt="JOTUN - Invitation" />
				<div id="logo">
					<img class="animate"
						src="/images/title_01.webp"
						alt="JOTUN - Invitation" />
					<img class="animate"
						src="/images/title_02.webp"
						alt="JOTUN - Invitation" />
					<img class="animate"
						src="/images/title_03.webp"
						alt="JOTUN - Invitation" />
					<img class="animate"
						src="/images/title_04.webp"
						alt="JOTUN - Invitation" />
				</div>
				<div id="company">
					<p class="animate">
						<span>to:<br /></span>
						<span>{{ company?.company }}</span>
					</p>
				</div>
				<div id="info">
					<img class="animate"
						src="/images/line.webp"
						alt="JOTUN - Invitation" />
					<p class="animate">
						We are pleased to invite you to attend the
						<b>Applicator Night Award 2026</b>, an exclusive evening dedicated
						to honouring outstanding achievements and valuable contributions.
					</p>
					<p class="animate">
						Location<br />
						<span>
							<b>Black Owl PIK</b>
						</span>
					</p>
					<p class="animate">
						Date & Time<br />
						<span>
							<b>February 6, 2026 at 17:00</b>
						</span>
					</p>
					<p class="animate">
						Dress Code<br />
						<span>
							<b>Cocktail Party, No Batik</b>
						</span>
					</p>
					<img class="animate"
						src="/images/line.webp"
						alt="JOTUN - Invitation" />
				</div>
				<div id="rsvp">
					<p class="animate">
						RSVP<br />
						<span>
							<b>Sekar +62 812-8084-0329</b>
						</span>
					</p>
				</div>
				<div id="qr-code">
					<!--
					<img
						class="animate"
						src="/images/qr-code.webp"
						alt="JOTUN - Invitation"
					/>
					-->
					<div class="animate">
						<Qrcode :value="`https://jotun-noe.vercel.app/reader?id=${company?.id}`"
							variant="rounded"
							radius="5"
							black-color="#debf9a"
							white-color="transparent" />
					</div>
					<p class="animate">Please present the QR Code above upon arrival.</p>
				</div>
			</div>
		</main>
		<div id="intro"
			ref="$intro">
			<img id="jotun"
				class="animate"
				src="/images/logo.webp"
				alt="JOTUN - Invitation" />
			<p @click="initialize">Open Invitation</p>
		</div>
	</section>
</template>

<script setup lang="ts">
import gsap from 'gsap/all';
import useAppStore from '~/store/useAppStore';

const $audio = ref<HTMLAudioElement | null>(null);
const $main = ref<HTMLElement | null>(null);
const $intro = ref<HTMLElement | null>(null);
const $store = useAppStore();
const isVisible = ref(false);

const $route = useRoute();
const company = computed(() => {
	const id = $route.query.id;
	return $store.companies.find((c: any) => c.id === id);
});

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
	background-color: #12000b;

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
			font-size: 14px;
			font-style: italic;
			cursor: pointer;
		}
	}

	#stars {
		@include fill(fixed);
		width: 100%;
		height: 100%;
		z-index: 1;
		pointer-events: none;
		opacity: 0.8;

		@include desktop {
			opacity: 1;
		}

		img {
			position: absolute;
			width: 50px;
			height: auto;

			/* Randomize star position, animation, and size for 10 stars */

			@for $i from 1 through 1 {
				&:nth-child(#{$i}) {
					opacity: #{0.05 + random(31) / 100};
					$top: random(90); // percent of viewport height
					$left: random(90); // percent of viewport width
					$size: 10 + random(61); // size in px, from 50 to 90
					$dur: 2 + random(45) / 10; // random duration 2s to 4.5s
					$animation_types: (
						linear
					);
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
	position: fixed;
	width: 100%;
	min-height: 100vh;
	color: #e7c79a;
	// padding-bottom: var(--spacer-64);
	display: none;

	&.is-visible {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.animate {
		opacity: 0;
	}

	&__background {
		@include fill(fixed);
		transform: translateY(0) !important;
		z-index: 0;
		opacity: 0.78;

		img,
		video {
			@include fill(absolute);
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top center;
		}

		&::after {
			content: '';
			@include fill(absolute);
			background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.68));
			opacity: 1;
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
		max-width: 540px;
		margin: 0 auto;

		#jotun {
			width: 120px;
			height: auto;
		}

		#logo {
			position: relative;
			width: 100%;
			aspect-ratio: 1370/636;
			min-width: 360px;

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
			text-align: center;

			display: none !important;
			visibility: hidden;
			opacity: 0;

			p {
				font-style: italic;
				visibility: hidden;

				span {
					&:nth-child(1) {
						font-size: 14px;
					}

					&:nth-child(2) {
						font-size: 26px;
					}
				}
			}
		}


		#rsvp {
			margin-top: var(--spacer-32);
		}

		#info {
			display: none !important;
			visibility: hidden;
			opacity: 0;
		}

		#info,
		#rsvp {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: var(--spacer-16);
			text-align: center;

			display: none !important;
			visibility: hidden;
			opacity: 0;

			p {
				font-size: 14px;
				font-style: italic;

				b {
					//font-family: 'BentonModDisp-RegularItalic';
					font-weight: bold;
				}

				span {
					font-size: 16px;
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

			/*
			visibility: hidden;
			opacity: 0;
			display: none;
			*/

			.animate {
				width: 180px;
			}

			img {
				position: relative;
				width: 150px;
				height: auto;
			}

			p {
				font-size: 13px;
				font-style: italic;
				text-align: center;
			}
		}
	}
}
</style>

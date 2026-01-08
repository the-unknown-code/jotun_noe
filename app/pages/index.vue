<template>
	<main class="page-index">
		<div class="page-index__background">
			<img src="/images/background.webp" alt="JOTUN - Invitation" />
		</div>
		<div class="page-index__content">
			<img id="jotun" src="/images/logo.webp" alt="JOTUN - Invitation" />
			<div id="logo">
				<img src="/images/title_01.webp" alt="JOTUN - Invitation" />
				<img src="/images/title_02.webp" alt="JOTUN - Invitation" />
				<img src="/images/title_03.webp" alt="JOTUN - Invitation" />
				<img src="/images/title_04.webp" alt="JOTUN - Invitation" />
			</div>
			<div id="company">
				<p>
					<span>to: </span>
					<span>Company Name</span>
				</p>
			</div>
			<div id="info">
				<img src="/images/line.webp" alt="JOTUN - Invitation" />
				<p>
					We are pleased to invite you to attend the<br />
					<b>Applicator Night Award 2026</b>, an exclusive evening<br />
					dedicated to honouring outstanding<br />
					achievements and valuable contributions.
				</p>
				<p>
					Location<br />
					<span>
						<b>February 6, 2026, Black Owl PIK</b><br />beginning at
						<b>18:00</b>.
					</span>
				</p>
				<p>
					Dess Code<br />
					<span>
						<b>Burgundy & Maroon tones</b>
					</span>
				</p>
				<img src="/images/line.webp" alt="JOTUN - Invitation" />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.page-index {
	min-height: 100vh;
	color: #e7c79a;

	&__background {
		@include fill(absolute);
		z-index: -1;

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
				font-size: 15px;

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
	}
}
</style>

<script>
	/** @type {import('./$types').PageData} */
	export let data; // Receives the 't' object from +layout.js

	let yesButtonSize = 1;
	let noButtonSize = 1;
	let showConfetti = false;
	let answered = false;
	let gaveUp = false;
	let hoverCount = 0;

	// This is now reactive and uses the language data from the layout
	$: noButtonText =
		hoverCount > 0
			? data.t.noButtonTexts[hoverCount] || data.t.noButtonTexts[9]
			: data.t.noButtonInitial;

	let noButtonStyle = `
		transform: scale(1);
		font-size: 1.2rem;
		opacity: 1;
	`;

	/**
	 * @param {{ currentTarget: any; }} event
	 */
	function handleNoHover(event) {
		hoverCount++;
		if (hoverCount >= 10) {
			gaveUp = true;
			return;
		}

		const button = event.currentTarget;
		const rect = button.getBoundingClientRect();
		const maxX = window.innerWidth - rect.width;
		const maxY = window.innerHeight - rect.height;
		const randomX = Math.random() * maxX;
		const randomY = Math.random() * maxY;

		yesButtonSize = Math.min(yesButtonSize + 0.2, 3);
		noButtonSize = Math.max(noButtonSize - 0.1, 0.3);

		noButtonStyle = `
			position: fixed;
			left: ${randomX}px;
			top: ${randomY}px;
			transform: scale(${noButtonSize});
			font-size: ${noButtonSize * 1.2}rem;
			opacity: ${Math.max(noButtonSize, 0.5)};
		`;
	}

	function handleYesClick() {
		showConfetti = true;
		answered = true;
	}

	/**
	 * @param {any} event
	 */
	function handleNoClick(event) {
		handleNoHover(event);
	}

	function createConfetti() {
		const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
		const confettiCount = 100;
		for (let i = 0; i < confettiCount; i++) {
			setTimeout(() => {
				const confetti = document.createElement('div');
				confetti.className = 'confetti';
				confetti.style.left = Math.random() * window.innerWidth + 'px';
				confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
				confetti.style.animationDelay = Math.random() * 0.5 + 's';
				document.body.appendChild(confetti);
				setTimeout(() => {
					document.body.removeChild(confetti);
				}, 3000);
			}, i * 30);
		}
	}

	$: if (showConfetti) {
		createConfetti();
	}
</script>

{#if gaveUp}
	<div class="gave-up-container">
		<div class="success-card scale-in">
			<div class="icon-container">
				<svg
					class="sad-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="96"
					height="96"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M16 16s-1.5-2-4-2-4 2-4 2" />
					<line x1="9" y1="9" x2="9.01" y2="9" />
					<line x1="15" y1="9" x2="15.01" y2="9" />
				</svg>
			</div>
			<h1 class="success-title">{data.t.gaveUpTitle}</h1>
			<p class="success-text">{data.t.gaveUpText}</p>
			<p class="success-subtext">{data.t.gaveUpSubtext}</p>
		</div>
	</div>
{:else if answered}
	<div class="success-container">
		<div class="success-card scale-in">
			<div class="icon-container pulse">
				<svg
					class="party-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="96"
					height="96"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M5.8 11.3 2 22l10.7-3.79" />
					<path d="M4 3h.01" />
					<path d="M22 8h.01" />
					<path d="M15 2h.01" />
					<path d="M22 20h.01" />
					<circle cx="12" cy="10" r="2" />
					<path d="m4.5 10.5 5-5" />
					<path d="m9.5 5.5 5 5" />
					<path d="m15 10 5.5 5.5" />
				</svg>
			</div>
			<h1 class="success-title">{data.t.successTitle}</h1>
			<p class="success-text">{data.t.successText}</p>
			<p class="success-subtext">{data.t.successSubtext}</p>
		</div>
	</div>
{:else}
	<div class="main-container">
		<div class="content">
			<div class="header fade-in">
				<div class="sparkle-container rotate"></div>

				<h1 class="main-title">{data.t.question}</h1>
				<p class="subtitle">{data.t.subtitle}</p>
			</div>

			<div class="buttons-container">
				<button
					class="yes-button"
					on:click={handleYesClick}
					style="transform: scale({yesButtonSize}); font-size: {yesButtonSize * 1.5}rem;"
				>
					{data.t.yesButton}
				</button>
				<button
					class="no-button"
					on:mouseenter={handleNoHover}
					on:touchstart={handleNoHover}
					on:click={handleNoClick}
					style={noButtonStyle}
				>
					{noButtonText}
				</button>
			</div>

			{#if hoverCount > 2}
				<p class="hint-text">{data.t.hint}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	/* All other styles remain unchanged */
	.main-container {
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--gradient-bg);
		overflow: hidden;
	}

	.content {
		text-align: center;
		padding: var(--spacing-lg);
		max-width: 48rem;
		margin: 0 var(--spacing-sm);
	}

	.header {
		margin-bottom: var(--spacing-xl);
	}

	.sparkle-container {
		display: flex;
		justify-content: center;
		margin-bottom: var(--spacing-md);
	}

	.main-title {
		font-size: clamp(var(--font-4xl), 8vw, var(--font-7xl));
		font-weight: 700;
		margin-bottom: var(--spacing-lg);
		color: var(--color-white);
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.subtitle {
		font-size: clamp(var(--font-xl), 4vw, var(--font-2xl));
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
	}

	.buttons-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		align-items: center;
		justify-content: center;
		position: relative;
		min-height: 120px;
		margin-bottom: var(--spacing-lg);
	}

	@media (min-width: 640px) {
		.buttons-container {
			flex-direction: row;
		}
	}

	.yes-button {
		background-color: var(--color-success);
		color: var(--color-white);
		padding: var(--spacing-lg) var(--spacing-xl);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-2xl);
		transition: all var(--transition-base);
		border: none;
		cursor: pointer;
	}

	.yes-button:hover {
		background-color: #059669;
		box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
	}

	.no-button {
		background-color: var(--color-danger);
		color: var(--color-white);
		padding: var(--spacing-md) var(--spacing-lg);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		transition: all var(--transition-fast);
		position: absolute;
		border: none;
		cursor: pointer;
	}

	@media (min-width: 640px) {
		.no-button {
			position: relative;
		}
	}

	.no-button:hover {
		background-color: #dc2626;
	}

	.hint-text {
		margin-top: var(--spacing-lg);
		color: rgba(255, 255, 255, 0.8);
		font-size: var(--font-lg);
		animation: fadeIn 0.5s ease-out;
	}

	.success-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%);
	}

	.gave-up-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
	}

	.success-card {
		text-align: center;
		padding: var(--spacing-2xl);
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-2xl);
		max-width: 36rem;
		margin: 0 var(--spacing-sm);
	}

	.icon-container {
		margin-bottom: var(--spacing-md);
	}
	.sad-icon {
		color: var(--color-text-dark);
		margin: 0 auto;
	}
	.party-icon {
		color: var(--color-primary);
		margin: 0 auto;
	}

	.success-title {
		font-size: var(--font-6xl);
		font-weight: 700;
		margin-bottom: var(--spacing-md);
		background: var(--gradient-purple);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.success-text {
		font-size: var(--font-2xl);
		color: var(--color-text-dark);
		margin-bottom: var(--spacing-sm);
	}

	.success-subtext {
		font-size: var(--font-xl);
		color: #4b5563;
		margin-bottom: var(--spacing-lg);
	}

	:global(.confetti) {
		position: fixed;
		width: 10px;
		height: 10px;
		top: -10px;
		z-index: 9999;
		pointer-events: none;
		animation: confetti-fall 3s ease-out forwards;
	}

	@keyframes confetti-fall {
		to {
			top: 100vh;
			opacity: 0;
			transform: rotate(720deg);
		}
	}
</style>

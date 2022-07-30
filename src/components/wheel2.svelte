<script lang="ts">
	import type { Emotion } from '../types/Emotion';
	import EmotionCompoment from './emotion.svelte';
	export let emotions: Emotion[];

	const circumference = 100;
	const radius: number = circumference / (2 * Math.PI); // radius of circle with circumference of 100
	const viewBoxSize: number = 100;
</script>

<svg height="100%" width="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
	{#each emotions as emotion, i}
		<EmotionCompoment
			parentArcLength={circumference}
			{emotion}
			position={i}
			siblingCount={emotions.length}
			parentRadius={radius}
			{viewBoxSize}
		/>
	{/each}
</svg>

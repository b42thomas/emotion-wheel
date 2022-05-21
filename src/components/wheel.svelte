<script lang="ts">
	import type { Emotion } from '../types/Emotion';
	import Slice from './slice.svelte';
	import SliceLabel from './sliceLabel.svelte';
	import EmotionCompoment from './emotion.svelte';
	export let emotions: Emotion[];

	const r: number = 100 / (2 * Math.PI);
	const viewBoxSize: number = 42;
</script>

<svg height="100%" width="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
	{#each emotions as emotion, i}
		<EmotionCompoment {emotion} {i} max={emotions.length} {r} {viewBoxSize} />
	{/each}
</svg>

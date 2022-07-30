<script lang="ts">
	import type { Emotion } from 'src/types/Emotion';
	import Slice from './slice.svelte';
	import SliceLabel from './sliceLabel.svelte';

	export let parentArcLength: number; // this should not be equal to its parents circumference /  sibling count
	export let depth: number = 0;
	export let emotion: Emotion;
	export let position: number; // position among siblings
	export let siblingCount: number;
	export let parentRadius: number; // this should be constant at every depth
	export let viewBoxSize: number;

	let arcLength = parentArcLength / siblingCount;
	let radius = parentRadius + parentRadius * depth * 1.5;
</script>

<Slice
	color={emotion.color}
	{position}
	{arcLength}
	{radius}
	centerCoord={viewBoxSize / 2}
/>
<!-- <SliceLabel
	{position}
	{siblingCount}
	name={emotion.name}
	r={(radius * 0.9) / (depth + 1)}
	{viewBoxSize}
/> -->
{#each emotion.childEmotions as childEmotion, i}
	<svelte:self
		parentArcLength={arcLength}
		depth={depth + 1}
		emotion={childEmotion}
		position={i}
		siblingCount={emotion.childEmotions.length}
		{parentRadius}
		{viewBoxSize}
	/>
{/each}

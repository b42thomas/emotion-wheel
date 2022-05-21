<script lang="ts">
	import type { Emotion } from 'src/types/Emotion';
	import Slice from './slice.svelte';
	import SliceLabel from './sliceLabel.svelte';

	export let emotion: Emotion;
	export let i: number;
	export let max: number;
	export let r: number;
	export let viewBoxSize: number;
</script>

<Slice color={emotion.color} {i} {max} circumfrence={100} r={r / 2} strokeWidth={r} {viewBoxSize} />
<SliceLabel {i} {max} name={emotion.name} r={r * 0.9} {viewBoxSize} />
{#each emotion.specificEmotions as specifcEmotion, i}
	<Slice
		color={specifcEmotion.color}
		{i}
		{max}
		circumfrence={100}
		r={r * 1.5}
		strokeWidth={r}
		{viewBoxSize}
	/>
{/each}

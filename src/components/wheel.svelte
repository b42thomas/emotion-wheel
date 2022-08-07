<script lang="ts">
    import type { Emotion } from '../types/Emotion';
	import type { Section } from '../types/Section';
	import EmotionComponent from './emotion.svelte';
	export let emotions: Emotion[];

	const radius: number = 25; // radius of circle with circumference of 100
	const viewBoxSize: number = radius * 10;
    const numberOfSiblings = emotions.length;
</script>

<svg height="100%" width="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
    {#each emotions as emotion, index}
        <EmotionComponent
            {emotion}
            {radius}
            {index}
            depth={0}
            parentArc={360}
            {numberOfSiblings}
        />
    {/each}
</svg>

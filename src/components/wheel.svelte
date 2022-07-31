<script lang="ts">
    import type { Emotion } from '../types/Emotion';
	import type { Section } from '../types/Section';
	import SectionComponent from './section.svelte';
	export let emotions: Emotion[];

	const radius: number = 25; // radius of circle with circumference of 100
	const viewBoxSize: number = radius * 2;
    const totalSiblings = emotions.length;
    const angleOfAllSiblings = 1 / totalSiblings * 360;
    const sections: Section[] = emotions.map((emotion, index, array) => {
        return  {
            color: emotion.color,
            endAngle: (index + 1) * angleOfAllSiblings,
            name: emotion.name,
            radius,
            startAngle: index * angleOfAllSiblings,
        }
    })
</script>

<svg height="100%" width="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
	{#each sections as section}
		<SectionComponent
			{section}
		/>
	{/each}
</svg>

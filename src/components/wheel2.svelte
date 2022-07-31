<script lang="ts">
    import type { Emotion } from '../types/Emotion';
	import type { Section } from '../types/Section';
	import SectionComponent from './section.svelte';
	export let emotions: Emotion[];

	const circumference = 100;
	const radius: number = circumference / (2 * Math.PI); // radius of circle with circumference of 100
	const viewBoxSize: number = 100;
    const totalSiblings = emotions.length;
    const angleOfAllSiblings = 1 / totalSiblings * 360;
    const sections: Section[] = emotions.map((emotion, index, array) => {
        return  {
            radius,
            startAngle: index * angleOfAllSiblings,
            endAngle: (index + 1) * angleOfAllSiblings,
            fill: emotion.color
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

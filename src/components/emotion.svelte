<script lang="ts">
	import type { Emotion } from 'src/types/Emotion';

	import SectionComponent from './section.svelte';
	import OuterSectionComponent from './outerSection.svelte';

	export let emotion: Emotion;
	export let radius: number;
	export let depth: number;
	export let parentArc: number;
	export let index: number;
	export let numberOfSiblings: number;
	export let baseStartAngle: number = 0;

	const angleOfAllBaseSiblings = 1 / numberOfSiblings * parentArc;
	const startAngle = (index * angleOfAllBaseSiblings) + baseStartAngle;
	const endAngle = startAngle + angleOfAllBaseSiblings;
	const section = {
            color: emotion.color,
            endAngle,
            name: emotion.name,
            radius,
            startAngle,
			depth,
        }

</script>

{#if depth === 0}
	<SectionComponent {section} />
{:else}
	<OuterSectionComponent {section} />
{/if}


{#if emotion.childEmotions.length > 0}
	{#each emotion.childEmotions as childEmotion, i}
		<svelte:self
			emotion={childEmotion}
			{radius}
			index={i}
			depth={depth + 1}
			parentArc={section.endAngle - section.startAngle}
			numberOfSiblings={emotion.childEmotions.length}
			baseStartAngle={startAngle}
		/>
	{/each}
{/if}

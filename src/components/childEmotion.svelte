<script lang="ts">
	import type { Emotion } from 'src/types/Emotion';

	import SectionComponent from './section.svelte';

	export let emotion: Emotion;
	export let radius: number;
	export let depth: number;
	export let parentArc: number;
	export let index: number;
	export let numberOfSiblings: number;

	const angleOfAllSiblings = ( 1 / numberOfSiblings) * parentArc;
	const section = {
            color: emotion.color,
            endAngle: (index + 1) * angleOfAllSiblings,
            name: emotion.name,
            radius,
            startAngle: index * angleOfAllSiblings,
			depth,
        }

</script>

<SectionComponent {section} />

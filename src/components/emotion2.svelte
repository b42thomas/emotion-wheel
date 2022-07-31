<script lang="ts">
	import type { Section } from 'src/types/Section';
	import SectionComponent from './section.svelte';

    export let section: Section;

</script>

<SectionComponent {section}/>
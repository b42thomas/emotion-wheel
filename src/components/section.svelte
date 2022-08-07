<script lang="ts">
	import type { Section } from 'src/types/Section';
    import { 
		gatherCoordinatesForSection,
        assembleSectionFromCoordinates, 
        assembleTextCoordinatesFromSectionCoordinates, 
        assembleTextTransform,
    } from '../util/sectionCalculation';

	export let section: Section;

	const { startAngle, radius, endAngle, color, name, depth } = section;

	const sectionCoordinates = gatherCoordinatesForSection(radius, startAngle, endAngle, depth); 
	const largeArcFlag = endAngle - startAngle > 180;
	const sectionPath = assembleSectionFromCoordinates(sectionCoordinates, radius, depth, largeArcFlag); 
	const textCoordinates = assembleTextCoordinatesFromSectionCoordinates(sectionCoordinates);
	const textTransform = assembleTextTransform(startAngle, endAngle, textCoordinates, name.length)
</script>

<path id={name} style="fill: {color}" d={sectionPath} />
<text x={textCoordinates.x} y={textCoordinates.y} transform={textTransform}>{name}</text>

<style>
	text {
		font-size: 3px;
	}
</style>

<script lang="ts">
	import type { Section } from 'src/types/Section';
    import { 
		assembleOuterSectionResult
    } from '../util/outerSectionCalculation';

	export let section: Section;

	const { startAngle, radius, endAngle, color, name, depth } = section;

    const {path, text} = assembleOuterSectionResult(startAngle, radius, endAngle, color, name, depth)
</script>

<path id={path.name} style="fill: {path.color}" d={path.sectionPath} />
<text x={text.x} y={text.y} transform={text.textTransform}>{text.name}</text>

<style>
	text {
		font-size: 3px;
	}
</style>

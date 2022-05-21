<script lang="ts">
	export let color: string;
	export let i: number;
	export let max: number;
	export let r: number;
    export let circumfrence: number;
	export let strokeWidth: number;
	export let viewBoxSize: number;

    const sliceSize: number = (1 / max) * circumfrence;
	const strokeDashArray: string = `${sliceSize / 2} ${(100 - sliceSize) / 2}`;
</script>

<circle
	{r}
	cx={viewBoxSize / 2}
	cy={viewBoxSize / 2}
	fill="transparent"
	stroke={color}
	stroke-width={strokeWidth}
	stroke-dasharray={strokeDashArray}
	stroke-dashoffset={(sliceSize / 2) * i}
	id={`pieslice-${i}`}
/>

<script lang="ts">
	export let color: string;
	export let position: number;
	export let radius: number;
	export let arcLength: number;
	export let centerCoord: number;

	const strokeDashArray: string = `${arcLength} ${100 - arcLength}`;
	const strokeDashOffSet: string = `-${arcLength * position}`;
	console.log({
		color,
		position,
		radius,
		arcLength,
		strokeDashArray,
		strokeDashOffSet
	});
</script>

<circle
	r={radius}
	cx={centerCoord}
	cy={centerCoord}
	fill="transparent"
	stroke={color}
	stroke-width={radius * 1.99}
	stroke-dasharray={strokeDashArray}
	stroke-dashoffset={strokeDashOffSet}
/>

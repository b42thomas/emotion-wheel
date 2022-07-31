<!-- calulating the svg path ref:  https://marian-caikovski.medium.com/drawing-sectors-and-pie-charts-with-svg-paths-b99b5b6bf7bd -->
<script lang="ts">
	import type { PolarCoordinate } from '../types/PolarCoordinate';
	import type { CartesianCoordinate } from '../types/CartesianCoordinate';
	import type { Section } from '../types/Section';

	export let section: Section;

	const { startAngle, radius, endAngle, color, name } = section;

	function getD(
		radius: number,
		startCoordinates: CartesianCoordinate,
		endCoordinates: CartesianCoordinate
	) {
		const largeArcFlag = endAngle - startAngle > 180;
		return [
			startDrawingFromPoint(startCoordinates),
			drawArcToCoordinates(radius, largeArcFlag, endCoordinates),
			drawLineToCenter(radius),
			drawLineToStartPoint(startCoordinates),
			'Z' //close path
		].join(' ');
	}

	function startDrawingFromPoint(coordinates: CartesianCoordinate): string {
		return ['M', coordinates.x, coordinates.y].join(' ');
	}

	function drawArcToCoordinates(
		radius: number,
		largeArcFlag: boolean,
		coordinates: CartesianCoordinate
	): string {
		const ROTATION_RELATIVE_TO_X_AXIS = 0;
		const CLOCKWISE_ROTATION = 1;
		return [
			'A',
			radius,
			radius,
			ROTATION_RELATIVE_TO_X_AXIS,
			largeArcFlag ? 1 : 0,
			CLOCKWISE_ROTATION,
			coordinates.x,
			coordinates.y
		].join(' ');
	}

	function drawLineToCenter(radius: number): string {
		return ['L', radius, radius].join(' ');
	}

	function drawLineToStartPoint(coordinates: CartesianCoordinate): string {
		return ['L', coordinates.x, coordinates.y].join(' ');
	}

	function polarToCartesian(polar: PolarCoordinate): CartesianCoordinate {
		var radians = ((polar.angleInDegrees - 90) * Math.PI) / 180;
		return {
			x: radius + polar.radius * Math.cos(radians),
			y: radius + polar.radius * Math.sin(radians)
		};
	}

	function calculateTextCoordinates(points: CartesianCoordinate[]): CartesianCoordinate {
		const averageX = points.map((p) => p.x).reduce((a, b) => a + b) / points.length;
		const averageY = points.map((p) => p.y).reduce((a, b) => a + b) / points.length;

		return { x: averageX, y: averageY };
	}

	const startCoordinates = polarToCartesian({ radius, angleInDegrees: startAngle });
	const endCoordinates = polarToCartesian({ radius, angleInDegrees: endAngle });
	const calculatedSlicePath = getD(radius, startCoordinates, endCoordinates);
	const textCoordinates = calculateTextCoordinates([
		{ x: radius, y: radius },
		startCoordinates,
		endCoordinates
	]);
	const upsideDownText = endAngle > 180;
	let textTransform = `rotate(${(startAngle + endAngle) / 2 - 90}, ${textCoordinates.x}, ${
		textCoordinates.y
	})`;
	if (upsideDownText) {
		textTransform += ` rotate(180, ${textCoordinates.x}, ${textCoordinates.y})`;
	}
	textTransform += `translate(${-name.length / 2})`;
</script>

<path id={name} style="fill: {color}" d={calculatedSlicePath} />
<text x={textCoordinates.x} y={textCoordinates.y} transform={textTransform}>{name}</text>

<style>
	text {
		font-size: 3px;
	}
</style>

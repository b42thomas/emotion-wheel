<script lang="ts">
	export let siblingCount: number;
	export let position: number;
	export let name: string;
	export let r: number;
	export let viewBoxSize: number;

	function calcTextAngle(siblingCount: number, position: number): number {
		return -1 * ((position / siblingCount) * 360) + (1 / (2 * siblingCount)) * 360 - 0;
	}

	type Point = {
		x: number;
		y: number;
	};
	function calcSecondRotateAxis(angle: number, x: number, y: number, radius: number): Point {
		// cosθ = x / radius
		// sinθ = y / radius
		// x = cosø / radius
		// y = sinø / radius
		return { x: x + Math.cos(angle) / r, y: y - Math.sin(angle) / r };
	}
	function isTextUpsideDown(textAngle: number): boolean {
		return Math.abs(textAngle) > 90 && Math.abs(textAngle) < 270;
	}

	function textTransform(siblingCount: number, position: number): string {
		let textAngle: number = calcTextAngle(siblingCount, position);
		let rotate = `rotate(${textAngle}, ${viewBoxSize / 2}, ${viewBoxSize / 2})`;
		let translate = r / 4;
		if (isTextUpsideDown(textAngle)) {
			// translate = r * 0.8;
			let secondAxisOfRotation = calcSecondRotateAxis(
				textAngle,
				viewBoxSize / 2,
				viewBoxSize / 2,
				r / 2
			);
			return `${rotate} translate(${translate}) rotate(180, ${secondAxisOfRotation.x}, ${secondAxisOfRotation.y})`;
		}

		return `${rotate} translate(${translate}, ${translate / siblingCount})`;
	}

	function calcTextAnchor(max: number, position: number): string {
		return isTextUpsideDown(calcTextAngle(max, position)) ? 'end' : 'start';
	}
</script>

<text
	font-size={r / siblingCount}
	transform={`${textTransform(siblingCount, position)}`}
	text-anchor={calcTextAnchor(siblingCount, position)}
	dx={viewBoxSize / 2}
	dy={viewBoxSize / 2}
>
	{name}
</text>

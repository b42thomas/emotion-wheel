<script lang="ts">
	export let max: number;
	export let i: number;
	export let name: string;
	export let r: number;
	export let viewBoxSize: number;

	function calcTextAngle(max: number, i: number): number {
		return -1 * ((i / max) * 360) + (1 / (2 * max)) * 360 - 0;
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

	function textTransform(max: number, i: number): string {
		let textAngle: number = calcTextAngle(max, i);
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

		return `${rotate} translate(${translate}, ${translate / max})`;
	}

	function calcTextAnchor(max: number, i: number): string {
		return isTextUpsideDown(calcTextAngle(max, i)) ? 'end' : 'start';
	}
</script>

<text
	font-size={r / max}
	transform={`${textTransform(max, i)}`}
	text-anchor={calcTextAnchor(max, i)}
	dx={viewBoxSize / 2}
	dy={viewBoxSize / 2}
>
	{name}
</text>

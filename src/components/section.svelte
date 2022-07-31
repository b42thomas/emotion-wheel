<!-- calulating the svg path ref:  https://marian-caikovski.medium.com/drawing-sectors-and-pie-charts-with-svg-paths-b99b5b6bf7bd -->
<script lang="ts">
    import type { PolarCoordinate } from '../types/PolarCoordinate';
    import type { CartesianCoordinate } from '../types/CartesianCoordinate';
    import type { Section } from '../types/Section';
	export let section: Section;

    const  { startAngle, radius, endAngle, fill } = section;

    function getD(radius: number, startAngle: number, endAngle: number) {
    const isCircle = endAngle - startAngle === 360;
    if (isCircle) {
            endAngle--;
        }

    const start = polarToCartesian({ radius, angleInDegrees: startAngle });
    const end = polarToCartesian({ radius, angleInDegrees: endAngle });
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
        const d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y];
    if (isCircle) {
            d.push("Z");
        } else {
            d.push("L", radius, radius,
                "L", start.x, start.y,
                "Z");
        }
    return d.join(" ");
    }
    function polarToCartesian(polar: PolarCoordinate): CartesianCoordinate {
        var radians = (polar.angleInDegrees - 90) * Math.PI / 180;
    return {
            x: Math.round(radius + (polar.radius * Math.cos(radians))),
            y: Math.round(radius + (polar.radius * Math.sin(radians)))
        };
    }

    const calculatedSlicePath = getD(radius, startAngle, endAngle);

</script>

<path style="fill: {fill}" d={calculatedSlicePath} />

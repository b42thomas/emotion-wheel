import type { CartesianCoordinate } from '../types/CartesianCoordinate';
import type { PolarCoordinate } from '../types/PolarCoordinate';


type SectionCoordinates = {
    originCoordinate: CartesianCoordinate,
    startCoordinate: CartesianCoordinate,
    endCoordinate: CartesianCoordinate,
    innerEndCoordinate?: CartesianCoordinate,
    innerStartCoordinate?: CartesianCoordinate,
    sectionType: 'inner' | 'outer',
}

export function gatherCoordinatesForSection(radius: number, startAngle: number, endAngle: number, depth: number): SectionCoordinates {
    const originCoordinate = { x: radius * 5, y: radius * 5 };
    let sectionCoordinates: SectionCoordinates = {
        originCoordinate,
        startCoordinate: polarToCartesian(originCoordinate, { radius, angleInDegrees: startAngle }, depth),
        endCoordinate: polarToCartesian(originCoordinate, { radius, angleInDegrees: endAngle }, depth),
        sectionType: 'inner'
    };

    if (depth > 0) {
        sectionCoordinates.innerEndCoordinate = polarToCartesian(originCoordinate, { radius, angleInDegrees: endAngle }, depth - 1);
        sectionCoordinates.innerStartCoordinate = polarToCartesian(originCoordinate, { radius, angleInDegrees: startAngle }, depth - 1);
        sectionCoordinates.sectionType = 'outer'; 
    }
    return sectionCoordinates;
}

export function assembleSectionFromCoordinates(sectionCoordinates: SectionCoordinates, radius: number, depth: number, largeArcFlag: boolean) {
     if (sectionCoordinates.sectionType === 'inner') {
         return drawInnerSection({
             startCoordinate: sectionCoordinates.startCoordinate,
             endCoordinate: sectionCoordinates.endCoordinate,
             originCoordinate: sectionCoordinates.originCoordinate,
             radius,
             largeArcFlag
         })
     } else {
        const innerEndCoordinate = sectionCoordinates.innerEndCoordinate ?? {x:0, y:0};
        const innerStartCoordinate = sectionCoordinates.innerStartCoordinate ?? {x:0, y:0};
        const innerRadius = radius * (1 + (depth - 1));
        const outerRadius = radius * (1 + depth);
        return drawOuterSection({
            outerStartCoordinate: sectionCoordinates.startCoordinate,
            outerEndCoordinate: sectionCoordinates.endCoordinate,
            innerEndCoordinate: innerEndCoordinate,
            innerStartCoordinate: innerStartCoordinate,
            innerRadius,
            outerRadius,
            largeArcFlag
        })
    }
}

function assembleSectionPath(radius: number, startAngle: number, endAngle: number, depth: number): string {
    const largeArcFlag = endAngle - startAngle > 180;
    const originCoordinate = { x: radius * 5, y: radius * 5 };
    const startCoordinate = polarToCartesian(originCoordinate, { radius, angleInDegrees: startAngle }, depth);
    const endCoordinate = polarToCartesian(originCoordinate, { radius, angleInDegrees: endAngle }, depth);
    if (depth === 0) {
        return drawInnerSection({ startCoordinate, endCoordinate, originCoordinate, radius, largeArcFlag })
    } else {
        const innerEndCoordinate = polarToCartesian(originCoordinate, { radius, angleInDegrees: endAngle }, depth - 1);
        const innerStartCoordinate = polarToCartesian(originCoordinate, { radius, angleInDegrees: startAngle }, depth - 1);
        const innerRadius = radius * (1 + (depth - 1));
        const outerRadius = radius * (1 + depth);
        return drawOuterSection({
            outerStartCoordinate: startCoordinate,
            outerEndCoordinate: endCoordinate,
            innerEndCoordinate,
            innerStartCoordinate,
            innerRadius,
            outerRadius,
            largeArcFlag
        })
    }
}
// REF: calculating the svg path ref: https://marian-caikovski.medium.com/drawing-sectors-and-pie-charts-with-svg-paths-b99b5b6bf7bd 
type InnerSectionParams = {
    startCoordinate: CartesianCoordinate,
    endCoordinate: CartesianCoordinate,
    originCoordinate: CartesianCoordinate,
    radius: number,
    largeArcFlag: boolean
}

function drawInnerSection(params: InnerSectionParams) {
    const d = [startDrawingFromPoint(params.startCoordinate)];
    d.push(drawArcToCoordinatesClockWise(params.radius, params.largeArcFlag, params.endCoordinate));
    d.push(drawLineToCoordinate(params.originCoordinate));
    d.push('Z'); //close path
    return d.join(' ');
}

type OuterSectionParams = {
    outerStartCoordinate: CartesianCoordinate,
    outerEndCoordinate: CartesianCoordinate,
    innerEndCoordinate: CartesianCoordinate,
    innerStartCoordinate: CartesianCoordinate,
    outerRadius: number,
    innerRadius: number,
    largeArcFlag: boolean
}

function drawOuterSection(params: OuterSectionParams) {
    const { largeArcFlag } = params;
    const d = [startDrawingFromPoint(params.outerStartCoordinate)];
    d.push(drawArcToCoordinatesClockWise(params.outerRadius, largeArcFlag, params.outerEndCoordinate));
    d.push(drawLineToCoordinate(params.innerEndCoordinate));
    d.push(drawArcToCoordinatesCounterClockwise(params.innerRadius, largeArcFlag, params.innerStartCoordinate));
    d.push('Z'); //close path
    return d.join(' ');
}

function startDrawingFromPoint(coordinates: CartesianCoordinate): string {
    return ['M', coordinates.x, coordinates.y].join(' ');
}

function drawArcToCoordinates(
    radius: number,
    largeArcFlag: boolean,
    coordinates: CartesianCoordinate,
    isClockWise: boolean
): string {
    const ROTATION_RELATIVE_TO_X_AXIS = 0;
    return [
        'A',
        radius,
        radius,
        ROTATION_RELATIVE_TO_X_AXIS,
        largeArcFlag ? 1 : 0,
        isClockWise ? 1 : 0,
        coordinates.x,
        coordinates.y
    ].join(' ');
}

function drawArcToCoordinatesClockWise(
    radius: number,
    largeArcFlag: boolean,
    coordinates: CartesianCoordinate
): string {
    return drawArcToCoordinates(radius, largeArcFlag, coordinates, true);
}

function drawArcToCoordinatesCounterClockwise(
    radius: number,
    largeArcFlag: boolean,
    coordinates: CartesianCoordinate
): string {
    return drawArcToCoordinates(radius, largeArcFlag, coordinates, false);
}

function drawLineToCoordinate(coordinates: CartesianCoordinate): string {
    return ['L', coordinates.x, coordinates.y].join(' ');
}

function polarToCartesian(origin: CartesianCoordinate, polar: PolarCoordinate, depth: number): CartesianCoordinate {
    var radians = ((polar.angleInDegrees - 90) * Math.PI) / 180;
    return {
        x: origin.x + polar.radius * Math.cos(radians) * (1 + depth),
        y: origin.y + polar.radius * Math.sin(radians) * (1 + depth)
    };
}

export function assembleTextCoordinatesFromSectionCoordinates(sectionCoordinates: SectionCoordinates): CartesianCoordinate {

    const coordinates = [
        sectionCoordinates.startCoordinate,
        sectionCoordinates.endCoordinate,
    ];
    if (sectionCoordinates.sectionType === 'inner') {
        coordinates.push(sectionCoordinates.originCoordinate);
    }

    if (sectionCoordinates.sectionType === 'outer') {
        coordinates.push(sectionCoordinates.innerEndCoordinate ?? {x:0, y:0})
        coordinates.push(sectionCoordinates.innerStartCoordinate ?? {x:0, y:0})
    }

    return calculateAverageOfCoordinates(coordinates);
}

export function assembleTextCoordinates(radius: number, startAngle: number, endAngle: number, depth: number): CartesianCoordinate {
    const originCoordinate = { x: radius * 5, y: radius * 5 };
    const startCoordinates = polarToCartesian(originCoordinate, { radius, angleInDegrees: startAngle }, depth);
    const endCoordinates = polarToCartesian(originCoordinate, { radius, angleInDegrees: endAngle }, depth);
    return calculateAverageOfCoordinates([
        originCoordinate,
        startCoordinates,
        endCoordinates
    ]);
}

function calculateAverageOfCoordinates(coordinates: CartesianCoordinate[]): CartesianCoordinate {
    const averageX = coordinates.map((p) => p.x).reduce((a, b) => a + b) / coordinates.length;
    const averageY = coordinates.map((p) => p.y).reduce((a, b) => a + b) / coordinates.length;

    return { x: averageX, y: averageY };
}

export function assembleTextTransform(startAngle: number, endAngle: number, coordinates: CartesianCoordinate, nameLength: number): string {
    const upsideDownText = endAngle > 180;
    let textTransform = `rotate(${(startAngle + endAngle) / 2 - 90}, ${coordinates.x}, ${coordinates.y
        })`;
    if (upsideDownText) {
        textTransform += ` rotate(180, ${coordinates.x}, ${coordinates.y})`;
    }
    textTransform += `translate(${-nameLength / 2})`;
    return textTransform;
}
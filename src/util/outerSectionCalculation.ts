import type { CartesianCoordinate } from '../types/CartesianCoordinate';
import type { PolarCoordinate } from '../types/PolarCoordinate';



type PathElement = {
    name: string,
    color: string,
    sectionPath: string,
}

type TextElement = {
    x: number,
    y: number,
    textTransform: string,
    name: string,
}

type SectionResult = {
    path: PathElement,
    text: TextElement,
}

export function assembleOuterSectionResult(startAngle: number, radius: number, endAngle: number, color: string, name: string, depth: number): SectionResult {
    const sectionCoordinates = gatherCoordinatesForSection(radius, startAngle, endAngle, depth);
    const largeArcFlag = endAngle - startAngle > 180;
    const sectionPath = assemblePathFromCoordinates(sectionCoordinates, radius, depth, largeArcFlag);
    const path = {
        name,
        color,
        sectionPath
    }

    const textCoordinates = assembleTextCoordinatesFromSectionCoordinates(sectionCoordinates);
    const textTransform = assembleTextTransform(startAngle, endAngle, textCoordinates, name.length);
    const text = {
        x: textCoordinates.x,
        y: textCoordinates.y,
        textTransform,
        name
    }
    return { path, text }
}


type SectionCoordinates = {
    originCoordinate: CartesianCoordinate,
    startCoordinate: CartesianCoordinate,
    endCoordinate: CartesianCoordinate,
    innerEndCoordinate: CartesianCoordinate,
    innerStartCoordinate: CartesianCoordinate,
}

function gatherCoordinatesForSection(radius: number, startAngle: number, endAngle: number, depth: number): SectionCoordinates {
    const originCoordinate = { x: radius * 5, y: radius * 5 };
    let sectionCoordinates: SectionCoordinates = {
        originCoordinate,
        startCoordinate: polarToCartesian(originCoordinate, { radius, angleInDegrees: startAngle }, depth),
        endCoordinate: polarToCartesian(originCoordinate, { radius, angleInDegrees: endAngle }, depth),
        innerEndCoordinate: polarToCartesian(originCoordinate, { radius, angleInDegrees: endAngle }, depth - 1),
        innerStartCoordinate: polarToCartesian(originCoordinate, { radius, angleInDegrees: startAngle }, depth - 1),
    }
    return sectionCoordinates;
}

function assemblePathFromCoordinates(sectionCoordinates: SectionCoordinates, radius: number, depth: number, largeArcFlag: boolean) {
    const innerEndCoordinate = sectionCoordinates.innerEndCoordinate ?? { x: 0, y: 0 };
    const innerStartCoordinate = sectionCoordinates.innerStartCoordinate ?? { x: 0, y: 0 };
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

// REF: calculating the svg path ref: https://marian-caikovski.medium.com/drawing-sectors-and-pie-charts-with-svg-paths-b99b5b6bf7bd 
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

function assembleTextCoordinatesFromSectionCoordinates(sectionCoordinates: SectionCoordinates): CartesianCoordinate {
    const coordinates = [
        sectionCoordinates.startCoordinate,
        sectionCoordinates.endCoordinate,
        sectionCoordinates.innerEndCoordinate,
        sectionCoordinates.innerStartCoordinate
    ];

    return calculateAverageOfCoordinates(coordinates);
}

function calculateAverageOfCoordinates(coordinates: CartesianCoordinate[]): CartesianCoordinate {
    const averageX = coordinates.map((p) => p.x).reduce((a, b) => a + b) / coordinates.length;
    const averageY = coordinates.map((p) => p.y).reduce((a, b) => a + b) / coordinates.length;

    return { x: averageX, y: averageY };
}

function assembleTextTransform(startAngle: number, endAngle: number, coordinates: CartesianCoordinate, nameLength: number): string {
    const upsideDownText = endAngle > 180;
    let textTransform = `rotate(${(startAngle + endAngle) / 2 - 90}, ${coordinates.x}, ${coordinates.y
        })`;
    if (upsideDownText) {
        textTransform += ` rotate(180, ${coordinates.x}, ${coordinates.y})`;
    }
    // centers text inside section
    textTransform += `translate(${-nameLength / 2}, 1)`; 
    return textTransform;
}
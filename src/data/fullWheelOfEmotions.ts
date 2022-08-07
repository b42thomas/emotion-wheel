import type { Emotion } from "src/types/Emotion";
import happy from './happy';
import surprise from "./surprise";
import fear from "./fear";

export default [
    happy,
    surprise,
    fear,
    { name: 'Anger', color: 'red', childEmotions: [] },
    { name: 'Disgust', color: 'purple', childEmotions: [] },
    { name: 'Sad', color: 'blue', childEmotions: [] }
];
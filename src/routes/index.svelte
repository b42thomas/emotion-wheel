<script lang="ts">
	import Wheel2 from '../components/wheel2.svelte';
	import type { Emotion } from '../types/Emotion';

	let happy: Emotion = {
		name: 'Happy',
		color: 'green',
		childEmotions: [
			// { name: 'joyful', color: 'LightSeaGreen', childEmotions: [] },
			// { name: 'interested', color: 'lime', childEmotions: [] }
		]
	};

	let emotions: Emotion[] = [
		happy,
		{ name: 'Surprise', color: 'yellow', childEmotions: [] },
		{ name: 'Fear', color: 'orange', childEmotions: [] },
		{ name: 'Anger', color: 'red', childEmotions: [] },
		{ name: 'Disgust', color: 'purple', childEmotions: [] },
		{ name: 'Sad', color: 'blue', childEmotions: [] }
	];
</script>

<h1 data-test-id="page-header">Emotion Wheel</h1>

<Wheel2 {emotions} />

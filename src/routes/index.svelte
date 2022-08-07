<script lang="ts">
	import Wheel from '../components/wheel.svelte';
	import type { Emotion } from '../types/Emotion';
	import FullWheelOfEmotions from '../data/fullWheelOfEmotions';
	let happy: Emotion = {
		name: 'Happy',
		color: 'green',
		childEmotions: [
			{ name: 'joyful', color: 'LightSeaGreen', childEmotions: [
				{ name: 'liberated', color: 'pink', childEmotions: [
					{ name: 'Surprise', color: 'yellow', childEmotions: [] },
				]},
				{ name: 'estactic', color: 'coral', childEmotions: []}
			] },
			{ name: 'interested', color: 'lime', childEmotions: [] }
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

<Wheel emotions={FullWheelOfEmotions} />

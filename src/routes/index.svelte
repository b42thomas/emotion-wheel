<script lang="ts">
	import Wheel from '../components/wheel.svelte';
	import type { Emotion } from '../types/Emotion';

	let happy: Emotion = {
		name: 'Happy',
		color: 'green',
		specificEmotions: [
			{ name: 'joyful', color: 'green', specificEmotions: [] },
			{ name: 'interested', color: 'green', specificEmotions: [] }
		]
	};

	let emotions: Emotion[] = [
		happy,
		{ name: 'Surprise', color: 'yellow', specificEmotions: [] },
		{ name: 'Fear', color: 'orange', specificEmotions: [] },
		{ name: 'Anger', color: 'red', specificEmotions: [] },
		{ name: 'Disgust', color: 'purple', specificEmotions: [] },
		{ name: 'Sad', color: 'blue', specificEmotions: [] }
	];
</script>

<h1>Emotion Wheel</h1>

<Wheel {emotions} />

export default {
    name: 'Anger',
    color: 'red',
    childEmotions: [
        {
            name: 'hurt', color: 'salmon', childEmotions: [
                { name: 'devastated', color: 'lightsalmon', childEmotions: [] },
                { name: 'embarrassed', color: 'darksalmon', childEmotions: [] }
            ]
        },
        {
            name: 'threatened', color: 'lightcoral', childEmotions: [
                { name: 'jealous', color: 'indianred', childEmotions: [] },
                { name: 'insecure', color: 'crimson', childEmotions: [] }
            ]
        },
        {
            name: 'hateful', color: 'darkred', childEmotions: [
                { name: 'violated', color: 'firebrick', childEmotions: [] },
                { name: 'resentful', color: 'firebrick', childEmotions: [] }
            ]
        },
        {
            name: 'mad', color: 'salmon', childEmotions: [
                { name: 'enraged', color: 'lightsalmon', childEmotions: [] },
                { name: 'furious', color: 'darksalmon', childEmotions: [] }
            ]
        },
        {
            name: 'aggressive', color: 'crimson', childEmotions: [
                { name: 'provoked', color: 'firebrick', childEmotions: [] },
                { name: 'hostile', color: 'darkred', childEmotions: [] }
            ]
        },
        {
            name: 'frustrated', color: 'salmon', childEmotions: [
                { name: 'infuriated', color: 'lightsalmon', childEmotions: [] },
                { name: 'irritated', color: 'darksalmon', childEmotions: [] }
            ]
        },
        {
            name: 'distant', color: 'crimson', childEmotions: [
                { name: 'withdrawn', color: 'firebrick', childEmotions: [] },
                { name: 'suspicious', color: 'darkred', childEmotions: [] }
            ]
        },
        {
            name: 'critical', color: 'salmon', childEmotions: [
                { name: 'skeptical', color: 'lightsalmon', childEmotions: [] },
                { name: 'sarcastic', color: 'darksalmon', childEmotions: [] }
            ]
        },
    ]
};
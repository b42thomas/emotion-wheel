export default {
    name: 'Fear',
    color: 'orange',
    childEmotions: [
        {
            name: 'humiliated', color: 'coral', childEmotions: [
                { name: 'ridiculed', color: 'tomato', childEmotions: [] },
                { name: 'disrespected', color: 'orangered', childEmotions: [] }
            ]
        },
        {
            name: 'rejected', color: 'gold', childEmotions: [
                { name: 'alienated', color: 'orange', childEmotions: [] },
                { name: 'indequate', color: 'darkorange', childEmotions: [] }
            ]
        },
        {
            name: 'submissive', color: 'coral', childEmotions: [
                { name: 'insignificant', color: 'tomato', childEmotions: [] },
                { name: 'worthless', color: 'orangered', childEmotions: [] }
            ]
        },
        {
            name: 'insecure', color: 'gold', childEmotions: [
                { name: 'inferior', color: 'orange', childEmotions: [] },
                { name: 'inadequate', color: 'darkorange', childEmotions: [] }
            ]
        },
        {
            name: 'anxious', color: 'gold', childEmotions: [
                { name: 'worried', color: 'orange', childEmotions: [] },
                { name: 'overwhelmed', color: 'darkorange', childEmotions: [] }
            ]
        },
        {
            name: 'scared', color: 'coral', childEmotions: [
                { name: 'frightened', color: 'tomato', childEmotions: [] },
                { name: 'terrified', color: 'orangered', childEmotions: [] }
            ]
        },
    ]
};
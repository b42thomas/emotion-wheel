export default {
    name: 'Disgust',
    color: 'purple',
    childEmotions: [
        {
            name: 'disapproval', color: 'lavender', childEmotions: [
                { name: 'judgmental', color: 'thistle', childEmotions: [] },
                { name: 'loathing', color: 'plum', childEmotions: [] }
            ]
        },
        {
            name: 'disappointed', color: 'violet', childEmotions: [
                { name: 'repugnant', color: 'orchid', childEmotions: [] },
                { name: 'revolted', color: 'fuchsia', childEmotions: [] }
            ]
        },
        {
            name: 'awful', color: 'magenta', childEmotions: [
                { name: 'revulsion', color: 'mediumorchid', childEmotions: [] },
                { name: 'detestable', color: 'mediumpurple', childEmotions: [] }
            ]
        },
        {
            name: 'avoidance', color: 'blueviolet', childEmotions: [
                { name: 'aversion', color: 'darkviolet', childEmotions: [] },
                { name: 'hesitant', color: 'darkviolet', childEmotions: [] }
            ]
        },
        {
            name: 'anxious', color: 'darkmagenta', childEmotions: [
                { name: 'worried', color: 'indigo', childEmotions: [] },
                { name: 'overwhelmed', color: 'darkorchid', childEmotions: [] }
            ]
        },
    ]
};
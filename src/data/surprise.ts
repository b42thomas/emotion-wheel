
export default {
    name: 'Surprise',
    color: 'yellow',
    childEmotions: [
        {
            name: 'startled', color: 'lightyellow', childEmotions: [
                { name: 'shocked', color: 'lemonchiffon', childEmotions: [] },
                { name: 'dismayed', color: 'lightgoldenrodyellow', childEmotions: [] }
            ]
        },
        {
            name: 'confused', color: 'papayawhip', childEmotions: [
                { name: 'disillusioned', color: 'moccasin', childEmotions: [] },
                { name: 'perplexed', color: 'peachpuff', childEmotions: [] }
            ]
        },
        {
            name: 'amazed', color: 'palegoldenrod', childEmotions: [
                { name: 'astonished', color: 'khaki', childEmotions: [] },
                { name: 'awe', color: 'darkkhaki', childEmotions: [] }
            ]
        },
        {
            name: 'excited', color: 'yellow', childEmotions: [
                { name: 'eager', color: 'lightyellow', childEmotions: [] },
                { name: 'energetic', color: 'lemonchiffon', childEmotions: [] }
            ]
        },
    ]
};
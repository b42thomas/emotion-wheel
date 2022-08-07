export default {
    name: 'Fear',
    color: 'orange',
    childEmotions: [
        {
            name: 'humiliated', color: 'lightyellow', childEmotions: [
                { name: 'ridiculed', color: 'lemonchiffon', childEmotions: [] },
                { name: 'disrespected', color: 'lightgoldenrodyellow', childEmotions: [] }
            ]
        },
        {
            name: 'rejected', color: 'papayawhip', childEmotions: [
                { name: 'alienated', color: 'moccasin', childEmotions: [] },
                { name: 'indequate', color: 'peachpuff', childEmotions: [] }
            ]
        },
        {
            name: 'submissive', color: 'palegoldenrod', childEmotions: [
                { name: 'insignificant', color: 'khaki', childEmotions: [] },
                { name: 'worthless', color: 'darkkhaki', childEmotions: [] }
            ]
        },
        {
            name: 'insecure', color: 'yellow', childEmotions: [
                { name: 'inferior', color: 'lightyellow', childEmotions: [] },
                { name: 'inadequate', color: 'lemonchiffon', childEmotions: [] }
            ]
        },
        {
            name: 'anxious', color: 'palegoldenrod', childEmotions: [
                { name: 'worried', color: 'khaki', childEmotions: [] },
                { name: 'overwhelmed', color: 'darkkhaki', childEmotions: [] }
            ]
        },
        {
            name: 'scared', color: 'yellow', childEmotions: [
                { name: 'frightened', color: 'lightyellow', childEmotions: [] },
                { name: 'terrified', color: 'lemonchiffon', childEmotions: [] }
            ]
        },
    ]
};
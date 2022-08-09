export default {
    name: 'Sad',
    color: 'blue',
    childEmotions: [
        {
            name: 'guilty', color: 'powderblue', childEmotions: [
                { name: 'remorseful', color: 'lightblue', childEmotions: [] },
                { name: 'ashamed', color: 'lightskyblue', childEmotions: [] }
            ]
        },
        {
            name: 'abandoned', color: 'skyblue', childEmotions: [
                { name: 'ignored', color: 'deepskyblue', childEmotions: [] },
                { name: 'victimized', color: 'lightsteelblue', childEmotions: [] }
            ]
        },
        {
            name: 'despair', color: 'dodgerblue', childEmotions: [
                { name: 'powerless', color: 'cornflowerblue', childEmotions: [] },
                { name: 'vulnerable', color: 'steelblue', childEmotions: [] }
            ]
        },
        {
            name: 'depressed', color: 'royalblue', childEmotions: [
                { name: 'inferior', color: 'mediumblue', childEmotions: [] },
                { name: 'empty', color: 'darkblue', childEmotions: [] }
            ]
        },
        {
            name: 'lonely', color: 'deepskyblue', childEmotions: [
                { name: 'abandoned', color: 'dodgerblue', childEmotions: [] },
                { name: 'isolated', color: 'lightblue', childEmotions: [] }
            ]
        },
        {
            name: 'bored', color: 'navy', childEmotions: [
                { name: 'apathetic', color: 'midnightblue', childEmotions: [] },
                { name: 'indifferent', color: 'mediumslateblue', childEmotions: [] }
            ]
        },
    ]
};
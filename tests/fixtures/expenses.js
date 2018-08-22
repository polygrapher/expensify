import moment from 'moment';

export default [
    {
        id: '1',
        description: 'Game',
        amount: 10000,
        note: 'Note',
        createdAt: moment(0).valueOf()
    },
    {
        id: '2',
        description: 'Rent',
        amount: 100000,
        note: 'Note',
        createdAt: moment(0).subtract(10, 'days').valueOf()
    },
    {
        id: '3',
        description: 'Phone bill',
        amount: 500,
        note: 'Note',
        createdAt: moment(0).add('4', 'days').valueOf()
    }
];
import firebase from 'firebase';
import moment from 'moment';


 // Initialize Firebase
 var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKER,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const database = firebase.database();

export {firebase, database as default};

// const expenses = database.ref('expenses');
// expenses.on('child_removed', (snapshot) => {
//     console.log('Removing child: ', snapshot.val());
// });

// expenses.on('child_changed', (snapshot) => {
//     console.log('Updated child: ', snapshot.val());
// })
// expenses.on('value', (snapshot) => {
//     const formattedExpenses = [];
//     snapshot.forEach((childSnapshot) => {
//         formattedExpenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(formattedExpenses);
// }, (e) => {
//     console.log('Error while fetching data: ', e);
// });
// expenses.push({
//     description: 'Game',
//     amount: 10000,
//     note: 'Note',
//     createdAt: moment(0).valueOf()
// });
// expenses.push({
//     description: 'Rent',
//     amount: 100000,
//     note: 'Note',
//     createdAt: moment(0).subtract(10, 'days').valueOf()
// });
// expenses.push({
//     description: 'Phone bill',
//     amount: 500,
//     note: 'Note',
//     createdAt: moment(0).add('4', 'days').valueOf()
// });

// const dataFetcher = database.ref().on('value', (snapshot) => {
//     const {name, job, location} = snapshot.val();
//     console.log(`${name} is a ${job.title} at ${location.city}`);
// }, (e) => {
//     console.log('Error occurred while fetching data: ', e);
// });

//   firebase.database().ref().set({
//       name: 'Serhii Yehorov',
//       age: 30,
//       stressLevel: 6,
//       job: {
//           title: 'Software developer',
//           company: 'Google',
//       },
//       isSingle: false,
//       location: {
//           city: 'Lviv',
//           country: 'Ukraine'
//       }
//   }).then(() => {
//       console.log('Data was written succesfully');
//   }).catch((e) => {
//       console.log('Error ocurred', e);
//   });

//   firebase.database().ref('attributes').set({
//     height: 180,
//     weight: 71
//   }).then(() => {
//     console.log('Data was written succesfully');
//   }).catch((e) => {
//     console.log('Error ocurred', e);
//   });


// firebase.database().ref('isSingle').remove();

// firebase.database().ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// });
let functions = require('firebase-functions');
let admin = require('firebase-admin');
// admin.initializeApp();
admin.initializeApp(functions.config().firebase);

exports.newSubscriberNotification = functions.database.ref('/Orders/{id}').onWrite( async (snap: any) =>  {
        
    const data = snap.data.val();
    console.log(data);
    const userId = data.userId;
    const current = new Date();
    const date = data.DateDeLivration;
    // Notification content
    
    const payload = {
      notification: {
          title: 'New Subscriber',
          body: ` is following your content!`,
          icon: 'https://goo.gl/Fz9nrQ',
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    const tokens:any = [];

    // send a notification to each device token
    if (current == date) {
          devices.forEach( (result:any) => {
          const token = result.data().token;

          tokens.push( token )
        })
        console.log(tokens)
    }
    

    return admin.messaging().sendToDevice(tokens, payload)

});


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

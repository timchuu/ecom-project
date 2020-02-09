import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyB2u636u81CM-7icbV2ykqW3IiI-1dMrok",
    authDomain: "crwn-db-aa2da.firebaseapp.com",
    databaseURL: "https://crwn-db-aa2da.firebaseio.com",
    projectId: "crwn-db-aa2da",
    storageBucket: "crwn-db-aa2da.appspot.com",
    messagingSenderId: "756184346824",
    appId: "1:756184346824:web:5f5d4a2ca3eb17f5c4b5fd",
    measurementId: "G-JYB1VMS5GJ"
};

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);

        }
    }
    return userRef;
}




export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
'use strict';

const firebase = require('firebase-admin');

class Firebase {

    constructor(){
        //secure this with docker secrets
        let firebaseCredentials = require("config/docstack-7c152-firebase-adminsdk-xt7c3-ab911e86a9.json");

        if (firebase.apps.length === 0) {
            firebase.initializeApp({
              credential: firebase.credential.cert(firebaseCredentials),
              databaseURL: process.env.FIREBASE_DATABASE_URL
            });
        }

    }

    get firebase() {
        return firebase;
    }
}
module.exports = Firebase;

'use strict';

const firebase = require('firebase-admin');

class Firebase {

    constructor(){
        //secure this with docker secrets


        if (firebase.apps.length === 0) {
            const credentials = require("config/docstack-7c152-firebase-adminsdk-xt7c3-ab911e86a9.json");

            // var config = {
            //    apiKey: "AIzaSyAx1RTRKu0XFOwLBP-5wTZDttMx_HQRTKA",// process.env.FIREBASE_API_KEY,
            //    authDomain: "docstack-7c152.firebaseapp.com",// process.env.FIREBASE_AUTH_DOMAIN,
            //    databaseURL: process.env.FIREBASE_DATABASE_URL,
            //    storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL
            //  };

            //  firebase.initializeApp(config);
            // needs firebase-admin
            firebase.initializeApp({
              credential: firebase.credential.cert(credentials),
              databaseURL: process.env.FIREBASE_DATABASE_URL,
              storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL
            });
        }
    }

    get auth() {
        return firebase.auth;
    }

    get database() {
        if(!firebase.database){
            throw new Error('database not configured, check credentials');
        }
        return firebase.database;
    }

    get storage(){
        if(!firebase.storage){
            throw new Error('storage not configured, check credentials');
        }
        return firebase.storage;
    }
}
module.exports = Firebase;

'use strict';

require('rootpath')();
const firebase = require('firebase-admin');


class Firebase {

    constructor() {
        //secure this with docker secrets
        let firebaseCredentials = require("config/docstack-7c152-firebase-adminsdk-xt7c3-ab911e86a9.json");

        firebase.initializeApp({
          credential: firebase.credential.cert(firebaseCredentials),
          databaseURL: process.env.FIREBASE_DATABASE_URL
        });

        this.firebaseDbRef = firebase.database();
        let auth = firebase.auth(); // custom token from identity service later

        let client = auth.currentUser ? auth.currentUser.client : 0;
        this.refs = {
            //docs per client
            documents: this.firebaseDbRef.ref().child('documents/' + client)
        };
    }

    createDocument(newDocument) {
        let newDocID = this.refs.documents.push().key;
        return new Promise(function(resolve, reject){

            this.refs.documents
                .child(newDocID)
                .set(newDocument, function(){
                     return {id: newDocID};
                });
        });
    }
}

module.exports = Firebase;

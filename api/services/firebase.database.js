'use strict';

require('rootpath')();
const
    util = require('util'),
    FireBase = require('./firebase.base');

class FirebaseDatabase extends FireBase {
    constructor() {
        super();
        let auth = this.auth(); // custom token from identity service later

        //docs per client
        let client = auth.currentUser ? auth.currentUser.client : 0;

        let user = "andrei"; //get user
        let userpath = util.format('documents/%s/%s', client, user);
        this.refs = {
            documents: this.database().ref().child(userpath)
        };
    }

    createDocument(newDocument) {
        let newDocID = this.refs.documents.push().key;
        let self = this;
        return new Promise(function(resolve, reject) {
            self.refs.documents
                .child(newDocID)
                .set(newDocument, function(err) {
                    if(err) reject(err);

                    resolve({id: newDocID});
                });
        });
    }
}

module.exports = FirebaseDatabase;

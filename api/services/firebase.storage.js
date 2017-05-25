'use strict';

require('rootpath')();
const
    util = require('util'),
    FireBase = require('./firebase.base');

class FirebaseStorage extends FireBase {
    constructor() {
        super();
        let auth = this.auth(); // custom token from identity service later

        //docs per client
        let client = auth.currentUser ? auth.currentUser.client : 0;

        let user = "andrei"; //get user
        let userpath = util.format('files/%s/%s', client, user);
        this.refs = {
            files: this.storage().ref().child(userpath)
        };
    }

    uploadFile(file){
        Promise.resolve(file);
    }
}

module.exports = FirebaseStorage;

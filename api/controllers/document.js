'use strict';

const resp = require('./responses');

module.exports = {
    addNew : addNew,
    upload: upload
};

function addNew(req, res){
    var r = req.database
        .createDocument(req.body)
        .then((result)=> {
            res.status(200).send(result);
        })
        .catch(err => {
            req.log.error(err);
            res.status(500).send(resp.err.generic);
        });
}

function upload(req, res){
    console.info('formData', req.formData);
    console.info('formdata', req.formdata);
    console.info('form', req.form);
    var r = req.storage
        .uploadFile(req.formData)
        .then((result)=> {
            res.status(200).send(result);
        })
        .catch(err => {
            req.log.error(err);
            res.status(500).send(resp.err.generic);
        });
}

'use strict';

module.exports = {
    addNew : addNew
};

function addNew(req, res){
    var r = req.database
        .createDocument(req.body);
    res.send(r);
}

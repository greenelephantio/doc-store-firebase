'use strict';

module.exports = {
    addNew : addNew
};

function addNew(req, res){
    var r = req.database
        .createDocument(req.body)
        .then(res.send)
        .catch(() => {
            // console.info(err);
            res.status(500).send();
        })
}

'use strict';

module.exports = {
    addNew : addNew
};

function addNew(req, res){
    var r = req.database
        .createDocument(req.body)
        .then(res.send)
        .catch((err) => {
            console.error(err);
            res.status(500).send({message: "an error has occurred"});
        })
}

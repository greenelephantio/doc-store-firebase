'use strict';

module.exports = {
    healthcheck: healthcheck
};

function healthcheck(req, res){
    res.send({
        message: "I am alive"
    });
}

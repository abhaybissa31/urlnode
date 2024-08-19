const mongoose = require('mongoose');

async function condb(url){
    return mongoose.connect(url);
}

module.exports={
    condb,
};
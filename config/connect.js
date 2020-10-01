const mongoose = require("mongoose");
module.exports = mongoose.connect('mongodb+srv://miguel:miguel1011@bot.gmq5m.gcp.mongodb.net/akemi?retryWrites=true&w=majority', { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
    })
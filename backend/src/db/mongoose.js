// requiring mongoose
const mongoose = require('mongoose')

// database connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// notify when database is connected or not
mongoose.connection.once('open', () => {
    console.log('DB connected')
});
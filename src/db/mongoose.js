// requiring mongoose
const mongoose = require('mongoose');

// DB connect function
const connectDataBase = async (URL) => {

    try {
        // database connection
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }, () => console.log('Database Connected!'));
    } catch (error) {
        console.log('Error', error);
    }

};

await connectDataBase(process.env.MONGODB_URL);
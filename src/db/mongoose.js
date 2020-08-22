// requiring mongoose
const mongoose = require('mongoose');


// DB connect function
const connectDataBase = async ({ env: { MONGODB_URL: URL } }) => {

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

connectDataBase(process);
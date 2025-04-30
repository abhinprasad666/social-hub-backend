import { connect } from "mongoose";

//creating database connection

const dbConnected = async () => {
    try {
        await connect(process.env.DB_LOCAL_URL);
        console.log("<<< DB Connected >>>");
    } catch (error) {
        console.error(`Error in db connectet ${error}`);
        process.exit(1);
    }
};

export default dbConnected;

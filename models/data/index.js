const mongoose = require("mongoose");
const initdata = require("./data.js");   // same folder
const Listing = require("../models/listing.js");  // ek level upar

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function initDB() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    await Listing.deleteMany({});
    console.log("Deleted old listings");

    await Listing.insertMany(initdata.data);
    console.log("Inserted initial data");
}

initDB();

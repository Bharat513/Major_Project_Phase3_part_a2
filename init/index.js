const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to Database");
    })
    .catch((err) => {
        console.log(err);
    });


async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "659c0106339945844a40f6e7"}));
    await Listing.insertMany(initData.data);
    //initData apne app me ek obj h or apne ko data obtain karna h usse

    console.log("data was initialized");
};

initDB();
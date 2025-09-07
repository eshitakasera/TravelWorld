const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ListingSchema = new Schema({
    title: String,
    description: String,
    image: {
        filename: String,
        url: String
    },
    price: Number,
    location: String,
    country: String
});
const Listing =mongoose.model("listing",ListingSchema);
module.exports=Listing;
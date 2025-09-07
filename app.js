const express=require("express");
const mongoose = require("mongoose");
const app = express();
const ejsMate = require("ejs-mate");
// ejs-mate ko template engine bana rahe hain
app.engine("ejs", ejsMate);
const path = require("path");
app.use(express.static(path.join(__dirname,"models","public")));
const Listing = require("./models/models/listing.js"); 
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "models","views"));//cz models k ander views me hai
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    console.log(allListings);
    res.render("index", { allListings });//agr views k ander bhi koi folderr hota to vo render me likhte
});
app.get("/listings/new",async (req,res)=>{
    res.render("new");
});
app.get("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  const listing=await  Listing.findById(id);
  res.render("show",{listing});
});
app.post("/listings:id",async (req,res)=>{
  let listing=req.body.listing;
  console.log(listing);
  const newListing=new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");

});
app.delete("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  const deletelisting=await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});
main()
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

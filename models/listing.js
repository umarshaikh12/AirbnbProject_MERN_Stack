const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,   // raw address entered by user
  country: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"], // GeoJSON type
      required: true,
      default: "Point"
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
      default: [72.8777, 19.0760] // fallback Mumbai
    }
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model("Listing", listingSchema);

const Listing = require("../models/listing");
const axios = require("axios");

// Show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// Render new form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show single listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", {
    listing,
    maptilerKey: process.env.MAP_TOKEN, // pass token
  });
};

// Create listing with geocoding
module.exports.createListing = async (req, res, next) => {
  try {
    let url = req.file.path;
    let fileName = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, fileName };

    // 🔹 Geocode location using MapTiler
    const maptilerKey = process.env.MAP_TOKEN;
    const address = req.body.listing.location;

    const geoRes = await axios.get(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${maptilerKey}`
    );

    if (geoRes.data.features.length > 0) {
      const coords = geoRes.data.features[0].geometry.coordinates; // [lng, lat]
      newListing.geometry = {
        type: "Point",
        coordinates: coords,
      };
    }

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    next(err);
  }
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update listing with geocoding
module.exports.updateListing = async (req, res, next) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

    // If user updated the location, re-geocode
    if (req.body.listing.location) {
      const maptilerKey = process.env.MAP_TOKEN;
      const geoRes = await axios.get(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(req.body.listing.location)}.json?key=${maptilerKey}`
      );

      if (geoRes.data.features.length > 0) {
        const coords = geoRes.data.features[0].geometry.coordinates;
        listing.geometry = {
          type: "Point",
          coordinates: coords,
        };
      }
    }

    // Handle image update
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let fileName = req.file.filename;
      listing.image = { url, fileName };
    }

    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};

// Delete listing
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

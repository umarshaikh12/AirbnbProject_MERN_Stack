const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReivew = new Review(req.body.review);
  newReivew.author = req.user._id;
  listing.reviews.push(newReivew);
  await newReivew.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};

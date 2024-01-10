const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const listingController = require("../controllers/listings.js");


router
.route("/")
.get(wrapAsync(listingController.index))
// .post(isloggedIn, validateListing, wrapAsync(listingController.createListing));
.post(upload.single('listing[image]'),(req, res) => {
    res.send(req.file);
});

//New Route
router.get("/new", isloggedIn, wrapAsync(listingController.renderNewForm));


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isloggedIn, isOwner, validateListing,  wrapAsync(listingController.updateListing))
.delete(isloggedIn, isOwner, wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;
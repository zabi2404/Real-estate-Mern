import Listing from "../models/Listing_model.js"
import { errorHnadle } from "../utils/error.js"

export const listing = async (req, res, next) => {
    try {

        const listing = await Listing.create(req.body)
        res.status(200).json(listing)
    } catch (error) {
        next(errorHnadle(404, "not found"))
    }
}

export const DeleteListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id)


    if (!listing) { return next(errorHnadle(401, "listing not found")) }


    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("listing del")
    } catch (error) {
        next(error)
    }


}



export const UpdateListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id)

    if (!listing) { return next(errorHnadle(404, "listing not found")) }

    if (listing.userRef !== req.user.id) {
        next(errorHnadle(401, "you can only update your listing"))
    }

    try {
        const UpdateListing = await Listing.findByIdAndUpdate(req.params.id,
            req.body, { new: true })
        res.status(200).json(UpdateListing)

    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res, next) => {

    try {

        const listing = await Listing.findById(req.params.id)
        if (!listing) { next(errorHnadle(404, "listing not found")) }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }


}

export const getListings = async (req, res, next) => {

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;

        
        let offer = req.query.offer;
         if (offer === "false" || offer === undefined) {
            offer = { $in: [false, true] }
        }

        let furnished = req.query.furnished;
        if (furnished === "false" || furnished === undefined) {
            furnished = { $in: [false, true] }
        }

        let parking = req.query.parking;
        if (parking === "false" || parking === undefined) {
            parking = { $in: [false, true] }
        }

        let type = req.query.type;
        if (type === "all" || type === undefined) {
            type = { $in: ['sell', 'rent'] } /// either sale or rent search for both
        }

        const searchTerm = req.query.searchTerm || "";

        const sort = req.query.sort || 'createdAt'

        const order = req.query.order || 'desc'

        const listing = await Listing.find(
            {
                name: { $regex: searchTerm, $options: 'i' },
                offer,
                furnished,
                parking,
                type,

            }).sort({ [sort]: order }) //sort can be anything like created at regular price discount and that have two options asc desc 
                                        // "asc" → ascending (smallest → largest / oldest → newest / A → Z).
                                        // "desc" → descending (largest → smallest / newest → oldest / Z → A).
            .limit(limit)
            .skip(startIndex);

            res.status(200).json(listing)

    } catch (error) {
        next(error)
    }
}
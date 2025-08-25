import mongoose from "mongoose";


const listingSchema = new mongoose.Schema(

    {
        name:{
            type:String,
            required:true,

        },
        description:{
            type:String,
            required:true,
        },   
        address:{
            type:String,
            required:true,

        },
        regularPrice:{
            type:String,
            required:true,
        },
        discountedPrice:{
            type:String,
            required:true,
        },
        bathroom:{
            type:String,
            required:true,
        },
        bedroom:{
            type:String,
            required:true,
        },
        furnished:{
            type:Boolean,
            required:true,
        },
        parking:{
            type:Boolean,
            required:true,
        },
        offer:{
            type:Boolean,
            required:true,
        },
        type:{
            type:String,
            required:true,
        },
        ImageUrl:{
            type:Array,
            required:true
        },
        userRef:{
            type:String,
            required:true,
        }
    },{timestamps:true}
)

const Listing = mongoose.model("Listing",listingSchema)

export default Listing;  
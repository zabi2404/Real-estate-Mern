import express from 'express'
import { listing,DeleteListing,UpdateListing,getListing ,getListings} from '../controllers/listingController.js';
import { verfiyToken } from '../utils/verfiyUser.js';



const Routes = express.Router();

Routes.post('/create',verfiyToken,listing);
Routes.delete('/delete/:id',verfiyToken,DeleteListing);
Routes.put('/update/:id',verfiyToken,UpdateListing);
Routes.get('/get/:id',getListing);
Routes.get('/get',getListings)


export default Routes;
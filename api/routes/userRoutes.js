import express from "express";
import   { deleteUpdate, test, userUpdate ,getListings,getUser }  from "../controllers/UserControllers.js";
import { verfiyToken } from "../utils/verfiyUser.js";
import { signout } from "../controllers/authController.js";


const Routes = express.Router();

Routes.get('/' ,test) 
Routes.post('/update/:id',verfiyToken ,  userUpdate)
Routes.delete('/delete/:id',verfiyToken ,  deleteUpdate)
Routes.get('/signout' ,signout) 
Routes.get('/listings/:id',verfiyToken ,getListings) 
Routes.get('/:id',verfiyToken,getUser)
export default Routes;


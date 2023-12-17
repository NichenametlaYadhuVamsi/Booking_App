import express from "express"
import { Hotel } from "../models/hotels.js"
import { ErrorHandler } from "../MiddleWare/ErrorHandler.js"
import { Create_Hotel, DeleteHotel, GetAll, GetHotel, UpdateHotel } from "../Controller.js/hotel.js"
import { IsAdmin, isAuthenticated } from "../MiddleWare/Authent.js"
const router=express.Router()

router.post("/",isAuthenticated,IsAdmin,Create_Hotel)

router.put("/:id",isAuthenticated,IsAdmin,UpdateHotel)

router.delete("/:id",isAuthenticated,IsAdmin,DeleteHotel)

router.get("/all",GetAll)
router.get("/:id",GetHotel)

export default router

import express from "express"
// import { Hotel } from "../models/hotels.js"
// import { ErrorHandler } from "../MiddleWare/ErrorHandler.js"
// import { Create_Hotel, DeleteHotel, GetAll, GetHotel, UpdateHotel } from "../Controller.js/hotel.js"
import { IsAdmin, isAuthenticated } from "../MiddleWare/Authent.js"
import { Create_Room, DeleteRoom, GeTAllRoomsOFAhOTEL, GetAllRooms, GetRooms, UpdateRoom, UpdateRoomAvailabilty } from "../Controller.js/rooms.js"
const router=express.Router()

router.post("/:hotelId",isAuthenticated,IsAdmin,Create_Room)

router.put("/:id",isAuthenticated,IsAdmin,UpdateRoom)
router.put("/roomupdate/:id/:roomId",UpdateRoomAvailabilty)

router.delete("/:hotelId/:id",isAuthenticated,IsAdmin,DeleteRoom)
router.get("/all",GetAllRooms)
router.get("/hotel/:hotelId",GeTAllRoomsOFAhOTEL)
router.get("/:id",GetRooms)

export default router

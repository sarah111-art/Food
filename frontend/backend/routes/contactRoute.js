import express from 'express'
import { contactAdmin, getAllContacts } from '../controllers/contactController.js'
import adminAuth from '../middleware/adminAuth.js'

const contactRoute = express.Router()
contactRoute.post('/', contactAdmin)
contactRoute.get('/all', getAllContacts) 
export default contactRoute
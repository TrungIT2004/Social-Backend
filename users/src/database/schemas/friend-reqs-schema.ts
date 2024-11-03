import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'


const friendReqSchema = new mongoose.Schema({
    requestid: {
        type: String,
        required: true,
        default: uuidv4()
    },
    senderid: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
        required: true
    },
    receiverid: {
        type: String,
        required: true,
    },
    receiverName: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const friendReqModel = mongoose.model('friendReq', friendReqSchema)

export default friendReqModel

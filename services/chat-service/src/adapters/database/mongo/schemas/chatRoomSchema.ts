import mongoose, { Schema } from 'mongoose';
import { IChatroom } from '../../../../entities/chatRoomEntities';

const ChatRoomSchema: Schema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            required: true
        }
    ],
}, {
    timestamps: true
});

const ChatRoomCollection = mongoose.model<IChatroom>('chatrooms', ChatRoomSchema);

export default ChatRoomCollection;

export interface ChatRoomDocument extends IChatroom {
    createdAt: Date;
    updatedAt: Date;
}
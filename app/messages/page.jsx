import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/db";
import Message from "@/models/Message";
import '@/models/Property';
import { converToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";

const MessagesPage = async () => {
    await connectDB();

    const sessionUser = await getSessionUser();

    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, read: true })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    const unreadMessages = await Message.find({ recipient: userId, read: false })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
        const message = converToSerializableObject(messageDoc);
        message.sender = converToSerializableObject(messageDoc.sender);
        message.property = converToSerializableObject(messageDoc.property);
        return message;
    });

    return (<section className="bg-blue-50">
        <div className="container m-auto py-24 max-w-6xl">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

                <div className="space-y-4">
                    {messages.length === 0 ? (<p>You have no messages</p>) : (
                        messages.map((message) => (
                            <MessageCard key={message._id} message={message} />
                        ))
                    )}
                </div>
            </div>
        </div>
    </section>);
}

export default MessagesPage;
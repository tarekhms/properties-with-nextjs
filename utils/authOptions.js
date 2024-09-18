import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/db';
import User from '@/models/User';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    acess_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    callbacks: {
        // Invoked on successful sign in
        async signIn({ profile }) {
            // 1. Connect to the database
            await connectDB();
            // 2. Check if user exists
            const userExists = await User.findOne({ email: profile.email });
            // 3. If not, create user
            if (!userExists) {
                // Truncate username if too long
                const username = profile.name.slice(0, 20);

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }
            // 4. Return true to allow sign in
            return true;
        },
        // Session callback function that modifies the session object
        async session({ session }) {
            await connectDB();
            // 1. Get user from database
            const user = await User.findOne({ email: session.user.email });
            // 2. Assign user id  from the session
            session.user.id = user._id.toString();
            // 3. Return session
            return session;
        },
    },
};
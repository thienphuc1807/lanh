export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
                token.name = user.username;
                token.fullName = user.fullName;
                token.email = user.email;
                token.phoneNumber = user.phoneNumber;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
                session.user.name = token.name;
                session.user.fullName = token.fullName;
                session.user.email = token.email;
                session.user.phoneNumber = token.phoneNumber;
            }
            return session;
        },
        authorized({
            auth,
            request,
        }: {
            auth: any;
            request: { nextUrl?: any };
        }) {
            const user = auth?.user;
            const isOnAdminPanel =
                request.nextUrl?.pathname.startsWith("/dashboard");
            const isOnCheckOutPage =
                request.nextUrl?.pathname.startsWith("/checkout");
            const isOnLoginPage =
                request.nextUrl?.pathname.startsWith("/login");
            // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
            if (isOnAdminPanel && !user?.isAdmin) {
                return false;
            }
            // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
            if (isOnCheckOutPage && !user) {
                return false;
            }
            // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
            if (isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl));
            }
            return true;
        },
    },
};

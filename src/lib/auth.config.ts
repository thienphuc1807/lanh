export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user._id;
                token.isAdmin = user.isAdmin;
                token.fullName = user.fullName;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
                session.user.fullName = token.fullName;
                session.user.email = token.email;
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
            const isOnOrdersPage =
                request.nextUrl?.pathname.startsWith("/orders");
            // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
            if (isOnAdminPanel && !user?.isAdmin) {
                return false;
            }
            // ONLY AUTHENTICATED USERS CAN REACH THE CHECKOUT PAGE
            if (isOnCheckOutPage && !user) {
                return false;
            }
            // ONLY AUTHENTICATED USERS CAN REACH THE ORDERS PAGE
            if (isOnOrdersPage && !user) {
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

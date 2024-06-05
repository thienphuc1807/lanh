export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            // console.log("This is user", user);
            // console.log("This is token", token);

            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
                token.name = user.username;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
                session.user.name = token.name;
            }
            console.log("this is token session >>>", session);

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
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
            const isOnLoginPage =
                request.nextUrl?.pathname.startsWith("/login");
            // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
            if (isOnAdminPanel && !user?.isAdmin) {
                return false;
            }
            // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
            if (isOnBlogPage && !user) {
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

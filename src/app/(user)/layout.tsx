import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import StoreProvider from "../Redux/StoreProvider";
import { Suspense } from "react";
import Loading from "@/components/loading";

const montserrat = Montserrat({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Lành",
        template: "%s Lành",
    },
    description: "Ăn lành website",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={montserrat.className}>
                <StoreProvider>
                    <Header />
                    <div className="pb-5">
                        <Suspense fallback={<Loading />}>{children}</Suspense>
                    </div>
                    <Footer />
                </StoreProvider>
            </body>
        </html>
    );
}

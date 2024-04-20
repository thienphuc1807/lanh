import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Lành Dashboard",
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
            <body className={`${montserrat.className} relative min-h-screen`}>
                <Sidebar>{children}</Sidebar>
            </body>
        </html>
    );
}

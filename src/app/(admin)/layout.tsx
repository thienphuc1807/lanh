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
        <html lang="en">
            <body className={montserrat.className}>
                <div className="flex min-h-screen">
                    <Sidebar />
                    <div className="flex-1">{children}</div>
                </div>
            </body>
        </html>
    );
}

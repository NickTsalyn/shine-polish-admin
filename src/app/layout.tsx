import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../styles/globals.css";
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header/Header";
import { AuthProvider } from "@/components/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NotificationsProvider from "@/components/NotificationsProvider";

const lato = Lato({
	subsets: ["latin"],
	weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "Shine&Polish",
	description: "Cleaning service Atlanta",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html lang="en">
				<body className={lato.className}>
					<NotificationsProvider>
						<Header />
						<Sidebar />
						<ProtectedRoute>
							<main className="lg:ml-[200px] xl:ml-[244px]">{children}</main>
						</ProtectedRoute>
					</NotificationsProvider>
				</body>
			</html>
		</AuthProvider>
	);
}


"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/context/chat/provider";
import { Sidebar } from '../components/ui/sidebar';
import "@/app/globals.css";  
import { FiltersProvider } from "@/context/filter/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         
      >
        <ChatProvider>
          <FiltersProvider>
          <div className="w-full h-screen flex flex-row dark:bg-zinc-800">
            
            {children}
          </div>
          </FiltersProvider>
         
        </ChatProvider>
       
      </body>
    </html>
  );
}
// "use client"
// import "./globals.css";
// import { ChatProvider } from "@/context/chat/provider";
// import { Sidebar } from '../components/ui/sidebar';
// import localFont from 'next/font/local'

// const geistSans = localFont({
//   src: '../public/fonts/Geist.woff2',
//   variable: "--font-geist-sans"
// });

// const geistMono = localFont({
//   src: '../public/fonts/GeistMono.woff2',
//   variable: "--font-geist-mono"
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <ChatProvider>
//           <div className="w-full h-screen flex flex-row">
//             <Sidebar/>
//             {children}
//           </div>
//         </ChatProvider>
//       </body>
//     </html>
//   );
// }
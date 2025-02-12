// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import Nav from "@/components/Nav";


// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Blog Application",
//   description: "Blog application using sanity.io",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <Nav />
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }






import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import { SavedItemsProvider } from "@/context/SavedItems";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SavedItemsProvider>
            <Nav />
            {children}
          </SavedItemsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

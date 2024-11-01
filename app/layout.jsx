
import "./globals.css";
import SessionProvider from './context/Authcontext'
import { UserProvider } from "./context/Usecontext";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       
    <SessionProvider>
      <UserProvider>
       {children}
       </UserProvider>
        
   </SessionProvider>
     
     
       
      </body>
    </html>
  );
}

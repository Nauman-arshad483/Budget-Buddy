 import "@styles/globals.css";

 import Navbar from "@components/Navbar"
export const metadata = {
  title: "Budget Buddy",
  description: "users will manage expenses",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          <Navbar/>
          {children}
          
          </main>
      </body>
    </html>
  );
};

export default RootLayout;

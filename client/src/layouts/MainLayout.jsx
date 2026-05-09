import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="bg-gray-950 text-white px-8 py-5 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-orange-500">
        SmartDine
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>

        <Link to="/menu">Menu</Link>

        <Link
          to="/cart"
          className="relative"
        >
          Cart

          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full absolute -top-3 -right-5">
            {cartItems.length}
          </span>
        </Link>

        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
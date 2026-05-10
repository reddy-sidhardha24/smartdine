import { useEffect, useState, useContext } from "react";
import { getMenu } from "../api/menuApi";
import { CartContext } from "../context/CartContext";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu();
        setMenuItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Our Menu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-2">
              {item.name}
            </h2>

            <p className="text-gray-400 mb-3">
              {item.description}
            </p>

            <p className="text-orange-400 font-semibold">
              ₹{item.price}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {item.category}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg mt-4 w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {

  const [menuItems, setMenuItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  // FETCH MENU
  const fetchMenu = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/menu"
      );

      setMenuItems(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD ITEM
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/menu",
        formData
      );

      alert("Menu item added");

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });

      fetchMenu();

    } catch (error) {

      console.log(error);

      alert("Failed to add item");
    }
  };

  // DELETE ITEM
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/menu/${id}`
      );

      alert("Item deleted");

      fetchMenu();

    } catch (error) {

      console.log(error);

      alert("Failed to delete item");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Admin Panel
      </h1>

      {/* ADD FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl mb-10 space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded font-bold"
        >
          Add Menu Item
        </button>

      </form>

      {/* MENU ITEMS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 p-5 rounded-xl"
          >

            <h2 className="text-2xl font-bold mb-2">
              {item.name}
            </h2>

            <p className="text-gray-400 mb-2">
              {item.description}
            </p>

            <p className="text-yellow-400 mb-2">
              ₹{item.price}
            </p>

            <p className="text-sm mb-4">
              {item.category}
            </p>

            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Admin;
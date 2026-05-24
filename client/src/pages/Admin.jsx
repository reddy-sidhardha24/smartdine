import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
import { toast } from "react-toastify";

const Admin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] =
    useState(false);

  const initialForm = {
    name: "",
    category: "",
    price: "",
    restaurant_name: "",
    delivery_time: "",
    rating: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] =
    useState(initialForm);

  // FETCH MENU

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu");
      setMenuItems(res.data);
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to fetch menu"
      );
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // HANDLE INPUT

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // IMAGE UPLOAD

  const handleImageUpload =
    async (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      setUploading(true);

      const data =
        new FormData();

      data.append("file", file);
      data.append(
        "upload_preset",
        "smartdine_upload"
      );

      try {
        const res =
          await axios.post(
            "https://api.cloudinary.com/v1_1/dcgvza4bu/image/upload",
            data
          );

        setFormData((prev) => ({
          ...prev,
          image:
            res.data.secure_url,
        }));

        toast.success(
          "Image uploaded successfully"
        );
      } catch (error) {
        console.log(error);
        toast.error(
          "Image upload failed"
        );
      } finally {
        setUploading(false);
      }
    };

  // ADD FOOD

  const handleAddFood =
    async (e) => {
      e.preventDefault();

      if (!formData.image) {
        toast.error(
          "Upload image first"
        );
        return;
      }

      try {
        await api.post(
          "/menu",
          formData
        );

        toast.success(
          "Food item added successfully"
        );

        setFormData(
          initialForm
        );

        fetchMenu();
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to add food item"
        );
      }
    };

  // DELETE FOOD

  const handleDelete =
    async (id) => {
      try {
        await api.delete(
          `/menu/${id}`
        );

        toast.success(
          "Food item deleted"
        );

        fetchMenu();
      } catch (error) {
        console.log(error);
        toast.error(
          "Delete failed"
        );
      }
    };

  // EDIT FOOD

  const handleEdit = (
    item
  ) => {
    setEditId(item.id);

    setFormData({
      name:
        item.name || "",
      category:
        item.category || "",
      price:
        item.price || "",
      restaurant_name:
        item.restaurant_name ||
        "",
      delivery_time:
        item.delivery_time ||
        "",
      rating:
        item.rating || "",
      description:
        item.description ||
        "",
      image:
        item.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UPDATE FOOD

  const handleUpdateFood =
    async (e) => {
      e.preventDefault();

      try {
        await api.put(
          `/menu/${editId}`,
          formData
        );

        toast.success(
          "Food updated successfully"
        );

        setEditId(null);

        setFormData(
          initialForm
        );

        fetchMenu();
      } catch (error) {
        console.log(error);
        toast.error(
          "Update failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-14">
      <h1 className="text-5xl font-extrabold text-yellow-400 text-center mb-14">
        SmartDine Admin Panel
      </h1>

      {/* FORM */}

      <form
        onSubmit={
          editId
            ? handleUpdateFood
            : handleAddFood
        }
        className="bg-slate-900 border border-slate-800 rounded-3xl p-10 mb-20 shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-yellow-400 mb-10">
          {editId
            ? "Edit Food Item"
            : "Add New Food Item"}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={
              handleChange
            }
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={
              handleChange
            }
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            name="restaurant_name"
            placeholder="Restaurant Name"
            value={
              formData.restaurant_name
            }
            onChange={
              handleChange
            }
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            name="delivery_time"
            placeholder="Delivery Time"
            value={
              formData.delivery_time
            }
            onChange={
              handleChange
            }
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={
              formData.rating
            }
            onChange={
              handleChange
            }
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          rows="5"
          className="w-full mt-8 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
          required
        />

        <div className="mt-8">
          <label className="block mb-3 text-lg font-semibold text-yellow-400">
            Upload Food Image
          </label>

          <input
            type="file"
            onChange={
              handleImageUpload
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
          />
        </div>

        {formData.image && (
          <img
            src={
              formData.image
            }
            alt="Food"
            className="w-40 h-40 object-cover rounded-2xl mt-6 border border-slate-700"
          />
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full mt-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl text-xl disabled:opacity-50"
        >
          {uploading
            ? "Uploading Image..."
            : editId
            ? "Update Food Item"
            : "Add Food Item"}
        </button>
      </form>

      {/* MENU */}

      <h2 className="text-4xl font-bold text-yellow-400 mb-10">
        Manage Menu
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {menuItems.map(
          (item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={
                  item.image
                }
                alt={
                  item.name
                }
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">
                  {item.name}
                </h3>

                <p className="text-gray-400 mb-3">
                  {
                    item.restaurant_name
                  }
                </p>

                <p className="text-yellow-400 text-2xl font-bold mb-4">
                  ₹
                  {item.price}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      handleEdit(
                        item
                      )
                    }
                    className="flex-1 bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-bold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        item.id
                      )
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Admin;
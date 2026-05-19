import { useEffect, useState } from "react";

import axios from "axios";

import api from "../api/axios";

import { toast } from "react-toastify";

const Admin = () => {

  // STATES

  const [menuItems, setMenuItems] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      price: "",
      category: "",
      restaurant: "",
      deliverytime: "",
      rating: "",
      description: "",
      image: "",
    });

  // FETCH MENU

  const fetchMenu = async () => {

    try {

      const res =
        await api.get("/menu");

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

  // HANDLE INPUT CHANGE

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

      const data =
        new FormData();

      data.append(
        "file",
        file
      );

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

        setFormData({
          ...formData,
          image:
            res.data.secure_url,
        });

        toast.success(
          "Image uploaded successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Image upload failed"
        );

      }

    };

  // ADD FOOD

  const handleAddFood =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/menu",
          formData
        );

        toast.success(
          "Food item added successfully"
        );

        // RESET FORM

        setFormData({
          name: "",
          price: "",
          category: "",
          restaurant: "",
          deliverytime: "",
          rating: "",
          description: "",
          image: "",
        });

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
      name: item.name,
      price: item.price,
      category: item.category,
      restaurant:
        item.restaurant,
      deliverytime:
        item.deliverytime,
      rating: item.rating,
      description:
        item.description,
      image: item.image,
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

        setFormData({
          name: "",
          price: "",
          category: "",
          restaurant: "",
          deliverytime: "",
          rating: "",
          description: "",
          image: "",
        });

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

      {/* TITLE */}

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

          {/* FOOD NAME */}

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

          {/* PRICE */}

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

          {/* CATEGORY */}

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={
              handleChange
            }
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          {/* RESTAURANT */}

          <input
            type="text"
            name="restaurant"
            placeholder="Restaurant Name"
            value={
              formData.restaurant
            }
            onChange={
              handleChange
            }
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          {/* DELIVERY TIME */}

          <input
            type="text"
            name="deliverytime"
            placeholder="Delivery Time"
            value={
              formData.deliverytime
            }
            onChange={
              handleChange
            }
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          {/* RATING */}

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

        {/* DESCRIPTION */}

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

        {/* IMAGE */}

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

        {/* IMAGE PREVIEW */}

        {formData.image && (

          <img
            src={formData.image}
            alt="Food"
            className="w-40 h-40 object-cover rounded-2xl mt-6 border border-slate-700"
          />

        )}

        {/* BUTTON */}

        <button
          type="submit"
          className="w-full mt-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl text-xl transition duration-300"
        >

          {editId
            ? "Update Food Item"
            : "Add Food Item"}

        </button>

      </form>

      {/* MENU ITEMS */}

      <div>

        <h2 className="text-4xl font-bold text-yellow-400 mb-10">

          Manage Menu

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {menuItems.map((item) => (

            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            >

              {/* IMAGE */}

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              {/* CONTENT */}

              <div className="p-6">

                <h3 className="text-3xl font-bold mb-2">

                  {item.name}

                </h3>

                <p className="text-gray-400 mb-3">

                  {item.restaurant}

                </p>

                <p className="text-yellow-400 text-2xl font-bold mb-4">

                  ₹{item.price}

                </p>

                {/* BUTTONS */}

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                    className="flex-1 bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-bold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default Admin;
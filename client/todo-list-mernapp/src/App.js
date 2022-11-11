import React, { useEffect, useState } from "react";
import axios from "axios";
// import './App.css';

function App() {
  const [itemText, setItemText] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");
  const [isUpdating, setIsUpdating] = useState("");
  const [listItems, setListItems] = useState([]);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/item", {
        item: itemText,
      });
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (error) {
      console.log(error);
    }
  };

  //Create function to fetch all todo items from database -- we will use useEffect hook
  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/items");
        setListItems(res.data);
        console.log("render");
      } catch (error) {
        console.log(error);
      }
    };
    getItemList();
  }, []);

  //Delete item when click on delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (error) {
      console.log(error);
    }
  };

  //Update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
      setUpdateItemText("");
      setIsUpdating("");
    } catch (error) {
      console.log(error);
    }
  };

  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form
      className="flex flex-row justify-between w-full"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="items-center w-96 text-left space-x-3 px-4 h-12 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg bg-slate-50 ring-0 text-slate-800 highlight-white/5 hover:bg-slate-100"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <button
        className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-24 bg-sky-500 highlight-white/20 hover:bg-sky-400"
        type="submit"
      >
        Update
      </button>
    </form>
  );

  return (
    <div className="flex justify-center my-36">
      <div className="max-w-3xl h-auto shadow-2xl rounded-xl backdrop-blur-md bg-white/30 w-1/2 p-10">
        <div className="flex flex-col">
          <h1 class="text-6xl font-extrabold text-center mb-4">
            <span class="bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 to-cyan-500">
              Todo List
            </span>
          </h1>
          <div className="flex mt-3 justify-between border-b-2 border-b-slate-400 p-2">
            <form
              className="flex flex-row w-full justify-between"
              onSubmit={(e) => addItem(e)}
            >
              <input
                className="items-center w-96 text-left space-x-3 px-4 h-12 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg bg-slate-50 ring-0 text-slate-800 highlight-white/5 hover:bg-slate-100"
                type="text"
                placeholder="Add Todo Item"
                onChange={(e) => {
                  setItemText(e.target.value);
                }}
                value={itemText}
              />
              <button
                className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-24 bg-sky-500 highlight-white/20 hover:bg-sky-400"
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
          <div className="flex flex-col mt-5">
            <ul className="flex flex-col justify-between">
              {listItems.map((item) => (
                <li
                  className="flex mt-3 justify-between border-b-2 border-b-slate-400 p-2"
                  key={item._id}
                >
                  {isUpdating === item._id ? (
                    renderUpdateForm()
                  ) : (
                    <>
                      <p className="py-3 align-middle ">{item.item}</p>
                      <div className="flex">
                        <button
                          className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-24 bg-sky-500 highlight-white/20 hover:bg-sky-400"
                          onClick={() => {
                            setIsUpdating(item._id);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 ml-3 rounded-lg w-full flex items-center justify-center sm:w-24 bg-sky-500 highlight-white/20 hover:bg-sky-400"
                          onClick={() => {
                            deleteItem(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

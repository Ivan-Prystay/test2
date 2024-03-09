import React, { useEffect, useState } from "react";
import { Drag } from "..";

interface Product {
  _id: string;
  shopName?: string;
  quantity: number;
  productName: string;
}

export interface Order {
  name: string;
  email: string;
  phone: string;
  address: string;
  products: Product[];
  totalPrice: number;
  createdAt: Date;
}

function Cart() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("selectedDrag");
      setStorageDrags(storage);
      const parsed = storage ? JSON.parse(storage) : [];
      setDragsParsed(parsed);
    }
  }, []);

  const initialOrder: Order = {
    name: "",
    email: "",
    phone: "",
    address: "",
    products: [],
    totalPrice: 0,
    createdAt: new Date(),
  };

  const [storageDrags, setStorageDrags] = useState<string | null>(null);

  const [dragsParsed, setDragsParsed] = useState([]);

  const [order, setOrder] = useState<Order>(initialOrder);
  const [inputValues, setInputValues] = useState<Product[]>([]);


  const totalPrice = dragsParsed.reduce((total, item: Drag) => {
    const product = inputValues.find(
      (product: Product) => product._id === item._id
    );
    const itemQuantity = product ? product.quantity : 0;
    return total + item.price * itemQuantity;
  }, 0);

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const product = dragsParsed.find((product: Product) => product._id === id);
    const shopName = product?.["shopName"] || "";
    const productName = product?.["Trade name"] || "";

    const newProduct = {
      _id: id,
      shopName,
      productName,
      quantity: Number(value),
    };

    setInputValues(prevValues => {
      const productIndex = prevValues.findIndex(product => product._id === id);
      if (productIndex !== -1) {
        const newValues = [...prevValues];
        newValues[productIndex] = newProduct;
        return newValues;
      } else {
        return [...prevValues, newProduct];
      }
    });
  };

  const handleDelete = (_id: string) => {
    const indexToRemove = dragsParsed.findIndex(
      (product: Product) => product._id === _id
    );
    dragsParsed.splice(indexToRemove, 1);
    const newStorageDrags = JSON.stringify(dragsParsed);
    setStorageDrags(newStorageDrags);
    localStorage.setItem("selectedDrag", newStorageDrags);
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (!totalPrice) {
      alert("Ви нічого не вибрали");
      return;
    }

    const form = e.target;
    const productsWithQuantity = inputValues.filter(
      product => product.quantity > 0
    );
    const newOrder = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      address: form.elements.address.value,
      email: form.elements.email.value,
      totalPrice: totalPrice,
      products: productsWithQuantity,
      createdAt: new Date(),
    };

    setOrder(newOrder);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });

    if (response.ok) {
      alert("Замовлення успішно відправлено!");
      setDragsParsed([]);
      setInputValues([]);
      localStorage.removeItem("selectedDrag");
      form.reset();
    } else {
      alert("Помилка при надсиланні замовлення");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex  gap-4">
          <div className="bg-gray-200 flex flex-col border-gray-400 border-2 w-80 p-4">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />

            <label htmlFor="phone"> Phone</label>
            <input id="phone" name="phone" type="tel" required />

            <label htmlFor="address"> Address</label>
            <input id="address" name="address" type="text" required />
          </div>

          <div className="py-4 px-8 border-gray-400 border-2 rounded-2xl overflow-y-scroll h-[65vh] w-full">
            <ul className="flex flex-row flex-wrap gap-4 justify-around ">
              {dragsParsed &&
                dragsParsed.map(
                  ({
                    _id,
                    price,
                    "Trade name": tradeName,
                    image,
                    shopName,
                  }: Drag) => (
                    <li key={_id}>
                      <div className="flex py-4 px-6 border-gray-400 border-2 rounded-2xl w-[700px] gap-5">
                        <img
                          src={image}
                          width={400}
                          alt={tradeName}
                          className="border-gray-400 border-2 rounded-2xl mb-2"
                        />
                        <div className="flex flex-col justify-center items-center w-full">
                          <p className="text-xs mt-1 font-bold text-center">
                            {tradeName}
                          </p>
                          <p className="text-sm mt-4">
                            {"Price: "}
                            <span className="font-bold">{price} $</span>
                          </p>
                          <input
                            id={_id}
                            className="w-16 bg-indigo-100 text-center mt-3"
                            min={0}
                            type="number"
                            value={
                              inputValues.find(product => product._id === _id)
                                ?.quantity || ""
                            }
                            onChange={handleChangeProduct}
                          />

                          <p className="text-xs mt-4">
                            {"Shop: "}
                            <span className="font-bold">{shopName}</span>
                          </p>

                          <button
                            type="button"
                            className="bg-gray-900 mt-4 p-2 rounded-lg  text-white"
                            onClick={() => handleDelete(_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>

        <div>
          <div className="flex justify-end mt-5 gap-7">
            <button
              type="button"
              className="bg-gray-900 p-4 rounded-lg  text-white"
              onClick={() => {
                localStorage.removeItem("selectedDrag");
                setDragsParsed([]);
              }}
            >
              Clear Cart
            </button>
            <div className=" text-center">
              Total price:
              <p className="text-3xl font-bold">{totalPrice} $</p>
            </div>
            <button
              className="bg-gray-900 p-4 rounded-lg  text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Cart;

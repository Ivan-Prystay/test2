import React, { useEffect, useState } from "react";
import { Order } from "../cart";

interface IHistory extends Order {
  _id: string;
}

function History() {
  const [historyList, setHistoryList] = useState<IHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHistoryList = async () => {
    setIsLoading(true);
    const remoteHistoryList = await fetch("/api/orders")
      .then(response => response.json())
      .catch(error => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
      });
    setHistoryList(remoteHistoryList);
  };

  useEffect(() => {
    getHistoryList();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div> Loading... </div>
      ) : (
        historyList.length > 0 && (
          <>
            <div className="flex py-6 gap-4  text-center bg-green-200 capitalize">
              <div className="w-52"> ID</div>
              <div className="w-16"> name </div>
              <div className="w-64"> email</div>
              <div className="w-64"> phone</div>
              <div className="w-64"> address</div>
              <div className="w-64"> createdAt </div>
              <div className="w-56">products</div>
              <div className="w-36">shop Name</div>
              <div className="w-36">quantity</div>
              <div className="w-20"> total Price</div>
            </div>

            <ul>
              {historyList.map(
                ({
                  name,
                  email,
                  phone,
                  address,
                  products,
                  totalPrice,
                  createdAt,
                  _id,
                }) => (
                  <li key={_id} className=" even:bg-slate-200">
                    <div className="flex gap-4 ">
                      <div className="w-52"> {_id}</div>
                      <div className="w-16"> {name}</div>
                      <div className="w-64"> {email}</div>
                      <div className="w-64"> {phone}</div>
                      <div className="w-64"> {address}</div>
                      <div className="w-64">
                        {" "}
                        {new Date(createdAt).toLocaleString()}
                      </div>
                      <ul>
                        {products.map(product => (
                          <li key={product._id}>
                            <div className="flex gap-4 pb-3">
                              <div className="w-56">
                                {product.productName} ({product._id})
                              </div>
                              <div className="w-36">{product.shopName}</div>
                              <div className="w-36 text-center">
                                {product.quantity}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="w-20"> {totalPrice}</div>
                    </div>
                  </li>
                )
              )}
            </ul>
          </>
        )
      )}
    </div>
  );
}

export default History;

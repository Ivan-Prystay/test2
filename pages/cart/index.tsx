import Link from "next/link";
import React, { useEffect, useState } from "react";

function Shop() {
  const [dragsList, setDragsList] = useState([]);
  const [page, setPage] = useState(1);
  const [nameShop, setNameShop] = useState("");

  const getDragsList = async (name: string, page: number) => {
    const dragsList = await fetch(`/api/${name}?page=${page}`).then(response =>
      response.json()
    );

    if (name !== nameShop) {
      setDragsList(dragsList);
      setPage(1);
      setNameShop(name);
    } else {
      setDragsList(prevDragsList => {
        const newDragsList = [...prevDragsList];
        dragsList.forEach(drag => {
          if (!newDragsList.find(item => item._id === drag._id)) {
            newDragsList.push(drag);
          }
        });
        setNameShop(name);
        return newDragsList;
      });
    }
  };

  const loadMore = () => {
    setPage(prevPage => {
      const newPage = prevPage + 1;
      getDragsList(nameShop, newPage);
      return newPage;
    });
  };

  useEffect(() => {
    getDragsList("drags", 1);
  }, []);

  return (
    <div>
      <h1>Cart</h1>|<Link href="/"> Shop</Link>
      <button onClick={() => getDragsList("drags", 1)}>Drags 24</button>
      <button onClick={() => getDragsList("ambulances", 1)}>Ambulances</button>
      <button onClick={() => getDragsList("medicines", 1)}>Medicines</button>
      <button onClick={() => getDragsList("pharmaces", 1)}>Pharmacies</button>
      <button onClick={() => getDragsList("newlifes", 1)}>New Life</button>
      <ol>
        {dragsList &&
          dragsList.map(({ _id, price, "Trade name": tradeName, image }) => (
            <li key={_id}>
              <p>Price: {price} $</p>
              <p>TradeName: {tradeName}</p>
              <img src={image} width={200} alt={tradeName} />
            </li>
          ))}
      </ol>
      {dragsList.length > 0 && (
        <button onClick={loadMore}>Завантажити ще</button>
      )}
    </div>
  );
}

export default Shop;

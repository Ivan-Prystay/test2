import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Drag {
  _id: string;
  price: number;
  image: string;
  "Trade name": string;
  "International non-proprietary name": string;
}

function Shop() {
  const [dragsList, setDragsList] = useState<Drag[]>([]);
  const [page, setPage] = useState(1);
  const [nameShop, setNameShop] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getDragsList = async (name: string, page: number) => {
    setIsLoading(true);
    const dragsList = await fetch(`/api/shops/${name}?page=${page}`)
      .then(response => response.json())
      .catch(error => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
      });

    if (name !== nameShop) {
      setDragsList(dragsList);
      setPage(1);
      setNameShop(name);
    } else {
      setDragsList((prevDragsList: Drag[]) => {
        const newDragsList: Drag[] = [...prevDragsList];
        dragsList.forEach((drag: Drag) => {
          if (!newDragsList.find((item: Drag) => item._id === drag._id)) {
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

  const pathNameShops = [
    { pathName: "drags", label: "Drags 24" },
    { pathName: "ambulances", label: "Ambulances" },
    { pathName: "medicines", label: "Medicines" },
    { pathName: "pharmaces", label: "Pharmacies" },
    { pathName: "newlifes", label: "New Life" },
  ];

  return (
    <div>
      <h1>Cart </h1>|<Link href="/"> Shop</Link>
      <h2>
        {"Shop: "}
        {pathNameShops.find(name => name.pathName === nameShop)?.label}
      </h2>
      <ul>
        {pathNameShops.map(shop => (
          <li key={shop.pathName}>
            <button onClick={() => getDragsList(shop.pathName, 1)}>
              {shop.label}
            </button>
          </li>
        ))}
      </ul>
      {isLoading ? (
        <p>Дані завантажуються...</p>
      ) : (
        <ol>
          {dragsList &&
            dragsList.map(
              ({
                _id,
                price,
                "Trade name": tradeName,
                image,
                "International non-proprietary name": nonProprietaryName,
              }) => (
                <li key={_id}>
                  <p>
                    {"Price: "}
                    {price} $
                  </p>
                  <p>
                    {"TradeName: "}
                    {tradeName}
                  </p>
                  <p>
                    {"International non-proprietary name: "}
                    {nonProprietaryName}
                  </p>
                  <img src={image} width={200} alt={tradeName} />
                </li>
              )
            )}
        </ol>
      )}
      {dragsList.length > 0 && (
        <button onClick={loadMore}> Завантажити ще </button>
      )}
    </div>
  );
}

export default Shop;

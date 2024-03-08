import React, { useEffect, useState } from "react";

export interface Drag {
  _id: string;
  price: number;
  image: string;
  "Trade name": string;
  "International non-proprietary name": string;
  shopName: string;
}

function Home() {
  const [dragsList, setDragsList] = useState<Drag[]>([]);
  const [page, setPage] = useState(1);
  const [nameShop, setNameShop] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDrag, setSelectedDrag] = useState<Drag[]>([]);

  const handleAddToCart = (_id: string, shopName: string) => {
    const selectedProductIndex = selectedDrag.findIndex(
      (item: Drag) => item._id === _id
    );

    if (selectedProductIndex !== -1) {
      const updatedSelectedProduct = [...selectedDrag];
      updatedSelectedProduct.splice(selectedProductIndex, 1);
      setSelectedDrag(updatedSelectedProduct);
    } else {
      const clickedDrug = dragsList.find(item => item._id === _id);

      if (clickedDrug) {
        // Додаємо поле shopName до об'єкта
        const drugWithShop = { ...clickedDrug, shopName };
        setSelectedDrag([...selectedDrag, drugWithShop]);
      }
    }
  };

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
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedDrag", JSON.stringify(selectedDrag));
    }
  }, [selectedDrag]);

  let storageDrags;
  if (typeof window !== "undefined") {
    storageDrags = localStorage.getItem("selectedDrag");
  }

  const dragsParsed = storageDrags ? JSON.parse(storageDrags) : null;

  useEffect(() => {
    if (dragsParsed) {
      setSelectedDrag(dragsParsed);
    }
  }, []);

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

  const currentShop = pathNameShops.find(name => name.pathName === nameShop)
    ?.label;

  return (
    <div>
      <div className="flex gap-4">
        <div className="py-8 px-8 border-gray-400 border-2 rounded-2xl ">
          <h1 className="text-center text-xl mb-3 ">Shops:</h1>
          <ul className="flex flex-col px-3 gap-4">
            {pathNameShops.map(shop => (
              <li key={shop.pathName}>
                <button
                  className={`bg-gray-500 p-2 rounded-lg w-full text-white  ${
                    currentShop === shop.label ? "bg-gray-900" : ""
                  }`}
                  onClick={() => getDragsList(shop.pathName, 1)}
                >
                  {shop.label}
                </button>
              </li>
            ))}
          </ul>
          {dragsList.length > 0 && (
            <>
              <button
                type="button"
                className="bg-gray-900 mt-10 p-1 rounded-lg w-full text-white"
                onClick={loadMore}
              >
                Load More
              </button>
              <button
                type="button"
                className="bg-gray-900 mt-10 p-1 rounded-lg w-full text-white"
                onClick={() => {
                  localStorage.removeItem("selectedDrag");
                  setSelectedDrag([]);
                }}
              >
                Remove All
              </button>
            </>
          )}
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="py-4 px-8 border-gray-400 border-2 rounded-2xl overflow-y-scroll h-[77vh]">
            <ul className="flex flex-row flex-wrap gap-4 justify-around ">
              {dragsList &&
                dragsList.map(
                  ({
                    _id,
                    price,
                    "Trade name": tradeName,
                    image,
                    "International non-proprietary name": nonProprietaryName,
                  }) => (
                    <li
                      key={_id}
                      className="py-4 px-6 border-gray-400 border-2 rounded-2xl w-[400px]"
                    >
                      <div className="flex justify-between items-end">
                        <img
                          src={image}
                          width="200px"
                          alt={tradeName}
                          className="border-gray-400 border-2 rounded-2xl mb-2"
                        />
                        <button
                          type="button"
                          className="py-2 px-3 bg-slate-200 rounded-lg"
                          onClick={() => handleAddToCart(_id, currentShop!)}
                        >
                          {selectedDrag.find(product => product._id === _id)
                            ? "Remove"
                            : "Add to cart"}
                        </button>
                      </div>
                      <>
                        <p className="text-sm">
                          {"Price: "}
                          <span className="font-bold">{price} $</span>
                        </p>
                        <p className="text-xs mt-1">
                          {"Trade Name: "}
                          <span className="font-bold">{tradeName}</span>
                        </p>
                        <p className="text-xs mt-1">
                          {"International non-proprietary name: "}
                          <span className="font-bold">
                            {nonProprietaryName}
                          </span>
                        </p>
                      </>
                    </li>
                  )
                )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

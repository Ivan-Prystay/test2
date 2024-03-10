import { useEffect, useState } from "react";

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

  const [selectedDrag, setSelectedDrag] = useState<Drag[]>([]);

  const [selectedSortValue, setSelectedSortValue] = useState("letterA");

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
        const drugWithShop = { ...clickedDrug, shopName };
        setSelectedDrag([...selectedDrag, drugWithShop]);
      }
    }
  };

  const getDragsList = async (name: string, page: number) => {
    const dragsList = await fetch(`/api/shops/${name}?page=${page}`)
      .then(response => response.json())
      .catch(error => console.log(error.message))
      .finally(() => {});

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedSortValue(selectedOption);
  };

  useEffect(() => {
    const sortedDragsList = [...dragsList]; // створюємо копію масиву
    if (selectedSortValue === "letterA") {
      sortedDragsList.sort((a, b) =>
        a["Trade name"].localeCompare(b["Trade name"])
      );
    } else if (selectedSortValue === "letterZ") {
      sortedDragsList.sort((a, b) =>
        b["Trade name"].localeCompare(a["Trade name"])
      );
    } else if (selectedSortValue === "priceUp") {
      sortedDragsList.sort((a, b) => a.price - b.price);
    } else if (selectedSortValue === "priceDown") {
      sortedDragsList.sort((a, b) => b.price - a.price);
    }
    setDragsList(sortedDragsList); // оновлюємо стан з відсортованим масивом
  }, [selectedSortValue]);

  useEffect(() => {
    if (dragsParsed) {
      setSelectedDrag(dragsParsed);
    }
  }, []);

  useEffect(() => {
    getDragsList("drags", 1);
  }, []);

  const pathNameShops = [
    { pathName: "drags", label: "Drugs 24" },
    { pathName: "ambulances", label: "Ambulances" },
    { pathName: "medicines", label: "Medicines" },
    { pathName: "pharmaces", label: "Pharmacies" },
    { pathName: "newlifes", label: "New Life" },
  ];

  const currentShop = pathNameShops.find(name => name.pathName === nameShop)
    ?.label;

  return (
    <div>
      <div className="px-2 fixed right-10 top-10 flex flex-col">
        <p>Sort By</p>
        <select name="sort-form" onChange={handleSelectChange}>
          <option value="letterA">Trade Name A-Z</option>
          <option value="letterZ">Trade Name Z-A</option>
          <option value="priceUp">Price to Up</option>
          <option value="priceDown">Price to Down</option>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="p-12 border-gray-400 border-2 rounded-2xl flex flex-col justify-between">
          <ul className="flex flex-col gap-4">
            <p className="text-center text-xl mb-3 ">Shops:</p>
            {pathNameShops.map(shop => (
              <li key={shop.pathName}>
                <button
                  className={`bg-gray-500 p-2 rounded-lg w-32 text-white ease-linear duration-700 hover:duration-300 hover:ease-linear hover:bg-gray-900  ${
                    currentShop === shop.label ? "bg-gray-900" : ""
                  }`}
                  onClick={() => getDragsList(shop.pathName, 1)}
                >
                  {shop.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="bg-gray-900 mt-52 p-3 rounded-lg w-32 text-white justify-center ease-linear duration-700 hover:duration-300 hover:ease-linear hover:bg-gray-500"
            onClick={() => {
              localStorage.removeItem("selectedDrag");
              setSelectedDrag([]);
            }}
          >
            Remove All
          </button>
        </div>

        <div className="py-4 px-8 border-gray-400 border-2 rounded-2xl overflow-y-scroll h-[77vh] w-full">
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
                        className={`py-2 px-3 bg-slate-200 rounded-lg ease-linear duration-700 hover:duration-300 hover:ease-linear hover:bg-gray-900 hover:text-white ${
                          selectedDrag.find(product => product._id === _id)
                            ? "text-white hover:bg-slate-200 bg-slate-900 hover:text-slate-900 ease-linear duration-700 hover:duration-300 hover:ease-linear"
                            : null
                        }`}
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
                        <span className="font-bold">{nonProprietaryName}</span>
                      </p>
                    </>
                  </li>
                )
              )}
          </ul>
          <button
            type="button"
            className="bg-gray-900 p-3 rounded-lg text-white fixed bottom-16 right-12 ease-linear duration-700 hover:duration-300 hover:ease-linear hover:bg-gray-500"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect } from "react";
import ProductSlider from "./ProductSlider";
import { useState } from "react";
const LatestProducts = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  const fetchData = async () => {
    const res = await fetch("http://localhost:9000/api/inventory/products");
    const newData = await res.json();
    setData(newData)
    setCategories(() => ["all", ...Array.from(new Set(newData.map(product => product.category)))])
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mb-16">
      <div className=" container mx-auto">
        <h2 className=" h2 mb-6 text-center xl:text-left">Products</h2>

        <div className="my-2 w-[100%] flex">
          <span className="p-2 mr-2 text-[20px] font-extrabold">Filter:</span>
          {
            categories.map((cat, index) => {
              return <button key={index} onClick={() => setCategory(cat)} className="px-4 py-1 mr-2 bg-accent text-primary rounded-lg">{cat}</button>
            })
          }
        </div>

      </div>
      <ProductSlider data={data.filter(product => category === "all" ? true : product.category === category)} />
    </div>
  );
};

export default LatestProducts;

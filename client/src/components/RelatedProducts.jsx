import React, { useEffect } from "react";
import ProductSlider from "./ProductSlider";
import { useState } from "react";
const RelatedProducts = ({ categoryTitle }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/inventory/products");
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <div className="mb-16 ">
      <div className="container mx-auto">
        <h2 className="h2 mb-6 text-center xl:text-left">Related Products</h2>
        <ProductSlider data={data} />
      </div>
    </div>
  );
};

export default RelatedProducts;

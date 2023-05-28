import React, { useContext, useEffect } from "react";

import { useState } from "react";
import RelatedProducts from "./../components/RelatedProducts";
import { CartContext } from "./../context/CartContext";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:9000/api/inventory/products/${id}`
      );
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, [id]);
  if (!data) {
    return <div className=" container mx-auto">loading...</div>;
  }

  const categoryTitle = data.name;
  return (
    <div className="mb-16 pt-44 lg:pt-[-30px] xl:pt-0">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-[30px] mb-[30px]">
          <div className="flex-1 lg:max-w-[40%] lg:h-[540px] grad rounded-lg flex justify-center items-center">
            <img
              src={
                "https://camerashop.com.eg/wp-content/uploads/2022/10/1-1653353121_1708099.jpg"
              }
              alt=""
              className="w-full max-w-[65%]"
            />
          </div>
          <div className="flex-1 bg-primary p-12 xl:p-20 rounded-lg flex flex-col justify-center">
            <div className="uppercase text-accent text-lg font-medium mb-2">
              {data.name} cameras
            </div>
            <h2 className="h2 mb-4">{data.name}</h2>
            <p className="mb-12">{data.description}</p>
            <div className="flex items-center gap-x-8">
              <div className="text-3xl text-accent font-semibold">
                ${data.price}
              </div>
              <button
                onClick={() => addToCart(data)}
                className="btn btn-accent"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <RelatedProducts categoryTitle={categoryTitle} />
      </div>
    </div>
  );
};

export default ProductDetails;

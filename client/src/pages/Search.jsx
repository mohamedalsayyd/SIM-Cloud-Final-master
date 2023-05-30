import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import Product from "../components/Product";

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("query");
  const searchText = searchTerm.trim();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/inventory/products?name=${searchText}`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, [searchText]);

  return (
    <div className="mb-[30px] pt-40 lg:pt-4 lg:pt-0">
      <div className="container mx-auto">
        <div className="flex gap-x-[30px]">
          {/* <CategoryNav /> */}
          <div>
            <div className=" py-3 text-xl uppercase text-center lg:text-left ">
              {data?.length > 0
                ? `${data.length} results for ${searchTerm}`
                : `no results found for ${searchTerm}`}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-[15px] md:gap-[30px]">
              {data?.map((product) => {
                return <Product product={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

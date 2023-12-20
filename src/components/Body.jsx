import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
const Body = (props) => {
  const data = props.tableData;
  const [dishesData, setDishesData] = useState([]);
  useEffect(() => {
    setDishesData(data && data[0].category_dishes);
  }, [data]);

  const handleTabs = (menuId, index) => {
    // console.log("we are inside the handleTabs with categoryid ", menuId);
    setActiveTabIndex(index);
    for (let i = 0; i < data.length; i++) {
      if (data[i].menu_category_id === menuId) {
        setDishesData(data[i].category_dishes);
        return;
      }
    }
  };

  const dispatch = useDispatch();

  const addFoodItem = (items) => {
    dispatch(addItem(items));
  };
  const removeFoodItem = (items) => {
    dispatch(removeItem(items));
  };
  const cartItems = useSelector((store) => store.cart.items);
  console.log("The cart items are", cartItems);
  console.log("The dish data is ", dishesData);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      console.log(currentTab?.offsetLeft, currentTab?.clientWidth);
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <div>
      <div className="shadow sticky top-6 bg-white">
        <ul className="flex">
          {data &&
            data.map((items, idx) => (
              <li
                className="cursor-pointer lg:ml-24"
                ref={(el) => (tabsRef.current[idx] = el)}
                key={items.menu_category_id}
                onClick={() => handleTabs(items.menu_category_id, idx)}
              >
                {items.menu_category}
              </li>
            ))}
          <span
            className="absolute bottom-0 block h-1 bg-teal-500 transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
          />
        </ul>
      </div>
      <div>
        {dishesData &&
          dishesData.map((items) => (
            <div className="shadow" key={items.dish_id}>
              <div className="pl-1 mt-2 flex">
                <input defaultChecked type="checkbox"></input>
                <h4 className="ml-2 font-medium">{items.dish_name}</h4>
              </div>
              <div className="grid gap-4 grid-cols-3">
                <p className="text-md font-normal text-center lg:text-left lg:ml-6">
                  {items.dish_price} {items.dish_currency}
                </p>
                <p className="text-md font-medium text-right ml-4 lg:text-right lg:ml-90">
                  {items.dish_calories} Calories
                </p>
                <img
                  className="ml-12 lg:text-right lg:ml-80"
                  width={50}
                  src={items.dish_image}
                  alt="dish"
                />
              </div>
              <div className="grid gap-4 grid-cols-1 lg:text-left lg:ml-4">
                <p className="ml-2 mr-2 text-md font-normal">
                  {items.dish_description}
                </p>
              </div>
              <div className="flex ml-2 w-32 h-8 bg-green-500 rounded-xl lg:text-left lg:ml-6">
                <button
                  className="ml-4 mr-2 text-md"
                  onClick={() => removeFoodItem(items)}
                >
                  -
                </button>
                <p className="ml-6 mt-1">0</p>
                <button
                  className="ml-8 text-md text-right"
                  onClick={() => addFoodItem(items)}
                >
                  +
                </button>
              </div>
              <div>
                <p className="text-red-600 ml-2 lg:text-left lg:ml-6">
                  {items.addonCat.length > 0 ? "Costomization Available" : ""}
                </p>
              </div>
              <br />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Body;

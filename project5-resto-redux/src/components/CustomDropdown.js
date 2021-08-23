import React from "react";

const CustomDropdown = (props) => {
  const onButtonClickFilter = (e) => {
    props.onClickDisplayChosenCategory(e.target.textContent);
    console.log(e.target.textContent + " clicked");
  };

  return (
    <div className="dropdown">
      <button onClick={onButtonClickFilter} className="dropbtn">
        Select Category
      </button>
      <div className="dropdown-content">
        <a onClick={onButtonClickFilter}>All Items</a>
        <a value="Food" onClick={(e) => onButtonClickFilter(e)}>
          Food
        </a>
        <a value="Drinks" onClick={(e) => onButtonClickFilter(e)}>
          Drinks
        </a>
        <a value="Dessert" onClick={(e) => onButtonClickFilter(e)}>
          Dessert
        </a>
      </div>
    </div>
  );
};

export default CustomDropdown;

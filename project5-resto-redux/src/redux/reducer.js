// import App from "../App";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  items: [
    {
      id: uuidv4(),
      name: "Burger",
      price: 50,
      category: "Food",
      description: "",
      image: "https://image.flaticon.com/icons/svg/1046/1046784.svg",
      status: "displayed",
    },
    {
      id: uuidv4(),
      name: "Pizza",
      price: 100,
      category: "Food",
      description: "",
      image: "https://image.flaticon.com/icons/svg/1046/1046771.svg",
      status: "displayed",
    },
    {
      id: uuidv4(),
      name: "Fries",
      price: 25,
      category: "Food",
      description: "",
      image: "https://image.flaticon.com/icons/svg/1046/1046786.svg",
      status: "displayed",
    },
    {
      id: uuidv4(),
      name: "Coffee",
      price: 35,
      category: "Drinks",
      description: "",
      image: "https://image.flaticon.com/icons/svg/1046/1046785.svg",
      status: "displayed",
    },
    {
      id: uuidv4(),
      name: "Iced Tea",
      price: 45,
      category: "Drinks",
      description: "",
      image: "https://image.flaticon.com/icons/svg/1046/1046782.svg",
      status: "displayed",
    },
    {
      id: uuidv4(),
      name: "Hot Tea",
      price: 45,
      category: "Drinks",
      description: "",
      image: "https://image.flaticon.com/icons/svg/1046/1046792.svg",
      status: "displayed",
    },
  ],
  cartItems: [
    // { quantity: 1, name: "Burger", price: 50 },
    // { quantity: 2, name: "Iced Tea", price: 30 },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      console.log(action.payload.name + " added to menu.");
      return { ...state, items: [...state.items, action.payload] };

    case "RETURN_EDITED_ITEM":
      console.log(action.payload.name + " edited");
      let allItems = state.items.slice(0);
      allItems.map((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
          item.price = action.payload.price;
        }
      });
      console.log(allItems);
      return { ...state, items: allItems };

    case "DELETE_ITEM":
      let updatedList = state.items.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, items: updatedList };

    case "REMOVE_FROM_CART_DISPLAY":
      let updatedCart = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, cartItems: updatedCart };

    case "ITEM_TO_CART":
      console.log(action.payload, "is in cart");
      return { ...state, cartItems: [...state.cartItems, action.payload] };

    case "UPDATE_CART":
      console.log("updated qty", action.payload);
    // let updatedItem = state.cartItems.slice(0);
    // updatedItem.map((item) => {
    //   if (item.name === action.payload.name) {
    //     console.log(item.name, item.quantity);
    //   } // item.quantity === action.payload.quantity;
    //   // console.log("tis here");
    // });
    // return { ...state, cartItems: updatedItem };

    default:
      return state;
  }
};

export default reducer;

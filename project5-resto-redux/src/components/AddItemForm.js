import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";

const AddItemForm = (props) => {
  const menuItems = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const [name, setNewItemName] = useState("");
  const [price, setNewItemPrice] = useState();
  const [category, setNewItemCategory] = useState("Choose one");
  const [image, setNewItemImage] = useState("https://via.placeholder.com/50");
  const [id, setNewId] = useState(uuidv4());
  const [status, setNewStatus] = useState("displayed");

  // Reset field
  const clearState = () => {
    setNewItemName("");
    setNewItemPrice(0);
    setNewItemCategory("");
    setNewItemImage("");
    setNewId("");
    setNewStatus("");
  };

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   let test = { [e.target.name]: value };
  //   console.log("This was passed: " + value);
  //   setNewItemDetails(test);
  // };

  const onClickAddHandler = () => {
    let itemDetails = { id, name, price, category, image, status };
    dispatch({ type: "ADD_ITEM", payload: itemDetails });
    console.log(itemDetails);
    clearState();
  };

  return (
    <div className="AddItem-container">
      <div className="AddItem-form">
        <h3>Add New Item to Menu</h3>
        <div>
          <p>
            Add <b>[{name}] </b> at PHP [{price}] to you new item list.
          </p>
        </div>
        <p>
          Item Name
          <input
            name="name"
            value={name}
            id="name"
            type="text"
            onChange={(e) => setNewItemName(e.target.value)}
          />
        </p>
        <p>
          Price (PHP)
          <input
            name="price"
            value={price}
            type="number"
            onChange={(e) => setNewItemPrice(e.target.value)}
          />
        </p>
        <p>
          Category
          <select
            name="category"
            value={category}
            defaultValue=""
            onChange={(e) => setNewItemCategory(e.target.value)}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option value="Food">Food</option>
            <option value="Drinks">Drinks</option>
            <option value="Desert">Dessert</option>
          </select>
        </p>
        <p>
          Image
          <input
            name="image"
            value={image}
            type="text"
            onChange={(e) => setNewItemImage(e.target.value)}
          />
        </p>
        <Button
          className="add-item-btn"
          size="md"
          variant="outline-secondary"
          onClick={onClickAddHandler}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
export default AddItemForm;

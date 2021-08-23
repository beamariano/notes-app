import "./App.css";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import CustomDropdown from "./components/CustomDropdown";
import AddItemForm from "./components/AddItemForm";
import ItemBox from "./components/ItemBox";
import CartDisplay from "./components/CartDisplay";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const App = () => {
  const menuItems = useSelector((state) => state.items);
  const dispatch = useDispatch();

  //DISPLAY
  const [selectedCategory, setCategory] = useState("All Items");
  const onClickDisplayChosenCategory = (category) => {
    setCategory(category);
  };
  let showDisplayed = menuItems.filter((item) => item.status === "displayed");
  let showOnlyDisplayedItems = showDisplayed.filter((item) => {
    if (selectedCategory === "All Items") {
      return item; //returns all items if all items is selected
    } else {
      return item.category === selectedCategory;
    }
  });
  // END OF DISPLAY SECTION //

  // START OF CART SECTION
  const currentCartItems = useSelector((state) => state.cartItems);

  const checkItemCart = (newOrder) => {
    console.log(newOrder, "in f");
    dispatch({
      type: "ITEM_TO_CART",
      payload: newOrder,
    });
  };

  //end of CART SECTION

  // START OF EDIT ITEM SECTION
  const [itemToEdit, setItemToEdit] = useState([]);

  const editItem = (props) => {
    handleShow();
    console.log(props, "in app");
    let itemToEditDetails = {
      name: props.name,
      price: props.price,
      category: props.category,
      image: props.image,
      id: props.id,
      status: props.status,
    };
    setItemToEdit(itemToEditDetails);
    console.log(
      itemToEditDetails.name,
      "props passed to itemToEdit state",
      itemToEditDetails
    );
  };

  // const [defaultItemDetails, setDefaultItemDetails] = useState([
  //   itemToEdit.name,
  // ]);

  const [name, setEditedItemName] = useState(itemToEdit.name);
  const [price, setEditedItemPrice] = useState(itemToEdit.price);
  const [category, setEditedItemCategory] = useState("Choose one");
  const [image, setEditedItemImage] = useState(itemToEdit.image);
  const [id, setSameId] = useState(itemToEdit.id);
  const [status, setEditedStatus] = useState("displayed");

  const Reset = () => {
    setEditedItemName("");
    setEditedItemPrice("");
    setEditedItemCategory("");
    setEditedItemImage("");
    setSameId("");
  };

  const onClickSubmitEditHandler = (id) => {
    // console.log(defaultItemDetails);
    handleClose();
    let editedItem = { name, price, category, image, id, status };
    console.log(editedItem);
    console.log(id);
    dispatch({
      type: "RETURN_EDITED_ITEM",
      payload: editedItem,
    });
    Reset();
  };

  // end of edit item section

  //MODAL SECTION
  const [show, setShow] = useState(false);

  //For Editing Item
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //END OF MODAL SECTION

  return (
    <div className="App">
      <h1>Restaurant App</h1>
      <nav>
        <Button className="nav-btn">
          <Link to="/new">Add Item to Menu</Link>
        </Button>
        <Button className="nav-btn">
          <Link to="/">Home</Link>
        </Button>

        <Button className="nav-btn">
          <Link to="/cart">Show Cart</Link>
        </Button>
      </nav>

      {/* EDIT ITEM MODAL HERE */}
      <Modal show={show} onHide={handleClose} dialogClassName="modal-30w">
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Edit Item: {itemToEdit.name}</h2>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="EditItem-container">
          <div className="EditItem-container">
            {/* <span>
              <small>ID = {itemToEdit.id}</small>
            </span> */}
            <div className="EditItemForm-container">
              <div className="itemToEditDetails">
                <strong>
                  Item Name
                  <input
                    name="name"
                    defaultValue={itemToEdit.name}
                    value={name}
                    type="text"
                    onChange={(e) => setEditedItemName(e.target.value)}
                  />
                </strong>
                Price (PHP):
                <input
                  className="edit-price-input"
                  name="price"
                  defaultValue={itemToEdit.price}
                  type="number"
                  value={price}
                  onChange={(e) => setEditedItemPrice(e.target.value)}
                />
                Category
                <p>
                  <select
                    name="category"
                    defaultValue={itemToEdit.category}
                    value={category}
                    onChange={(e) => setEditedItemCategory(e.target.value)}
                  >
                    <option value="Choose One" disabled>
                      Choose one
                    </option>
                    <option value="Food">Food</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desert">Dessert</option>
                  </select>
                </p>
              </div>
            </div>
            <div className="itemToEditImageContainer">
              New Image
              <p>
                <input
                  name="image"
                  type="text"
                  defaultValue={itemToEdit.image}
                  value={image}
                  onChange={(e) => setEditedItemImage(e.target.value)}
                />
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="editsubmit-btn"
            onClick={() => {
              onClickSubmitEditHandler(itemToEdit.id);
            }}
          >
            Submit Edit
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of EDIT ITEM MODAL */}

      <div className="maincontainer clearfix">
        <>
          <Route path="/cart">
            <CartDisplay />
          </Route>
        </>
        <div className="display-container">
          <div className="dropdown-container">
            <CustomDropdown
              onClickDisplayChosenCategory={onClickDisplayChosenCategory}
            />
          </div>
          <div className="menuContainer">
            <div className="items-display-container">
              {showOnlyDisplayedItems.length == 0 ? (
                <div className="empty-display">
                  <h1>NO ITEMS TO DISPLAY</h1>
                </div>
              ) : (
                showOnlyDisplayedItems.map((item) => (
                  <ItemBox
                    items={item}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    description={item.description}
                    image={item.image}
                    status={item.status}
                    //onAddToCart={onAddToCart}
                    checkItemCart={checkItemCart}
                    editItem={editItem}
                    // cart={cart}

                    handleClose={handleClose}
                    handleShow={handleClose}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <Route path="/new">
          <AddItemForm />
        </Route>
      </div>
    </div>
  );
};

export default App;

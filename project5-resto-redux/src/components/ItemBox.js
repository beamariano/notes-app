import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ItemBox = (props) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const onButtonClickOrderHandler = (props) => {
    let newOrder = {
      quantity: quantity,
      name: props.name,
      price: props.price,
      id: props.id,
    };
    console.log(newOrder);
    props.checkItemCart(newOrder);
  };

  const onButtonClickEditHandler = (props) => {
    props.editItem(props);
  };
  const removeFromItemCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART_DISPLAY",
      payload: id,
    });
  };

  const onButtonClickDeleteHandler = (id) => {
    console.log(props.name + " deleted");
    removeFromItemCart(id);
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  };

  const onQtyChangeInputHandler = (e) => {
    setQuantity({ quantity: e.target.value });
  };

  return (
    <>
      <div className="main-item-displayContainer">
        <div className="itemContainer">
          <div className="imageContainer">
            <img src={props.image} alt={props.name + " icon"} />
          </div>
          <div className="itemDetails">
            <strong>{props.name}</strong>
            <p>
              <small>PHP {props.price}</small>
            </p>
            <p>
              <small>Qty. </small>
              <input
                className="item-qty"
                type="number"
                onChange={(e) => onQtyChangeInputHandler(e)}
                value={quantity}
              />
            </p>
            <div className="itembox-btn">
              <Button
                className="order-btn"
                variant="outline-success"
                onClick={() => {
                  onButtonClickOrderHandler(props);
                }}
              >
                Order
              </Button>
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              onButtonClickEditHandler(props);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              onButtonClickDeleteHandler(props.id);
            }}
          >
            Delete
          </Button>{" "}
        </div>
      </div>
    </>
  );
};

export default connect()(ItemBox);

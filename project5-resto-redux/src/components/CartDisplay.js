import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const CartDisplay = () => {
  const cart = useSelector((state) => state.cartItems);
  const [cartTotal, setCartTotal] = useState();
  const dispatch = useDispatch();

  //For cart grand total
  useEffect(() => {
    let total = 0;
    cart.map((cartItem) => {
      total += cartItem.quantity * cartItem.price;
    });
    setCartTotal(total);
  }, [cart]);

  const deleteInCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART_DISPLAY", payload: id });
  };

  return (
    <div className="cart-container">
      <div>
        <h2>Cart Items</h2>
      </div>
      <div className="cart-items">
        {cart.length == 0 ? (
          <div className="empty-display">
            <p>NO ITEMS TO DISPLAY</p>
          </div>
        ) : (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Qty.</th>
                <th>Item Name & Price/Unit</th>
                <th>Sub-Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cart) => {
                return (
                  <tr>
                    <td>{cart.quantity}</td>
                    <td>
                      {cart.name} @ PHP {cart.price}
                    </td>
                    <td>{cart.price * cart.quantity}</td>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        deleteInCart(cart.id);
                      }}
                    >
                      delete
                    </Button>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <td></td>
              <td className="cartgrandtotal">Total</td>
              <td>
                <strong className="cartgrandtotal">{cartTotal}</strong>
              </td>
              <td></td>
            </tfoot>
          </Table>
        )}
      </div>
    </div>
  );
};

export default CartDisplay;

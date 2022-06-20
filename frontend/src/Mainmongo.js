/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import cart from "./cart.png";
import bg from "./bg.jpg";
import axios from "axios";

const Mainmongo = () => {
  const [data, setData] = useState();

  const post = (url, body, callback) => {
    let headers = new Headers();

    //console.log(headers);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:5000");

    let formData = new FormData();
    for (const [key, value] of Object.entries(body)) {
      formData.append(key, value);
    }
    //console.log(formData);

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: headers,
      body: formData,
    })
      .then((json) => {
        console.log(json);
        callback(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOutHandler = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("isClient");
    window.location.reload();
  };

  const addItem = () => {
    var id = prompt("Item ID");
    var name = prompt("Stock name");
    var qty = prompt("Quantity ...");
    console.log({id, name, qty});
    if (parseInt(qty) !== parseFloat(qty)) {
      alert("Qty must be an Integer");
      return;
    }
    if (qty <= 0) {
      alert("Qty must be positive");
      return;
    }
    const body = { id, name, qty };
    post(`http://localhost:3001/new_item`, body, (res) => {
      window.location.reload();
    });
  };

  const purchaseHandler = (id, avail, qty) => {
    if (parseInt(qty) !== parseFloat(qty)) {
      console.log(parseInt(qty), qty, parseInt(qty) === parseFloat(qty));
      alert("Qty must be an integer");
      return;
    }
    var qty_ = parseInt(qty);
    if (qty_ <= 0) {
      alert("Qty must be positive");
      return;
    }
    if (qty_ > avail) {
      alert(
        "Quantity ordered is higher than available\nOrder cannot be placed ..."
      );
    } else if (qty_ === avail) {
      alert("Order placed ...");
      axios.get(`http://localhost:3001/delete/${id}`).then((res) => {
        window.location.reload();
      });
    } else {
      alert("Order placed ...");
      axios.get(`http://localhost:3001/purchase/${id}/${qty_}`).then((res) => {
        window.location.reload();
      });
    }
  };

  const addHandler = (id, avail, qty) => {
    if (qty <= 0) {
      alert("Invalid Quantity");
      return;
    }
    axios.get(`http://localhost:3001/add/${id}/${qty}`).then((res) => {
      //console.log(res.data);
      window.location.reload();
    });
  };

  const deleteHandler = (id) => {
    axios.get(`http://localhost:3001/delete/${id}`).then((res) => {
      window.location.reload();
    });
  };

  const removeOutOfStockHandler = () => {
    axios.get("http://localhost:3001/remove_out_of_stock").then((res) => {
      window.location.reload();
    });
  };

  const [isClient, setIsClient] = useState(
    localStorage.getItem("isClient") === "true"
  );

  useEffect(() => {
    setIsClient(localStorage.getItem("isClient") === "true");
    axios.get("http://localhost:3001").then((res) => {
      //console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <div className='Mainmongo'>
      <center>
        <div className='d-table'>
          <img src={cart} alt='' className='logo'></img>
          <div className='d-table-cell w-90'>
            <h1>Stock Overflow</h1>
          </div>
          <div className='d-table-cell w-7'>
            <button onClick={logOutHandler}>Log Out</button>
          </div>
        </div>
      </center>

      <br></br>
      {!isClient && (
        <div className='left'>
          <button onClick={addItem}>+ Add Item</button>
          &emsp;
          <button onClick={removeOutOfStockHandler}>
            Remove all out of stock
          </button>
        </div>
      )}

      <br></br>
      <br></br>
      <center>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>QTY</th>
            {isClient && <th>Purchase</th>}
            {!isClient && (
              <>
                <th>Add</th>
                <th>Delete</th>
              </>
            )}
          </tr>
          {data &&
            data.map((rows) => (
              <tr key={rows.id}>
                <td>
                  <b>{rows.id}</b>
                </td>
                <td>
                  <b>{rows.name}</b>
                </td>
                <td>
                  <b>{rows.qty}</b>
                </td>

                {isClient && rows.qty > 0 && (
                  <td>
                    <center>
                      <button
                        onClick={() =>
                          purchaseHandler(
                            rows.id,
                            rows.qty,
                            prompt("Quantity to purchase ...")
                          )
                        }>
                        Purchase
                      </button>
                    </center>
                  </td>
                )}

                {isClient && rows.qty === 0 && (
                  <td>
                    <center>Out of Stock</center>
                  </td>
                )}

                {!isClient && (
                  <>
                    <td>
                      <center>
                        <button
                          onClick={() =>
                            addHandler(
                              rows.id,
                              rows.qty,
                              prompt("Quantity to added to stock ...")
                            )
                          }>
                          Add
                        </button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => deleteHandler(rows.id)}>
                          Delete
                        </button>
                      </center>
                    </td>
                  </>
                )}
              </tr>
            ))}
        </table>
      </center>
    </div>
  );
};

export default Mainmongo;

import "./App.css";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { PlusCircle, Edit, Trash2 } from "react-feather";

function App() {
  const blankUser = {
    name: "",
    email: "",
    role: "",
    adress: "",
  };

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(blankUser);
  const [userdata, setUserdata] = useState([]);
  const [action, setAction] = useState("Add");
  const [editIndex, setEditIndex] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction("Add");
  };

  const addUser = () => {
    setUserdata([...userdata, user]);
    setUser(blankUser);
    onCloseModal();
  };

  const editUser = (index) => {
    setAction("Edit");
    const selectedUser = userdata.find((x, i) => i === index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
  };

  const updateUser = () => {
    const newUsers = userdata.map((x, i) => {
      if (i === editIndex) {
        x = user;
      }
      return x;
    });
    setUserdata(newUsers);
    setUser(blankUser);
    setEditIndex(null);
    onCloseModal();
  };

  const deleteUser = (index) => {
    const newUsers = userdata.filter((x, i) => {
      return i !== index;
    });
    setUserdata(newUsers);
  };

  return (
    <div className="container">
      <div className="d-flex">
        <h1>CRUD API</h1>
      </div>
      <div className="toolbar">
        <button className="btn" onClick={onOpenModal}>
          <PlusCircle size={16}></PlusCircle>
          <span>ADD</span>
        </button>
      </div>
      <hr />
      {/* <p>{JSON.stringify(userdata)}</p> */}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userdata.length > 0 &&
            userdata.map((user, index) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.adress}</td>
                  <td>
                    <button className="btn m12 " onClick={() => editUser(index)}>
                      <Edit size={16}></Edit>
                      <span>Edit</span>
                    </button>

                    <button
                      className="btn m12"
                      onClick={() => deleteUser(index)}
                    >
                      <Trash2 size={16}></Trash2>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action}</h2>
        {/* <p>{JSON.stringify(user)}</p> */}
        <div className="form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <label htmlFor="name">Email</label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="name">Role</label>
          <input
            type="text"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          />
          <label htmlFor="name">Address</label>
          <textarea
            name="address"
            id=""
            cols="30"
            rows="5"
            value={user.adress}
            onChange={(e) => setUser({ ...user, adress: e.target.value })}
          ></textarea>
          {action === "Add" && (
            <button className="btn" onClick={() => addUser()}>
              Submit
            </button>
          )}
          {action === "Edit" && (
            <button className="btn" onClick={() => updateUser()}>
              Update
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;

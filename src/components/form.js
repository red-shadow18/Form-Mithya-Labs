import React, { useState } from "react";
import "./style.css";

const Form = () => {
  const [pname, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [record, setRecord] = useState([]);
  const [isEditItem, setIsEditItem] = useState("");
  const [toggle, setToggle] = useState(true);

  const addItem = () => {
    event.preventDefault();
    if (!pname || !gender || !age) {
      alert("Can't add empty item");
    } else {
      const inputData = {
        id: new Date().getTime().toString(),
        name: pname,
        gender: gender,
        age: age,
      };
      console.log(inputData);
      setRecord([...record, inputData]);
      setName("");
      setAge("");
      setGender("");
    }
  };

  const addEditItem = () => {
    event.preventDefault();
    setRecord(
      record.map((curElem) => {
        if (curElem.id === isEditItem) {
          return { ...curElem, name: pname, gender: gender, age: age };
        } else return { ...curElem };
      })
    );

    setName("");
    setAge("");
    setGender("");
    setToggle(true);
  };

  const deleteItem = (id) => {
    const updatedItem = record.filter((curElem) => {
      return curElem.id !== id;
    });
    setRecord(updatedItem);
  };

  const editItem = (id) => {
    const editedItem = record.find((curElem) => {
      return curElem.id === id;
    });
    setName(editedItem.name);
    setAge(editedItem.age);
    setGender(editedItem.gender);
    setIsEditItem(id);
    setToggle(false);
  };
  return (
    <>
      <div className="elements">
        <div className="records">
          <div className="allitems">
            {record.map((curElem) => {
              return (
                <div className="eachitem" key={curElem.id}>
                  <ul className="list">
                    <li>Name: {curElem.name}</li>
                    <li>Gender: {curElem.gender}</li>
                    <li>Age: {curElem.age}</li>
                  </ul>
                  <div>
                    <i
                      class="fas fa-pencil-alt"
                      onClick={() => editItem(curElem.id)}
                    ></i>

                    <i
                      class="fas fa-trash-alt"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form">
          <form>
            <input
              className="name"
              type="text"
              placeholder="Name"
              value={pname}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="gender"
              type="text"
              placeholder="Gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            />
            <input
              className="age"
              type="text"
              placeholder="Age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
            {toggle ? (
              <button type="submit" onClick={addItem}>
                Add
              </button>
            ) : (
              <button type="submit" onClick={addEditItem}>
                Update
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;

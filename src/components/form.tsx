import React, { useState, FC, MouseEvent } from "react";
import { Entry } from "./interfaces";
import "./style.css";

const Form: FC = () => {
  const [pname, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [record, setRecord] = useState<Entry[]>([]);
  const [isEditItem, setIsEditItem] = useState<Entry>();
  const [toggle, setToggle] = useState<boolean>(true);

  const addItem = (event: MouseEvent<HTMLButtonElement>): void => {
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
      setAge(0);
      setGender("");
    }
  };

  const addEditItem = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setRecord(
      record.map((curElem: Entry) => {
        if (curElem.id === isEditItem?.id) {
          return { ...curElem, name: pname, gender: gender, age: age } as Entry;
        } else return { ...curElem };
      })
    );

    setName("");
    setAge(0);
    setGender("");
    setToggle(true);
  };

  const deleteItem = (id: string) => {
    const updatedItem = record.filter((curElem) => {
      return curElem.id !== id;
    });
    setRecord(updatedItem);
  };

  const editItem = (id: string) => {
    const editedItem = record.find((curElem) => {
      return curElem.id === id;
    });
    setName(editedItem?.name ?? "");
    setAge(editedItem?.age);
    setGender(editedItem?.gender ?? "");

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
                      className="fas fa-pencil-alt"
                      onClick={() => editItem(curElem.id)}
                    ></i>

                    <i
                      className="fas fa-trash-alt"
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
              onChange={(event) => setAge(Number(event.target.value))}
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

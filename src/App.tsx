import "./App.css";
import Form from "./components/form";
import { useState, FC } from "react";

// function App(): FC {
const App: FC = () => {
  return (
    <>
      <div className="form">
        <Form />
      </div>
    </>
  );
};

export default App;

import "./App.css";
import carData from "./sampleData.json";
import CarCard from "./carCard";
import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function App() {
  const [searchItem, setSearchItem] = useState("");

  function handleSeachRender(item) {
    console.log("hello");
    setSearchItem(item);
  }

  if (searchItem !== "") {
    return (
      <div className="main-container">
        <div className="search-container">
          <Search search={handleSeachRender} />
        </div>
        <div className="list-container">
          <ul className="list">
            <CarCard car={searchItem} />
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="search-container">
        <Search search={handleSeachRender} />
      </div>
      <div className="list-container">
        <ul className="list">
          {carData.cars.map((car, index) => (
            <li key={index}>
              <CarCard car={carData.cars[index]} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Search({ search }) {
  const [item, setItem] = useState("");

  function searchCarByName(carName) {
    carName = carName.toLowerCase(); // Convert the search query to lowercase for case-insensitive search
    const results = carData.cars.filter((car) =>
      car.car_name.toLowerCase().includes(carName)
    );

    return results[0];
  }

  const handleInputChange = (event) => {
    setItem(event.target.value);
  };

  const handleSearchClick = () => {
    const ans = searchCarByName(item);
    if (!ans) return;
    search(ans);
  };

  return (
    <div className="search-inside-box">
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>
        <MagnifyingGlass size={20} color="#555" />
      </button>
    </div>
  );
}

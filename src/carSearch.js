import { useState } from "react";
import carData from "./sampleData.json";
import { MagnifyingGlass } from "@phosphor-icons/react";
import "./carSearch.css";

export default function Search({ search }) {
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

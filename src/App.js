import "./App.css";
import carData from "./sampleData.json";
import CarCard from "./carCard";
import { useState } from "react";
import Search from "./carSearch";
import { ArrowFatLeft, ArrowFatRight } from "@phosphor-icons/react";

export default function App() {
  const [searchItem, setSearchItem] = useState("");

  function handleSeachRender(item) {
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
      <PaginatedList itemsPerPage={6} />
    </div>
  );
}

function PaginatedList({ itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the items for the current page
  const currentItems = carData.cars.slice(startIndex, endIndex);
  const totalPages = carData.cars.length / itemsPerPage;

  // Event handler for navigating to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Event handler for navigating to the next page
  const goToNextPage = () => {
    if (endIndex < carData.cars.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="list-container">
      <ul className="list">
        {currentItems.map((item, index) => (
          <li key={index}>
            <CarCard car={currentItems[index]} />
          </li>
        ))}
      </ul>
      <div className="page-container">
        <div className="page-text">
          {currentPage} from {totalPages}
        </div>
        <div className="page-btns">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="btn"
          >
            <ArrowFatLeft size={20} color="#555" />
          </button>

          <button onClick={() => setCurrentPage(1)} className="btn">
            1
          </button>

          <button onClick={() => setCurrentPage(2)} className="btn">
            2
          </button>

          <button onClick={() => setCurrentPage(3)} className="btn">
            3
          </button>

          <button onClick={() => setCurrentPage(4)} className="btn">
            4
          </button>

          <button className="btn">...</button>

          <button onClick={() => setCurrentPage(9)} className="btn">
            9
          </button>

          <button onClick={() => setCurrentPage(10)} className="btn">
            10
          </button>

          <button
            onClick={goToNextPage}
            disabled={endIndex >= carData.cars.length}
            className="btn"
          >
            <ArrowFatRight size={20} color="#555" />
          </button>
        </div>
      </div>
    </div>
  );
}

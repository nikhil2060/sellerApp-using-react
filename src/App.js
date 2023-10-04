import "./App.css";
import carData from "./sampleData.json";
import CarCard from "./carCard";
import { useState } from "react";
import Search from "./carSearch";
import { ArrowFatLeft, ArrowFatRight } from "@phosphor-icons/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";

export default function App() {
  const [searchItem, setSearchItem] = useState("");

  function handleSeachRender(item) {
    setSearchItem(item);
  }

  if (searchItem !== "") {
    return (
      <Router>
        <div className="App">
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
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <div className="main-container">
          <div className="search-container">
            <Search search={handleSeachRender} />
          </div>
          <PaginatedList itemsPerPage={6} />
        </div>
      </div>
    </Router>
  );
}

function PaginatedList({ itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { page } = useParams();
  const currentPageNumber = parseInt(page || "1", 10);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the items for the current page
  const currentItems = carData.cars.slice(startIndex, endIndex);
  const totalPages = Math.ceil(carData.cars.length / itemsPerPage);

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
            <Link to={`/page/${currentPage - 1}`}>
              <ArrowFatLeft size={20} color="#555" />
            </Link>
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <Link
              to={`/page/${index + 1}`}
              key={index}
              className={`link ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Link>
          ))}

          <button
            onClick={goToNextPage}
            disabled={endIndex >= carData.cars.length}
            className="btn"
          >
            <Link to={`/page/${currentPage + 1}`}>
              <ArrowFatRight size={20} color="#555" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

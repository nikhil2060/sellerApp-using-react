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

  function handleSearchRender(item) {
    setSearchItem(item);
  }

  return (
    <Router>
      <div className="main-container">
        <div className="search-container">
          <Search search={handleSearchRender} />
        </div>
        <Routes>
          <Route path="/page/:page" element={<PaginatedList />} />
          <Route
            path="/"
            element={
              searchItem !== "" ? (
                <div className="list-container">
                  <ul className="list">
                    <CarCard car={searchItem} />
                  </ul>
                </div>
              ) : (
                <PaginatedList />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function PaginatedList() {
  const [currentPage, setCurrentPage] = useState(1);

  // Get the page parameter from the URL using useParams
  const { page } = useParams();

  // Parse the page parameter to an integer, defaulting to 1
  const currentPageNumber = parseInt(page || "1", 10);

  // Calculate the start and end index for the current page
  const startIndex = (currentPageNumber - 1) * 6;
  const endIndex = startIndex + 6;

  // Slice the data to display only the items for the current page
  const currentItems = carData.cars.slice(startIndex, endIndex);
  const totalPages = Math.ceil(carData.cars.length / 6);

  // Event handler for navigating to the previous page
  const goToPreviousPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPage(currentPageNumber - 1);
    }
  };

  // Event handler for navigating to the next page
  const goToNextPage = () => {
    if (endIndex < carData.cars.length) {
      setCurrentPage(currentPageNumber + 1);
    }
  };

  return (
    <div className="list-container">
      <ul className="list">
        {currentItems.map((item, index) => (
          <li key={index}>
            <CarCard car={item} />
          </li>
        ))}
      </ul>
      <div className="page-container">
        <div className="page-text">
          {currentPageNumber} from {totalPages}
        </div>
        <div className="page-btns">
          <button
            onClick={goToPreviousPage}
            disabled={currentPageNumber === 1}
            className="btn"
          >
            <ArrowFatLeft size={20} color="#555" />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <Link
              to={`/page/${index + 1}`}
              key={index}
              className={`btn ${
                currentPageNumber === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </Link>
          ))}

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

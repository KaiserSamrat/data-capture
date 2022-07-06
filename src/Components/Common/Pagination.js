import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const Pagination = ({
  page = 10,
  setCurrentPage,
  parentClass,
  reInitialize,
}) => {
  const numberOfPages = [];
  for (let i = 1; i <= page; i++) {
    numberOfPages.push(i);
  }
  const handlePagination = (e, number) => {
    if (helper(number)) {
      setCurrentButton(Number(e.target.id));
    }
  };
  const handlePrev = () => {
    setCurrentButton(currentButton - 1);
  };
  const handleNext = () => {
    setCurrentButton(currentButton + 1);
  };

  // Current active button number
  const [currentButton, setCurrentButton] = useState(1);

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    setCurrentButton(1);
  }, [reInitialize]);

  useEffect(() => {
    // setCurrentButton(1)

    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton); // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1); // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ]; // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentButton > numberOfPages.length - 3) {
      // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4); // slice(10-4)
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }
    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentButton);
  }, [currentButton, page]);

  const helper = (value) => {
    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";
    if (value == dotsInitial || value == dotsLeft || value == dotsRight) {
      return false;
    } else {
      return true;
    }
  };

  const pageNumber = arrOfCurrButtons.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={(e) => {
          handlePagination(e, number);
        }}
        className={currentButton === number ? "activePage" : null}
      >
        {number}
      </li>
    );
  });

  return (
    <div className={parentClass}>
      <ul>
        <li className="prevNext">
          <button
            onClick={handlePrev}
            disabled={currentButton === numberOfPages[0] ? true : false}
          >
            <i className="bx bx-chevron-left"></i>
          </button>
        </li>
        {pageNumber}
        <li className="prevNext">
          <button
            onClick={handleNext}
            disabled={currentButton === numberOfPages.length ? true : false}
          >
            <i className="bx bx-chevron-right"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  setCurrentPage: PropTypes.func,
  page: PropTypes.number,
  parentClass: PropTypes.string,
  reInitialize: PropTypes.bool,
};

export default Pagination;

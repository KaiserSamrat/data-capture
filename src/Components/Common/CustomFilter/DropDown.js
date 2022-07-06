import React, { useRef } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import './Dropdown.scss';

const CustomDropDown = ({
  toggle,
  open,
  onChange,
  searchValue,
  selectedItem,
  disable,
  isSelected,
  handleClear,
  children,
}) => {
  const ref = useRef();
  return (
    <React.Fragment>
      <Dropdown
        isOpen={open}
        toggle={toggle}
        onClick={() => ref?.current?.focus()}
        className="mainDropDown"
      >
        <DropdownToggle
          className="bg-transparent border-0 outline-0 formbtnbtn newDropdown"
          style={{ padding: '0px', overflow: 'hidden' }}
          disabled={disable}
        >
          <div className="select sizesButton d-flex justify-content-between align-items-center">
            <span className="brandSpan position-relative">
              <input
                className="searchInput"
                type="text"
                placeholder={selectedItem}
                value={searchValue}
                onChange={onChange}
                disabled={disable}
                ref={ref}
              />
              {isSelected ? (
                <span
                  className="position-absolute"
                  style={{
                    top: '50%',
                    right: '0',
                    transform: 'translateY(-40%)',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                >
                  <i
                    className="bx bx-x"
                    style={{ color: 'red', fontSize: '20px' }}
                  ></i>
                </span>
              ) : null}
            </span>
            <span
              style={{
                fontSize: '20px',
                marginTop: '3px',
                color: 'rgb(99, 99, 99)',
              }}
            >
              <i
                className="bx bx-chevron-down"
                // style={{ color: 'rgb(137 137 137)' }}
              ></i>
            </span>
          </div>
        </DropdownToggle>
        <DropdownMenu
          className="sizesDropDown"
          style={{
            height: '200px',
            overflowY: 'scroll',
            width: '100%',
            padding: '0',
            margin: '4px 0 0',
          }}
        >
          {children}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default CustomDropDown;

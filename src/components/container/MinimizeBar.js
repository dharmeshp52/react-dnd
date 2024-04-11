import React from "react";

/**
 * MinimizeBar component displays a list of minimized items.
 * @param {object} props - The props passed to the component.
 * @param {object} props.items - The object that holds the items.
 * @param {object} props.minimize - The object that holds the minimize state of each item.
 * @param {function} props.setMinimize - The function to set the minimize state of items.
 * @returns {JSX.Element} - The MinimizeBar component.
 */

const MinimizeBar = ({ items, minimize, setMinimize }) => {
  /**
   * Deletes a minimized item from the minimize state.
   * @param {string} key - The key of the minimized item.
   */
  const deleteMinimizedItem = (key) => {
    delete minimize[key];
    setMinimize({ ...minimize });
  };

  return (
    <>
      {Object.keys(minimize)?.length > 0 && (
        <div className="mini-mize">
          <h6>Minimize List</h6>
        </div>
      )}
      <div className="minimize-container">
        {Object.entries(minimize)?.map((ele, i) => {
          return (
            ele[1] && (
              <li key={`mini-item-${i}`} className="minimize-item">
                {items.left[ele[0]]?.name}{" "}
                <button
                  onClick={deleteMinimizedItem}
                  className=" btn btn-secondary"
                >
                  +
                </button>{" "}
              </li>
            )
          );
        })}
      </div>
    </>
  );
};

export default MinimizeBar;

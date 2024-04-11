import React from "react";

/**
 * ModalCard component represents a modal for adding a new card.
 * @param {object} props - The props passed to the component.
 * @param {number|null} props.addPosition - The position where the card will be added.
 * @param {function} props.setAddPosition - The function to set the add position.
 * @param {string} props.title - The title of the new card.
 * @param {function} props.setItems - The function to update the items.
 * @param {object} props.items - The object that holds the items.
 * @param {function} props.setTitle - The function to set the title of the new card.
 * @param {object} props.widgetData - The data representing the available chart options.
 * @returns {JSX.Element} - The ModalCard component.
 */

const ModalCard = ({
  addPosition,
  setAddPosition,
  title,
  setItems,
  items,
  setTitle,
  widgetData,
}) => {
  /**
 * Handles the form submission when adding a new card.
 * @param {Event} e - The form submit event.
 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title?.length) return;
    setItems({
      left: items.left?.map((item) => {
        if (item.position === addPosition) {
          return {
            ...item,
            ...{ position: addPosition, name: title },
          };
        } else {
          return item;
        }
      }),
    });
    setTitle("");
    setAddPosition(null);
  };
  return (
    <div
      className={`modal fade ${addPosition !== null ? "show" : ""}`}
      style={{ display: `${addPosition !== null ? "block" : ""}` }}
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="false"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-title" id="exampleModalLongTitle">
              <h6>ADD Card at Position {addPosition}</h6>
            </span>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setAddPosition(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit}
              className="d-flex justify-content-center "
            >
              <select
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="chart-select"
              >
                {Object.entries(widgetData).map(([key, option], index) => {
                  return (
                    <option
                      key={index + key}
                      value={key}
                      className="option-class"
                    >
                      {option.name}
                    </option>
                  );
                })}
              </select>
              <button className="btn btn-primary" type="submit">
                Add Card
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;

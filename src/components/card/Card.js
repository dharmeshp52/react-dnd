import React from "react";
import { widgetData } from "../../static/data";
import "./card.css";

/**
 * Card component represents a card with header and body sections.
 * @param {object} props - The props passed to the component.
 * @param {string} props._key - The key used to identify the card.
 * @param {object} props.pin - The object that holds the pinning state of each card.
 * @param {function} props.setPinIcon - The function to update the pinning state of a card.
 * @param {string} props.UnpinIcon - The source for the image representing the unpinned state.
 * @param {string} props.PinIcon - The source for the image representing the pinned state.
 * @param {function} props.setMinimize - The function to update the minimize state of a card.
 * @param {function} props.setItems - The function to update the items.
 * @param {object} props.items - The object that holds the items.
 * @param {object} props.item - The specific item related to this card.
 * @param {object} props.minimize - The object that holds the minimize state of each card.
 * @returns {JSX.Element} - The Card component.
 */

const Card = ({
  _key,
  pin,
  setPinIcon,
  UnpinIcon,
  PinIcon,
  setMinimize,
  setItems,
  items,
  item,
  minimize,
}) => {

  
  // Handles the click event for pinning/unpinning a card.
  const handlePinClick = () => {
    setPinIcon({ ...pin, [_key]: !pin[_key] });
  };

  // Handles the click event for minimizing/unminimizing a card.
  const handleMinimizeClick = () => {
    setMinimize({ ...minimize, [_key]: !minimize[_key] });
  };

 // Handles the click event for removing a card.
  const handleRemoveClick = () => {
    setPinIcon({
      ...pin,
      [_key]: false,
    });

    const newItems = items?.left?.map((item, i) => {
      if (i === _key) {
        return { ...item, name: "" };
      } else {
        return item;
      }
    });

    setItems({ left: newItems });
  };

  return (
    <div className="card m-2">
      <div className="card-header">
        <div className="row">
          <div className="col-8">
            <h4>Featured</h4>{" "}
          </div>
          <div className="col-4 list-group list-group-flush">
            <div className="d-flex justify-content-end">
              <button
                className="me-1 btn btn-primary"
                onClick={handlePinClick}
              >
                {" "}
                {pin[_key] ? (
                  <img src={UnpinIcon} alt="" />
                ) : (
                  <img src={PinIcon} alt="" />
                )}{" "}
              </button>
              <button
                className="me-1 btn btn-primary"
                onClick={handleMinimizeClick}
              >
                -
              </button>
              <button
                className=" btn btn-primary"
                onClick={handleRemoveClick}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body card-body-chart">
        {widgetData[item?.name].component}
      </div>
    </div>
  );
};

export default Card;

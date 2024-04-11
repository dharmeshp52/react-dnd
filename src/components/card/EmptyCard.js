import React from 'react'

/**
 * EmptyCard component represents an empty card placeholder.
 * @param {object} props - The props passed to the component.
 * @param {object} props.minimize - The object that holds the minimize state of each card.
 * @param {string} props._key - The key used to identify the card.
 * @param {function} props.setAddPosition - The function to set the add position.
 * @param {object} props.item - The specific item related to this card.
 * @returns {JSX.Element} - The EmptyCard component.
 */

const EmptyCard = ({ minimize, _key, setAddPosition, item }) => {

  // Handles the double click event on the empty card to add a new card.
  const handleDoubleClick = () => {
    if (minimize?.[_key]) return;
    setAddPosition(item?.position);
  };

  return (
    <div className="card custome-empty-card">
      <div
        className={`card-body empty-card ${minimize?.[_key] ? "empty-min" : ""}`}
        onDoubleClick={handleDoubleClick}
      >
        {minimize?.[_key] ? "" : "+"}
      </div>
    </div>
  )
}

export default EmptyCard;
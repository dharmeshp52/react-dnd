import React, { useState } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  move,
} from "react-grid-dnd";
import EmptyCard from "../card/EmptyCard";
import Card from "../card/Card";
import ModalCard from "../card/ModalCard";
import MinimizeBar from "../container/MinimizeBar";
import { widgetData } from "../../static/data";
import PinIcon from "../../images/pin.svg";
import UnpinIcon from "../../images/unpin.svg";
import "../../styles/dnd.css";

/**
 * TabContent component represents the content of a tab.
 * It handles the display and manipulation of cards.
 * @returns {JSX.Element} - The TabContent component.
 */

const TabContent = () => {
  const [items, setItems] = useState({
    left: [
      { position: 0, name: "" },
      { position: 1, name: "" },
      { position: 2, name: "" },
      { position: 3, name: "" },
      { position: 4, name: "" },
      { position: 5, name: "" },
    ],
  });
  const [pin, setPinIcon] = useState({});
  const [minimize, setMinimize] = useState({});
  const [title, setTitle] = useState("");
  const [addPosition, setAddPosition] = useState(null);

  /**
  * Handles the card movement within the grid.
  * @param {string} sourceId - The source grid ID.
  * @param {number} sourceIndex - The index of the source card.
  * @param {number} targetIndex - The index of the target card.
  * @param {string | null} targetId - The target grid ID.
  */
  const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    if (pin?.[sourceIndex] || pin?.[targetIndex]) {
      return;
    }
    if (targetId) {
      const result = move(
        items?.[sourceId],
        items?.[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const tempArr = [...items.left];
    const temp = tempArr[sourceIndex];
    tempArr[sourceIndex] = tempArr[targetIndex];
    tempArr[targetIndex] = temp;
    return setItems({ ...items, [sourceId]: tempArr });
  }

  return (
    <>
      <GridContextProvider
        onChange={onChange}
        allowDropOutsideGrid={true}
        targetId="my-grid"
      >
        <div className="container">
          <GridDropZone
            className="dropzone left"
            id="left"
            boxesPerRow={3}
            rowHeight={250}
          >
            {items?.left?.map((item, key) => {
              //Not show card Minimize or remove
              if (minimize?.[key] || item?.name?.length === 0) {
                return (
                  <GridItem key={item.position} className="card-container">
                    <EmptyCard
                      _key={key}
                      minimize={minimize}
                      setAddPosition={setAddPosition}
                      item={item}
                    />
                  </GridItem>
                );
              }

              // Show card
              return (
                <GridItem key={item?.position} className="card-container">
                  <Card
                    _key={key}
                    pin={pin}
                    setPinIcon={setPinIcon}
                    UnpinIcon={UnpinIcon}
                    PinIcon={PinIcon}
                    setMinimize={setMinimize}
                    minimize={minimize}
                    setItems={setItems}
                    items={items}
                    item={item}
                  />
                </GridItem>
              );
            })}
          </GridDropZone>
        </div>
      </GridContextProvider>

      {/* Modal for add card */}
      <ModalCard
        addPosition={addPosition}
        setAddPosition={setAddPosition}
        title={title}
        setItems={setItems}
        items={items}
        setTitle={setTitle}
        widgetData={widgetData}
      />

      <MinimizeBar minimize={minimize} items={items} setMinimize={setMinimize} />
    </>
  );
}

export default React.memo(TabContent);

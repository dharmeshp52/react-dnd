import React from "react";
import TabContent from "./TabContent";
import "./tab.css";

/**
 * Tab component represents a single tab in the tab bar.
 * @param {object} props - The props passed to the component.
 * @param {string} props.name - The name of the tab.
 * @param {function} props.onClose - The function to close the tab.
 * @param {number} props.index - The index of the tab.
 * @param {number} props.activeTab - The index of the currently active tab.
 * @param {function} props.setActiveTab - The function to set the active tab.
 * @returns {JSX.Element} - The Tab component.
 */

const Tab = ({ name, onClose, index, activeTab, setActiveTab }) => {
  return (
    <>
      <li
        className={index === activeTab && "active"}
        onClick={(e) => {
          setActiveTab(index);
        }}
      >
        <div className="list-grid">
          {name} {index + 1}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClose(index);
            }}
          >
            X
          </div>{" "}
        </div>
        <div className={`site-content ${index === activeTab ? "" : "d-none"}`}>
          <TabContent activeTab={activeTab} />
        </div>
      </li>
    </>
  );
}

export default React.memo(Tab);

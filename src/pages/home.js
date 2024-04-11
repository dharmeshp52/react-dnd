import React, { useCallback, useState } from "react";
import Tab from "../components/tab/TabElement";
import "../styles/home.css";

/**
 * Home component represents the main home screen.
 * It displays a list of tabs and handles tab creation and closure.
 * @returns {JSX.Element} - The Home component.
 */

const Home = () => {
  const [tabsList, setTabList] = useState([{ name: "New Tab" }]);
  const [activeTab, setActiveTab] = useState(0);

  /**
 * Home component represents the main home screen.
 * It displays a list of tabs and handles tab creation and closure.
 * @returns {JSX.Element} - The Home component.
 */
  const onClose = useCallback((closeIndex) => {
    const newList = tabsList.filter((item, i) => i !== closeIndex);
    setTabList(newList);
    activeTab === closeIndex && setActiveTab(closeIndex - 1);
    activeTab - 1 === closeIndex && setActiveTab(activeTab - 1);
  },
    [tabsList, activeTab]
  );

  // Adds a new tab to the tabs list.
  const addElement = () => {
    setTabList([...tabsList, { name: "New Tab" }]);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="site-wrapper">
              <ul className="tabing-wraper">
                {tabsList?.map((item, i) => {
                  return (
                    <Tab
                      key={i}
                      name={item.name}
                      onClose={onClose}
                      setActiveTab={setActiveTab}
                      addElement={addElement}
                      index={i}
                      changeActiveTab={(val) => setActiveTab(val)}
                      activeTab={activeTab}
                    />
                  );
                })}
              </ul>
              <div className="custom-cta">
                <button
                  className="btn btn-primary w-50 mb-3"
                  onClick={() => addElement()}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

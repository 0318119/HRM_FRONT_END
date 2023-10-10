import React, { useState } from "react";
import '../tabs/tabs.css'

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <section className="tabsSectionDashboard">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="tabs col-md-12 col-sm-12">
              <ul className="tab-list">
                {tabs.map((tab, index) => (
                  <li
                    key={index}
                  className={index === activeTab ? "active" : ""}
                    onClick={() => handleTabClick(index)}
                  >
                    <span>{tab.title}</span>
                  </li>
                ))}
              </ul>
              <div className="tab-content">{tabs[activeTab].content}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default Tabs;

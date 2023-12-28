// import React, { useState } from "react";
// import "../TransactionAppointment/assets/css/transactionAppTabs.css";
// import {BsPrinterFill as Print_ico} from 'react-icons/bs'
// import {MdDelete as Delete_ico} from 'react-icons/md'

// const TransactionAppTabs = ({ tabs }) => {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };

//   return (
//     <div className="TransactionAppTabs">
//       <ul className="TransactionAppTabs-list">
//         {tabs.map((tab, index) => (
//           <li
//             key={index}
//             className={index === activeTab ? "active" : ""}
//             onClick={() => handleTabClick(index)}
//           >
//             {tab.title}
//           </li>
//         ))}
//         <li>
//           <span className="d-flex flex-column justify-content-center align-items-center">
//             <Print_ico />
//             Print{" "}
//           </span>
//         </li>
//         <li>
//           <span className="d-flex flex-column justify-content-center align-items-center">
//             <Delete_ico />
//             Delete{" "}
//           </span>
//         </li>
//       </ul>
//       <div className="TransactionAppTabs-content">
//         {tabs[activeTab].content}
//       </div>
//     </div>
//   );
// };

// export default TransactionAppTabs;

// components/TabHeader.jsx
const tabs = ["Home", "Transform", "Add Column", "View"];

const TabHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 font-medium hover:bg-gray-200 ${
            activeTab === tab
              ? "bg-white border-b-2 border-blue-500"
              : "bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabHeader;

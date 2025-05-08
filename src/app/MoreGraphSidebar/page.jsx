import React from 'react';

const MoreGraphSidebar = ({ onClose, setViewMode, selectedFile, data, selectedColumns, selectedChartId, onChangeAxis }) => {

  const columnOptions = data[selectedFile]?.columns || [];
  const selected = selectedColumns[selectedFile] || [];
  const selectedX = selected[0];
  const selectedY = selected[1];

  return (
    <div
      style={{
        position: 'fixed',
        top: '158px',
        right: 0,
        height: '32.3rem',
        width: '15rem',
        backgroundColor: '#fff',
        borderLeft: '1px solid #ccc',
        // boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
        zIndex: 20,
        padding: '16px',
      }}
    >
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="text-lg font-bold text-[#2B3A67] ">Graphs</h2>
        <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '18px' }}>✕</button>
      </div>

      <div 
        className="border-t pt-2"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
      >
        <button title="Table" onClick={() => {setViewMode("table")}}>
          <img 
            src="/table.png" alt="table" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          />
        </button>

        <button title="Bar Chart" onClick={() => {setViewMode("bar")}}>
          <img 
            src="/Bar-chart.png" alt="Bar chart" style={{ width: '35px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          /> 
        </button>

        <button title="Histogram" onClick={() => {setViewMode("histogram")}}>
          <img 
            src="/histogram.png" alt="Histogram" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          /> 
        </button>
        <button title="Line chart" onClick={() => {setViewMode("line")}}>
          <img 
            src="/Line-chart.png" alt="Line chart" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          />
        </button>

        <button title="Pie chart" onClick={() => {setViewMode("pie")}}>
          <img 
            src="/Pie-chart.png" alt="Pie chart" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          />
        </button>

        <button title="Bubble Chart" onClick={() => {setViewMode("bubble")}}>
        <img 
            src="/bubble-chart.png" alt="Bubble chart" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          />
        </button>

        <button title="Area Chart" onClick={() => {setViewMode("area")}}>
        <img 
            src="/area-graph.png" alt="Area chart" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          />
        </button>

        <button title="Scatter Plot" onClick={() => {setViewMode("scatter")}}>
        <img 
            src="/scatter-graph.png" alt="Scatter Plot" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          />
        </button>

        <button title="Treemap" onClick={() => {setViewMode("tree")}}>
        <img 
            src="/treemap-chart.png" alt="Treemap" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          />
        </button>

        <button title="Box plot" onClick={() => {setViewMode("boxplot")}}>
        <img 
            src="/boxplot.png" alt="Box plot" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          />
        </button>

        <button title="Heatmap" onClick={() => {setViewMode("heatmap")}}>
        <img 
            src="/heatmap.png" alt="Heatmap" style={{ width: '38px', height: 'auto' }} 
            className=" px-2 max-h-full object-contain "
          />
        </button>
     
      </div>

      <div 
        className="border-t pt-2 pb-3"
        style={{ marginTop: '24px' }}
      >
        <h4>Customize Graph</h4>
        <label>
          X Axis:
          <select
            style={{ width: '100%', marginTop: '4px' }}
            value={selectedX || ""}
            onChange={(e) => onChangeAxis(selectedChartId, "x", e.target.value)}
          >
            {columnOptions.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </label>
        <label style={{ marginTop: '12px', display: 'block' }}>
          Y Axis:
          <select
            style={{ width: '100%', marginTop: '4px' }}
            value={selectedY || ""}
            onChange={(e) => onChangeAxis(selectedChartId, "y", e.target.value)}
          >
            {columnOptions.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default MoreGraphSidebar;

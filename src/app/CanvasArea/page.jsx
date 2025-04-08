import React from 'react';
import Test from '../Test/page';

const CanvasArea = ({ showGrid, isLocked }) => {
    return (
      <div className="fixed w-full  h-full -ml-[0rem] border-gray-300 border-l-2 bg-white z-0">
        {/* Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 bg-[linear-gradient(#ccc_1px,transparent_1px),linear-gradient(90deg,#ccc_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none z-10" />
        )}
  
        {/* Canvas Content */}
        <div className="relative z-20 p-4">
          {isLocked && (
            <p className="text-red-500 font-semibold mt-2">Canvas is locked!</p>
          )}
        </div>
      </div>
    );
  };
  
  export default CanvasArea;
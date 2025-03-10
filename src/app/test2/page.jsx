"use client";

import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Maximize, Minimize, X } from "lucide-react";

export default function DraggableResizablePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const togglePopup = () => setIsOpen(!isOpen);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
    } else {
      setSize({ width: 400, height: 300 });
      setPosition({
        x: (window.innerWidth - 400) / 2,
        y: (window.innerHeight - 300) / 2,
      });
    }
    setIsFullScreen(!isFullScreen);
  };

  // ตั้ง popup ให้อยู่ตรงกลางเมื่อเปิด
  useEffect(() => {
    if (isOpen) {
      setPosition({
        x: (window.innerWidth - size.width) / 2,
        y: (window.innerHeight - size.height) / 2,
      });
    }
  }, [isOpen, size.width, size.height]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button onClick={togglePopup} className="px-4 py-2 bg-blue-500 text-white rounded">
        เปิด Popup
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <Rnd
            size={size}
            position={position}
            onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, pos) => {
              setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
              setPosition(pos);
            }}
            minWidth={300}
            minHeight={200}
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              topLeft: true,
              bottomRight: true,
              bottomLeft: true,
            }}
            disableDragging={isFullScreen}
            className="bg-white shadow-lg p-4 border rounded-lg"
          >
            <div className="flex justify-between items-center border-b pb-2 cursor-move">
              <h2 className="text-lg font-semibold">Popup</h2>
              <div className="flex gap-2">
                <button onClick={toggleFullScreen} className="p-1 text-gray-600 hover:text-black">
                  {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
                <button onClick={togglePopup} className="p-1 text-red-500 hover:text-red-700">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p>Popup สามารถลากและปรับขนาดจากทุกด้านได้</p>
            </div>
          </Rnd>
        </div>
      )}
    </div>
  );
}

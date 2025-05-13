'use client';
import { useEffect, useRef, useState } from 'react';
import 'webdatarocks/webdatarocks.css'; // default CSS

const PivotTableComponent = () => {
  const pivotRef = useRef(null);

  useEffect(() => {
    // Load theme CSS
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = 'https://cdn.webdatarocks.com/latest/theme/blue/webdatarocks.min.css';
    document.head.appendChild(themeLink);

    // Load WebDataRocks script
    const script = document.createElement('script');
    script.src = 'https://cdn.webdatarocks.com/latest/webdatarocks.js';
    script.onload = () => {
      const pivot = new window.WebDataRocks({
        container: "#pivot-container",
        toolbar: true,
        height: 500,
        theme: "blue",
      });
      pivotRef.current = pivot;
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="pivot-container" style={{ height: '500px', marginTop: '1rem' }} />
    </div>
  );
};

export default PivotTableComponent;

'use client';
import { useEffect, useRef, useState } from 'react';
import 'webdatarocks/webdatarocks.css';

const PivotTableComponent = () => {
  const pivotRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.webdatarocks.com/latest/webdatarocks.js';
    script.onload = () => {
      // eslint-disable-next-line no-undef
      const pivot = new window.WebDataRocks({
        container: "#pivot-container",
        toolbar: true,
        height: 500,
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

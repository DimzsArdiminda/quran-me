'use client';

import React, { useState, useEffect } from 'react';
import Home from './component/Home';
import Footer from './component/Footer';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <button type="button" className="btn loading">Loading...</button>
        </div>
      ) : (
        <>
          <Home />
          <Footer />
        </>
      )}
    </div>
  );
}

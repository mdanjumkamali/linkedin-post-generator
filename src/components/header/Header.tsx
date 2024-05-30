import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-center max-w-screen-xl mx-auto my-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
          LinkedIn Post Generator
        </h1>
        <p className="text-lg md:text-xl text-center">
          Boost your LinkedIn presence with our Post Generator
        </p>
      </div>
    </div>
  );
};

export default Header;

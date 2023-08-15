import React from "react";

const SocialIcons = ({ Icons, title }) => {
  return (
    <div className="text-bleu2">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {Icons.map((icon) => (
        <span
          key={icon.name}
          className="p-2 cursor-pointer inline-flex items-center
          mx-1.5 text-xl hover:text-gray-100 hover:bg-bleu2
          duration-300"
        >
          <ion-icon name={icon.name}></ion-icon>
        </span>
      ))}
    </div>
  );
};

export default SocialIcons;

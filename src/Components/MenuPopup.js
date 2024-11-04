import ReactDOM from 'react-dom';

const MenuPopup = ({ open, position, menuTitle , isSubMenu = false }) => {
  if (!open) return null;

  // Styles dynamiques pour le positionnement
  const popupStyles = {
    position: 'absolute',
    top: isSubMenu ? position.top  : position.top,
    left: position.left + 14,
    transform: 'translateX(0)',
    visibility: open ? 'visible' : 'hidden',
    opacity: open ? 1 : 0,
    transition: 'opacity 0.3s, transform 0.3s',
  };

  return ReactDOM.createPortal(
    <div style={popupStyles} className="z-[1000] max-h-[30px] flex items-center justify-center">
      <div className="bg-[#334081] w-auto h-[30px] rounded-[6px] px-[18px] py-[3px] flex items-center">
        <div style={{ whiteSpace: 'nowrap' }} className="text-center text-white-A700 text-sm font-dm-sans-regular">
          {menuTitle}
        </div>
      </div>
    </div>,
    document.getElementById('popup-root')
  );
};

export default MenuPopup;
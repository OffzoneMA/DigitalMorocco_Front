import Item from "./Item";
import SocialIcons from "./SocialIcons";
import { About, Solution, Ressources, Help, Icons } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:px-72 px-5 py-16 ">
      <Item Links={About} title="About" />
      <Item Links={Solution} title="Solution" />
      <Item Links={Ressources} title="Ressources" />
      <Item Links={Help} title="Help" />
      <SocialIcons Icons={Icons} title="Stay Tuned"></SocialIcons>
     
    </div>
  );
};

export default ItemsContainer;
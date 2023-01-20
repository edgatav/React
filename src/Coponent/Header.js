
import rickandmorty from "./rickandmorty.png";
import "./Header.css";

import LogoutButton from "./BoutonHeader";

function Header(){

return(

  
<div >  
      <img  class="imghead" src = {rickandmorty} />
      <LogoutButton/>
     

</div>
);
}
export default Header;
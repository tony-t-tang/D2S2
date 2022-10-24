import React, {useState} from 'react'
import '../Assets/Styles/Searchbar.css';

 const Searchbar = () => {
 const [searchInput, setSearchInput] = useState("");

 const Icons = [
  
  { name: "Back", IconID: "1" },
  { name: "Profile", IconID: "2" },

];

const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
};

if (searchInput.length > 0) {
    Icons.filter((Icons) => {
    return Icons.name.match(searchInput);
});
}

return <div>

<input
   type="search"
   placeholder="Search..."
   onChange={handleChange}
   value={searchInput} 
   />

<table>
 

{Icons.map((Icons, index) => {



})}
</table>

</div>


};

export default Searchbar;
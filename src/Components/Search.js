import { SignalCellularConnectedNoInternet0BarSharp } from '@mui/icons-material';
import React, {useState} from 'react'
import '../Assets/Styles/Searchbar.css';
const Search = () => {

 const [searchInput, setSearchInput] = useState("");

 const Icons = [
  
  { name: "Search", IconID: "1" },
  { name: "Square", IconID: "2" },

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
   value={searchInput} />

<table>
  <tr>
    <th>Icon</th>
    <th>Name</th>
  </tr>

{Icons.map((Icons, index) => {

<div>
  <tr>
    <td>{Icons.name}</td>
    <td>{Icons.IconID}</td>
  </tr>
</div>

})}
</table>

</div>


};

export default Search;
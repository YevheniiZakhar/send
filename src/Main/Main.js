import React, {useState, useEffect} from 'react';
import Search from '../Search/Search';
import AdList from './AdList';


export default function Main() {
  const [searchInput, setSearchInput] = useState('');
  const [searchLocality, setSearchLocality] = useState(0);
  
  useEffect(() => {
    document.title = 'Сайт безкоштовних оголошень №1 в Україні';
  }, [])

  const handleSearch = (searchValue, searchLocality) => {
    setSearchInput(searchValue);
    setSearchLocality(searchLocality);
  }

  return (
    <div>
      <Search onSearchChange={handleSearch} />
      <AdList searchInput={searchInput} searchLocality={searchLocality} />
    </div>
  )
}

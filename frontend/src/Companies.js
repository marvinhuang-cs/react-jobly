import React, {useState, useEffect} from 'react';
import JoblyApi from './Api';
import CardList from "./CardList";
import Search from './Search'
import './Companies.css'

//gets companies from API and passes it down to cardlist to display along with search bar
function Companies() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getCompanies() {
          let companies = await JoblyApi.getCompanies();
          setCompanies(companies);
        }
    
        getCompanies();
      }, []);

    async function handleSearch(search) {
      let companies = await JoblyApi.getCompanies(search);
      setCompanies(companies);
    }

    return (
        <div className="companies">
            <Search endpoint="companies" handleSearch={handleSearch}/>
            <CardList cards={companies} />
        </div>
    )
}

export default Companies

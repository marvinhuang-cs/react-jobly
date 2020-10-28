import React, {useState} from 'react'
import './Search.css'

function Search({handleSearch}) {
    const [search, setSearch] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        handleSearch(search);
    }

    function handleChange(e) {
        setSearch(e.target.value)
    }

    return (
        <div className="search__container">
            <form className="search__form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter search term" className="search__term" onChange={handleChange}></input>
                <button className="search__button">Search</button>
            </form>
        </div>
    )
}

export default Search

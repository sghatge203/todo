import React from 'react';
import { Form } from 'react-bootstrap';
import SearchInput from 'react-search-input'

const Search = (props) => {
    const { handleSearch } = props;
    return (
        <div className="search-component">
            <SearchInput className="search-input" placeholder="Search Tasks" onChange={handleSearch} />
        </div>
    )
}
export default Search;
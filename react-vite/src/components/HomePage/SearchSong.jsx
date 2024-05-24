import { useState } from "react"
import "./SearchSong.css"
const SearchSong = ({onSearch}) => {
    //query state
    const [query, setQuery] = useState("")

    // handle input function 
    const handleInputChange = (e)=> {
        setQuery(e.target.value)
    }
    // handle search om sumbit
    const handleSearch = (e) => {
        e.preventDefault()
        onSearch(query)

    }

    return (
        <form className="search-form" onSubmit={handleSearch}>
            <input type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for songs"
            className="search-input"
            
            />
            <button type="submit" className="search-button">Search</button>

        </form>
    )

}
export default SearchSong
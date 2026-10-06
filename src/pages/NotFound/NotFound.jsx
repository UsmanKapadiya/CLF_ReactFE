import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaTitle from '../../components/MetaTags/MetaTags';
import './NotFound.css';

// Where the search box sends people. Change this if your search lives elsewhere.
const SEARCH_PATH = '/news';

function NotFound() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const q = query.trim();
        if (!q) return;
        navigate(`${SEARCH_PATH}?search=${encodeURIComponent(q)}`);
    };

    return (
        <section className="not-found-page">
            <MetaTitle pageTitle="Page Not Found | Clf Canada" />

            <div className="not-found-title-bar">
                <h1>Oops! 404</h1>
            </div>

            <p className="not-found-text">
                Oh, no! The page you requested could not be found. Perhaps searching will help...
            </p>

            <form className="not-found-search" onSubmit={handleSearch} role="search">
                <label htmlFor="not-found-search-input" className="visually-hidden">
                    Search
                </label>
                <input
                    id="not-found-search-input"
                    type="search"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </section>
    );
}

export default NotFound;
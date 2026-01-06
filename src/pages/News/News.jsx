import { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './News.css';
import Title from '../../assets/news_title.png';
// import { newsData } from '../../constants/newsData';
import Pagination from '../../components/Pagination/Pagination';
import MetaTitle from '../../components/MetaTags/MetaTags';
import { getAllNews } from '../../services/ApiServices';

// const ITEMS_PER_PAGE = 1;
const RECENT_NEWS_COUNT = 5;
const TRUNCATE_LENGTH = 300;

function News() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(1);
    const [selectedNews, setSelectedNews] = useState(null);
    const [newsData, setNewsData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            const res = await getAllNews(currentPage, itemsPerPage)
            if (res.success) {
                setNewsData(res.data?.data || []);
                setTotalPage(res?.data?.totalpages || 1);
                setError('');
            } else {
                setNewsData([]);
                setError(res.error || 'Failed to fetch news. Please try again.');
            }
        };
        fetchNews();
    }, [currentPage, itemsPerPage]);
    
    // Sort news by date (most recent first) - memoized
    const sortedNews = useMemo(
        () => [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date)),
        [newsData]
    );

    // Get top 5 news for sidebar - memoized
    const recentNews = useMemo(
        () => sortedNews.slice(0, RECENT_NEWS_COUNT),
        [sortedNews]
    );

    // Use API's totalpages for pagination
    const totalPages = totalPage;
    const currentNews = sortedNews;
    // Format date to URL parts - useCallback for stable reference
    const formatDateToUrl = useCallback((dateString) => {
        const date = new Date(dateString);
        return {
            year: date.getFullYear(),
            month: String(date.getMonth() + 1).padStart(2, '0'),
            day: String(date.getDate()).padStart(2, '0')
        };
    }, []);

    // Strip HTML tags and truncate description - useCallback for stable reference
    const truncateText = useCallback((text, maxLength = TRUNCATE_LENGTH) => {
        // Remove HTML tags
        const plainText = text.replace(/<[^>]*>/g, '');
        if (plainText.length <= maxLength) return plainText;
        return `${plainText.substring(0, maxLength).trim()}[...]`;
    }, []);

    // Handle page change - useCallback for stable reference
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        navigate('/news');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigate]);

    // Handle read more navigation - useCallback for stable reference
    const handleReadMore = useCallback((news) => {
        const { year, month, day } = formatDateToUrl(news.date);
        navigate(`/news/${year}/${month}/${day}/${news.slug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigate, formatDateToUrl]);

    // Handle URL parameters to show specific news
    useEffect(() => {
        if (slug) {
            const news = sortedNews.find(n => n.slug === slug);
            setSelectedNews(news || null);
        } else {
            setSelectedNews(null);
        }
    }, [slug, sortedNews]);

    // Render sidebar item
    const renderSidebarItem = useCallback((news) => (
        <div key={news.id} className="sidebar-section">
            <div
                className="sidebar-item"
                onClick={() => handleReadMore(news)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleReadMore(news)}
            >
                {news.title}
            </div>
        </div>
    ), [handleReadMore]);

    // Render news item in list
    const renderNewsItem = useCallback((news) => (
        <article key={news.id} className="news-item">
            <h2
                className="news-item-title"
                onClick={() => handleReadMore(news)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleReadMore(news)}
            >
                {news.title}
            </h2>
            <time className="news-item-date" dateTime={news.date}>
                {news.date}
            </time>
            <p className="news-item-description">
                {truncateText(news.description)}
            </p>
            <a
                className="read-more-link"
                onClick={() => handleReadMore(news)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleReadMore(news)}
            >
                Read More »
            </a>
        </article>
    ), [handleReadMore, truncateText]);

    return (
        <div className="news-page">
            <MetaTitle pageTitle={selectedNews ? `${selectedNews.title} | 振江武術館` : 'News振江武術館 | Clf Canada'} />
            <section className="clf_page_title">
                <img src={Title} alt="CLF Kung Fu Club news banner" />
            </section>

            <div className="news-container">
                <div className="news-layout">
                    {/* Left Sidebar - Top 5 Recent News */}
                    {(!error && newsData.length > 0) && (
                        <aside className="news-sidebar" aria-label="Recent news">
                            <div className="sidebar-category">
                                <h2 className="sidebar-title">RECENT NEWS</h2>
                                <nav className="sidebar-list" aria-label="Recent news navigation">
                                    {recentNews.map(renderSidebarItem)}
                                </nav>
                            </div>
                        </aside>
                    )}

                    {/* Main Content */}
                    {error ? (
                        <div className="news-errors-message news-full-width">{error}</div>
                    ) : newsData.length === 0 ? (
                        <div className="news-empty-message news-full-width" style={{ color: '#555', textAlign: 'center', margin: '40px 0', fontSize: '1.1rem' }}>No news found.</div>
                    ) : (
                        <main className="news-content">
                            {selectedNews ? (
                                <article className="news-detail">
                                    <h1 className="news-item-title">
                                        {selectedNews.title}
                                    </h1>
                                    <time className="news-item-date" dateTime={selectedNews.date}>
                                        {selectedNews.date}
                                    </time>
                                    <div
                                        className="news-detail-description"
                                        dangerouslySetInnerHTML={{ __html: selectedNews.description }}
                                    />
                                </article>
                            ) : (
                                <>
                                    <div className="news-list">
                                        {currentNews.map(renderNewsItem)}
                                    </div>

                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </>
                            )}
                        </main>
                    )}
                </div>
            </div>
        </div>
    );
}

export default News;

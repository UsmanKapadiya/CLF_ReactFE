import { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './News.css';
import Title from '../../assets/news_title.png';
import { NEWS_DATA } from '../../constants/newsData';
import Pagination from '../../components/Pagination/Pagination';

const ITEMS_PER_PAGE = 5;
const RECENT_NEWS_COUNT = 5;
const TRUNCATE_LENGTH = 300;

function News() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNews, setSelectedNews] = useState(null);

    // Sort news by date (most recent first) - memoized
    const sortedNews = useMemo(
        () => [...NEWS_DATA].sort((a, b) => new Date(b.date) - new Date(a.date)),
        []
    );

    // Get top 5 news for sidebar - memoized
    const recentNews = useMemo(
        () => sortedNews.slice(0, RECENT_NEWS_COUNT),
        [sortedNews]
    );

    // Pagination calculations - memoized
    const { totalPages, currentNews } = useMemo(() => {
        const total = Math.ceil(sortedNews.length / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const news = sortedNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
        return { totalPages: total, currentNews: news };
    }, [sortedNews, currentPage]);

    // Format date to URL parts - useCallback for stable reference
    const formatDateToUrl = useCallback((dateString) => {
        const date = new Date(dateString);
        return {
            year: date.getFullYear(),
            month: String(date.getMonth() + 1).padStart(2, '0'),
            day: String(date.getDate()).padStart(2, '0')
        };
    }, []);

    // Truncate description - useCallback for stable reference
    const truncateText = useCallback((text, maxLength = TRUNCATE_LENGTH) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength).trim()}[...]`;
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
            <section className="clf_page_title">
                <img src={Title} alt="CLF Kung Fu Club news banner" />
            </section>

            <div className="news-container">
                <div className="news-layout">
                    {/* Left Sidebar - Top 5 Recent News */}
                    <aside className="news-sidebar" aria-label="Recent news">
                        <div className="sidebar-category">
                            <h2 className="sidebar-title">RECENT NEWS</h2>
                            <nav className="sidebar-list" aria-label="Recent news navigation">
                                {recentNews.map(renderSidebarItem)}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
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
                </div>
            </div>
        </div>
    );
}

export default News;

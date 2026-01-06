import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import './NewsCarousel.css';
// import { NewsData } from '../../constants/newsData';

const TRUNCATE_LENGTH = 300;

function NewsCarousel({ newsData, error }) {
        // Helper to format date for URL
        const formatDateToUrl = useCallback((dateString) => {
            const date = new Date(dateString);
            return {
                year: date.getFullYear(),
                month: String(date.getMonth() + 1).padStart(2, '0'),
                day: String(date.getDate()).padStart(2, '0')
            };
        }, []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');

    // Sort news by date (most recent first) - memoized
    const sortedNews = useMemo(
        () => [...(newsData || [])].sort((a, b) => new Date(b.date) - new Date(a.date)),
        [newsData]
    );

    const handlePrev = useCallback(() => {
        setDirection('prev');
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? sortedNews.length - 1 : prevIndex - 1
        );
    }, [sortedNews.length]);

    const handleNext = useCallback(() => {
        setDirection('next');
        setCurrentIndex((prevIndex) =>
            prevIndex >= sortedNews.length - 1 ? 0 : prevIndex + 1
        );
    }, [sortedNews.length]);

    const displayedNews = useMemo(() => [
        sortedNews[currentIndex % sortedNews.length],
        sortedNews[(currentIndex + 1) % sortedNews.length]
    ], [currentIndex, sortedNews]);

    const truncateText = useCallback((text, maxLength = TRUNCATE_LENGTH) => {
        // Remove HTML tags
        const plainText = text.replace(/<[^>]*>/g, '');
        if (plainText.length <= maxLength) return plainText;
        return `${plainText.substring(0, maxLength).trim()}[...]`;
    }, []);

    if (error) {
        return (
            <div className="news-carousel">
                <div className="news-header">
                    <h2>
                        <span className="underline-text">LAT</span>EST NEWS
                    </h2>
                </div>
                <div className="news-error-message">
                    <p>{error}</p>
                </div>
            </div>
        );
    }
    if (!sortedNews || sortedNews.length === 0) {
        return (
            <div className="news-carousel">
                <div className="news-header">
                    <h2>
                        <span className="underline-text">LAT</span>EST NEWS
                    </h2>
                </div>
                <div className="news-empty-message">
                    <p>No news available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="news-carousel">
            <div className="news-header">
                <h2>
                    <span className="underline-text">LAT</span>EST NEWS
                </h2>
                <div className="news-controls">
                    <button
                        className="arrow-btn"
                        onClick={handlePrev}
                        aria-label="Previous news"
                        type="button"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        className="arrow-btn"
                        onClick={handleNext}
                        aria-label="Next news"
                        type="button"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`news-grid ${direction}`} key={currentIndex}>
                {displayedNews.map((news) => (
                    <article key={news._id} className="post group post-container">
                        <div className="post-intro post-intro-homepage">
                            <h2>
                                <a href={(() => {
                                    if (!news?.date || !news?.slug) return '#';
                                    const { year, month, day } = formatDateToUrl(news.date);
                                    return `/news/${year}/${month}/${day}/${news.slug}`;
                                })()}
                                >{news?.title}</a>
                            </h2>
                            <time className="news-item-date" dateTime={news?.date}>
                                {news?.date ? new Date(news.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase() : ''}
                            </time>
                        </div>
                        <div className="news-content">
                            <p className="news-item-description">
                                {truncateText(news?.description)}
                            </p>
                            {/* <div
                                className="news-detail-description"
                                dangerouslySetInnerHTML={{ __html: news.description }}
                            /> */}
                        </div>
                        <div className="news-footer">
                            <a
                                href={(() => {
                                    if (!news?.date || !news?.slug) return '#';
                                    const { year, month, day } = formatDateToUrl(news.date);
                                    return `/news/${year}/${month}/${day}/${news.slug}`;
                                })()}
                                className="read-more-btn"
                            >
                                Read More »
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

NewsCarousel.propTypes = {
    newsData: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
        })
    ),
    error: PropTypes.string
};

export default NewsCarousel;

import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import './NewsCarousel.css';
import { NEWS_DATA } from '../../constants/newsData';

function NewsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');

    const handlePrev = useCallback(() => {
        setDirection('prev');
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? NEWS_DATA.length - 1 : prevIndex - 1
        );
    }, []);

    const handleNext = useCallback(() => {
        setDirection('next');
        setCurrentIndex((prevIndex) =>
            prevIndex >= NEWS_DATA.length - 1 ? 0 : prevIndex + 1
        );
    }, []);

    const displayedNews = useMemo(() => [
        NEWS_DATA[currentIndex % NEWS_DATA.length],
        NEWS_DATA[(currentIndex + 1) % NEWS_DATA.length]
    ], [currentIndex]);

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
                    <article key={news.id} className="post group post-container">
                        <div className="post-intro post-intro-homepage">
                            <h2>
                                <a href={`/news/${news.id}`}>{news.title}</a>
                            </h2>
                            <time className="news-date" dateTime={news.date}>
                                {news.date}
                            </time>
                        </div>
                        <div className="news-content">
                            <p className="news-description pl-0 pr-0">{news.description}</p>
                        </div>
                        <div className="news-footer">
                            <a href={`/news/${news.id}`} className="read-more-btn">
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
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
        })
    )
};

export default NewsCarousel;

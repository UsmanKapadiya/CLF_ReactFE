import { useState } from 'react';
import './NewsCarousel.css';

function NewsCarousel() {
    const newsData = [
        {
            id: 1,
            title: "Tai Chi Five Movements and Kung Fu Intro",
            description: "With Sifu Paul Tam and CLF Kung Fu Club, no experience necessary. pre-register with the Mount Pleasant CC required. Date: Oct 12, 2025 Time: 11:30 am Register Here: Click Here For more info, please email mountpleasanttaichi@gmail.com.",
            date: "DECEMBER 5, 2025"
        },
        {
            id: 2,
            title: "Seniors: Warm up and Light Exercise",
            description: "With Sifu Paul Tam and CLF Kung Fu Club, no experience necessary. pre-register with the Mount Pleasant CC required. Date: Oct 12, 2025 Time: 9:15 am Register here: Click Here For more info, please email mountpleasanttaichi@gmail.com.With Sifu Paul Tam and CLF Kung Fu Club, no experience necessary. pre-register with the Mount Pleasant CC required. Date: Oct 12, 2025 Time: 9:15 am Register here: Click Here For more info, please email mountpleasanttaichi@gmail.com.",
            date: "DECEMBER 8, 2025"
        },
        {
            id: 3,
            title: "Championship Tournament Success",
            description: "Congratulations to our students who won medals.",
            date: "NOVEMBER 28, 2025"
        },
        {
            id: 4,
            title: "Holiday Schedule Announcement",
            description: "Please note our modified schedule during the holiday season. Check the calendar for specific dates.",
            date: "DECEMBER 15, 2025"
        },
        {
            id: 5,
            title: "Guest Master Workshop",
            description: "We're honored to host Master Chen for a special workshop on traditional forms and applications.",
            date: "JANUARY 10, 2026"
        },
        {
            id: 6,
            title: "New Training Center Opening",
            description: "We're expanding! Our new location in the downtown area will open next month with extended hours.",
            date: "JANUARY 20, 2026"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');

    const handlePrev = () => {
        setDirection('prev');
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? newsData.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setDirection('next');
        setCurrentIndex((prevIndex) =>
            prevIndex >= newsData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const displayedNews = [
        newsData[currentIndex % newsData.length],
        newsData[(currentIndex + 1) % newsData.length]
    ];

    return (
        <div className="news-carousel">
            <div className="news-header">
                <h2><span className="underline-text">LAT</span>EST NEWS</h2>
                <div className="news-controls">
                    <button className="arrow-btn" onClick={handlePrev} aria-label="Previous news">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button className="arrow-btn" onClick={handleNext} aria-label="Next news">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`news-grid ${direction}`} key={currentIndex}>
                {displayedNews.map((news) => (
                    <div key={news.id} className="post group post-container">
                        <div className='post-intro post-intro-homepage'>
                            <h2 className=""><a href="#">{news.title}</a></h2>
                            <div className="news-date">{news.date}</div>
                        </div>
                        <div className="news-content">
                        <p className="news-description pl-0 pr-0">{news.description}</p>
                        </div>
                        <div className="news-footer">
                        <a href="#" className="read-more-btn">Read More »</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsCarousel;

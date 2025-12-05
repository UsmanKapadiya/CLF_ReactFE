import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './Gallery.css';
import Title from '../../assets/title.png';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { GALLERY_CATEGORIES, galleryVideos, galleryPhotos } from '../../constants/galleryData';

/* Removed embedded data - now imported from constants/galleryData.js 
const galleryVideos = [
    {
        id: 1,
        videoUrl: 'https://www.youtube.com/embed/W_Owf2Kybgw',
        thumbnail: videoThumbnail,
        title: 'Kung Fu Training Session 2024',
        description: 'Advanced training techniques'
    },
    {
        id: 2,
        videoUrl: 'https://www.youtube.com/embed/SBXGAmxwfx8',
        thumbnail: videoThumbnail,
        title: 'Competition Highlights 2024',
        description: 'Annual tournament highlights'
    },
    {
        id: 3,
        videoUrl: 'https://www.youtube.com/embed/rQXHoU0AUi8',
        thumbnail: videoThumbnail,
        title: 'Student Performance 2023',
        description: 'Student demonstration'
    },
    {
        id: 4,
        videoUrl: 'https://www.youtube.com/embed/kgLwSTRUqtg',
        thumbnail: videoThumbnail,
        title: 'Competition Highlights 2024',
        description: 'Annual tournament highlights'
    },
    {
        id: 5,
        videoUrl: 'https://www.youtube.com/embed/jnQVSE1jVI4',
        thumbnail: videoThumbnail,
        title: 'Student Performance 2023',
        description: 'Student demonstration'
    },
];

// Gallery Photos Data - Organized by Year
const galleryPhotos = {
    '2025': [
        {
            title: '2025 Annual BBQ',
            subTitle: 'Richmond',
            catalogThumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_17_10-16-2025-438x246.jpg',
            photos: [
                { id: 1, src: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_01-400x246.jpg', alt: 'Training 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_01-400x246.jpg', title: 'Training Session' },
                { id: 2, src: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_02-400x246.jpg', alt: 'Competition 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_02-400x246.jpg', title: 'Competition Event' },
                { id: 3, src: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_07-400x246.jpg', thumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_07-400x246.jpg', title: 'Special Event' },
                { id: 4, src: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_05_10-16-2025-438x246.jpg', thumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_05_10-16-2025-438x246.jpg', title: 'Special Event' },
                { id: 5, src: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_01_10-16-2025-438x246.jpg', alt: 'Training 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_01_10-16-2025-438x246.jpg', title: 'Training Session' },
                { id: 6, src: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_03_10-16-2025-438x246.jpg', alt: 'Competition 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_03_10-16-2025-438x246.jpg', title: 'Competition Event' },
                { id: 7, src: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_07-400x246.jpg', thumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_07-400x246.jpg', title: 'Special Event' },
                { id: 8, src: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_05_10-16-2025-438x246.jpg', thumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_05_10-16-2025-438x246.jpg', title: 'Special Event' },

            ]
        },
        {
            title: '2025 Lion Dance',
            subTitle: 'Crystal Mall',
            catalogThumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/crystalm_17-400x246.jpg',
            photos: [
                { id: 4, src: '/images/2025/lion1.jpg', alt: 'Lion Dance 2025', thumbnail: '/images/2025/lion1-thumb.jpg', title: 'Lion Dance Performance' },
                { id: 5, src: '/images/2025/lion2.jpg', alt: 'Lion Dance 2025', thumbnail: '/images/2025/lion2-thumb.jpg', title: 'Crystal Mall Event' },
                { id: 6, src: '/images/2025/lion3.jpg', alt: 'Lion Dance 2025', thumbnail: '/images/2025/lion3-thumb.jpg', title: 'Traditional Performance' },
            ]
        }
    ],
    '2024': [
        {
            title: 'Gallery 2024',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2024/year-thumb.jpg',
            photos: [
                { id: 7, src: '/images/2024/photo1.jpg', alt: 'Training 2024', thumbnail: '/images/2024/thumb1.jpg', title: 'Training Session' },
                { id: 8, src: '/images/2024/photo2.jpg', alt: 'Competition 2024', thumbnail: '/images/2024/thumb2.jpg', title: 'Competition Event' },
                { id: 9, src: '/images/2024/photo3.jpg', alt: 'Event 2024', thumbnail: '/images/2024/thumb3.jpg', title: 'Special Event' },
                { id: 10, src: '/images/2024/photo4.jpg', alt: 'Tournament 2024', thumbnail: '/images/2024/thumb4.jpg', title: 'Tournament' },
            ]
        }
    ],
    '2023': [
        {
            title: 'Gallery 2023',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2023/year-thumb.jpg',
            photos: [
                { id: 11, src: '/images/2023/photo1.jpg', alt: 'Training 2023', thumbnail: '/images/2023/thumb1.jpg', title: 'Training Session' },
                { id: 12, src: '/images/2023/photo2.jpg', alt: 'Competition 2023', thumbnail: '/images/2023/thumb2.jpg', title: 'Competition Event' },
                { id: 13, src: '/images/2023/photo3.jpg', alt: 'Event 2023', thumbnail: '/images/2023/thumb3.jpg', title: 'Special Event' },
            ]
        }
    ],
    '2022': [
        {
            title: 'Gallery 2022',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2022/year-thumb.jpg',
            photos: [
                { id: 14, src: '/images/2022/photo1.jpg', alt: 'Training 2022', thumbnail: '/images/2022/thumb1.jpg', title: 'Training Session' },
                { id: 15, src: '/images/2022/photo2.jpg', alt: 'Competition 2022', thumbnail: '/images/2022/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2021': [
        {
            title: 'Gallery 2021',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2021/year-thumb.jpg',
            photos: [
                { id: 16, src: '/images/2021/photo1.jpg', alt: 'Training 2021', thumbnail: '/images/2021/thumb1.jpg', title: 'Training Session' },
                { id: 17, src: '/images/2021/photo2.jpg', alt: 'Competition 2021', thumbnail: '/images/2021/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2020': [
        {
            title: 'Gallery 2020',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2020/year-thumb.jpg',
            photos: [
                { id: 18, src: '/images/2020/photo1.jpg', alt: 'Training 2020', thumbnail: '/images/2020/thumb1.jpg', title: 'Training Session' },
                { id: 19, src: '/images/2020/photo2.jpg', alt: 'Competition 2020', thumbnail: '/images/2020/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2019': [
        {
            title: 'Gallery 2019',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2019/year-thumb.jpg',
            photos: [
                { id: 20, src: '/images/2019/photo1.jpg', alt: 'Training 2019', thumbnail: '/images/2019/thumb1.jpg', title: 'Training Session' },
                { id: 21, src: '/images/2019/photo2.jpg', alt: 'Competition 2019', thumbnail: '/images/2019/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2018': [
        {
            title: 'Gallery 2018',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2018/year-thumb.jpg',
            photos: [
                { id: 22, src: '/images/2018/photo1.jpg', alt: 'Training 2018', thumbnail: '/images/2018/thumb1.jpg', title: 'Training Session' },
                { id: 23, src: '/images/2018/photo2.jpg', alt: 'Competition 2018', thumbnail: '/images/2018/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2017': [
        {
            title: 'Gallery 2017',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2017/year-thumb.jpg',
            photos: [
                { id: 24, src: '/images/2017/photo1.jpg', alt: 'Training 2017', thumbnail: '/images/2017/thumb1.jpg', title: 'Training Session' },
                { id: 25, src: '/images/2017/photo2.jpg', alt: 'Competition 2017', thumbnail: '/images/2017/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2016': [
        {
            title: 'Gallery 2016',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2016/year-thumb.jpg',
            photos: [
                { id: 26, src: '/images/2016/photo1.jpg', alt: 'Training 2016', thumbnail: '/images/2016/thumb1.jpg', title: 'Training Session' },
                { id: 27, src: '/images/2016/photo2.jpg', alt: 'Competition 2016', thumbnail: '/images/2016/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2015': [
        {
            title: 'Gallery 2015',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2015/year-thumb.jpg',
            photos: [
                { id: 28, src: '/images/2015/photo1.jpg', alt: 'Training 2015', thumbnail: '/images/2015/thumb1.jpg', title: 'Training Session' },
                { id: 29, src: '/images/2015/photo2.jpg', alt: 'Competition 2015', thumbnail: '/images/2015/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2014': [
        {
            title: 'Gallery 2014',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2014/year-thumb.jpg',
            photos: [
                { id: 30, src: '/images/2014/photo1.jpg', alt: 'Training 2014', thumbnail: '/images/2014/thumb1.jpg', title: 'Training Session' },
                { id: 31, src: '/images/2014/photo2.jpg', alt: 'Competition 2014', thumbnail: '/images/2014/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2013': [
        {
            title: 'Gallery 2013',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2013/year-thumb.jpg',
            photos: [
                { id: 32, src: '/images/2013/photo1.jpg', alt: 'Training 2013', thumbnail: '/images/2013/thumb1.jpg', title: 'Training Session' },
                { id: 33, src: '/images/2013/photo2.jpg', alt: 'Competition 2013', thumbnail: '/images/2013/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2012': [
        {
            title: 'Gallery 2012',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2012/year-thumb.jpg',
            photos: [
                { id: 34, src: '/images/2012/photo1.jpg', alt: 'Training 2012', thumbnail: '/images/2012/thumb1.jpg', title: 'Training Session' },
                { id: 35, src: '/images/2012/photo2.jpg', alt: 'Competition 2012', thumbnail: '/images/2012/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2011': [
        {
            title: 'Gallery 2011',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2011/year-thumb.jpg',
            photos: [
                { id: 36, src: '/images/2011/photo1.jpg', alt: 'Training 2011', thumbnail: '/images/2011/thumb1.jpg', title: 'Training Session' },
                { id: 37, src: '/images/2011/photo2.jpg', alt: 'Competition 2011', thumbnail: '/images/2011/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2010': [
        {
            title: 'Gallery 2010',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2010/year-thumb.jpg',
            photos: [
                { id: 38, src: '/images/2010/photo1.jpg', alt: 'Training 2010', thumbnail: '/images/2010/thumb1.jpg', title: 'Training Session' },
                { id: 39, src: '/images/2010/photo2.jpg', alt: 'Competition 2010', thumbnail: '/images/2010/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2009': [
        {
            title: 'Gallery 2009',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2009/year-thumb.jpg',
            photos: [
                { id: 40, src: '/images/2009/photo1.jpg', alt: 'Training 2009', thumbnail: '/images/2009/thumb1.jpg', title: 'Training Session' },
                { id: 41, src: '/images/2009/photo2.jpg', alt: 'Competition 2009', thumbnail: '/images/2009/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2008': [
        {
            title: 'Gallery 2008',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2008/year-thumb.jpg',
            photos: [
                { id: 42, src: '/images/2008/photo1.jpg', alt: 'Training 2008', thumbnail: '/images/2008/thumb1.jpg', title: 'Training Session' },
                { id: 43, src: '/images/2008/photo2.jpg', alt: 'Competition 2008', thumbnail: '/images/2008/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2007': [
        {
            title: 'Gallery 2007',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2007/year-thumb.jpg',
            photos: [
                { id: 44, src: '/images/2007/photo1.jpg', alt: 'Training 2007', thumbnail: '/images/2007/thumb1.jpg', title: 'Training Session' },
                { id: 45, src: '/images/2007/photo2.jpg', alt: 'Competition 2007', thumbnail: '/images/2007/thumb2.jpg', title: 'Competition Event' },
            ]
        }
    ],
    '2006': [
        {
            title: 'Gallery 2006',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2006/year-thumb.jpg',
            photos: [
                { id: 46, src: '/images/2006/photo1.jpg', alt: 'Training 2006', thumbnail: '/images/2006/thumb1.jpg', title: 'Training Session' },
                { id: 47, src: '/images/2006/photo2.jpg', alt: 'Competition 2006', thumbnail: '/images/2006/thumb2.jpg', title: 'Competition Event' },
*/

function Gallery() {
    const location = useLocation();
    
    // Memoize computed values
    const years = useMemo(() => Object.keys(galleryPhotos).sort((a, b) => b - a), []);
    const defaultYear = useMemo(() => {
        const currentYear = new Date().getFullYear().toString();
        return years.includes(currentYear) ? currentYear : years[0];
    }, [years]);

    // Determine initial category from URL
    const getCategoryFromPath = useCallback(() => {
        if (location.pathname.includes('/videos')) return 'videos';
        if (location.pathname.includes('/photos')) return 'photos';
        return null;
    }, [location.pathname]);

    const [mainCategory, setMainCategory] = useState(getCategoryFromPath);
    const [selectedYear, setSelectedYear] = useState(defaultYear);
    const [selectedCatalog, setSelectedCatalog] = useState(null);
    const [showAllGalleries, setShowAllGalleries] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [videoLightbox, setVideoLightbox] = useState(null);
    const [loading, setLoading] = useState(false);


    // Sync state with URL changes
    useEffect(() => {
        const category = getCategoryFromPath();
        setMainCategory(category);
        if (category === 'photos') {
            setSelectedYear(years[0]);
            setShowAllGalleries(false);
        }
    }, [location.pathname, getCategoryFromPath, years]);

    // Event handlers - memoized for performance
    const openLightbox = useCallback((image, index) => {
        setLightboxImage(image);
        setCurrentImageIndex(index);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxImage(null);
    }, []);

    const navigateLightbox = useCallback((direction) => {
        if (!selectedYear || !selectedCatalog) return;

        const yearData = galleryPhotos[selectedYear];
        const catalog = yearData.find(cat => cat.title === selectedCatalog);
        if (!catalog) return;

        const yearPhotos = catalog.photos;
        const newIndex = direction === 'next'
            ? (currentImageIndex + 1) % yearPhotos.length
            : (currentImageIndex - 1 + yearPhotos.length) % yearPhotos.length;

        setCurrentImageIndex(newIndex);
        setLightboxImage(yearPhotos[newIndex]);
    }, [selectedYear, selectedCatalog, currentImageIndex]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        }
    }, [closeLightbox, navigateLightbox]);

    const handleYearClick = useCallback((year) => {
        setSelectedYear(year);
        setSelectedCatalog(null);
        setShowAllGalleries(false);
    }, []);

    const handleAllGalleriesClick = useCallback(() => {
        setShowAllGalleries(true);
        setSelectedYear(null);
        setSelectedCatalog(null);
    }, []);

    const handleCatalogClick = useCallback((catalogTitle) => {
        setSelectedCatalog(catalogTitle);
        setMainCategory(null);
    }, []);

    const handleVideoPlay = useCallback((video) => {
        setVideoLightbox(video);
    }, []);

    const closeVideoLightbox = useCallback(() => {
        setVideoLightbox(null);
    }, []);

    return (
        <div className="gallery-page">
            <section className="clf_page_title">
                <img src={Title} alt="CLF Kung Fu Club gallery banner" />
            </section>

            <div className="gallery-container">
                {/* Sidebar Category Filters */}
                <div className="gallery-sidebar mb-0">
                    <ul className="sidebar-filters mb-0">
                        {GALLERY_CATEGORIES.map(category => (
                            <li
                                key={category}
                                className={`sidebar-filter-btn ${mainCategory === category ? 'active' : ''}`}
                                onClick={() => {
                                    window.location.href = `/gallery/${category}/`;
                                }}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="gallery-main-content">
                    {/* Videos Section */}
                    {mainCategory === 'videos' && (
                        <div className="videos-section">
                            {/* Featured Video - First Video Large */}
                            {galleryVideos.length > 0 && (
                                <div className="featured-video">
                                    <div
                                        className="featured-video-thumbnail"
                                        onClick={() => handleVideoPlay(galleryVideos[0])}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && handleVideoPlay(galleryVideos[0])}
                                    >
                                        <img src={galleryVideos[0].thumbnail} alt={galleryVideos[0].title} />
                                        <div className="video-overlay">
                                            <span className="play-icon">▶</span>
                                        </div>
                                    </div>
                                    {/* <div className="featured-video-info">
                                        <h3>{galleryVideos[0].title}</h3>
                                        <p>{galleryVideos[0].description}</p>
                                    </div> */}
                                </div>
                            )}

                            {/* Other Videos Grid - 3 Columns */}
                            {galleryVideos.length > 1 && (
                                <div className="videos-grid">
                                    {galleryVideos.slice(1).map(video => (
                                        <div key={video.id} className=" ">
                                            <div
                                                className="video-thumbnail"
                                                onClick={() => handleVideoPlay(video)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => e.key === 'Enter' && handleVideoPlay(video)}
                                            >
                                                <img src={video.thumbnail} alt={video.title} />
                                                <div className="video-overlay">
                                                    <span className="play-icon">▶</span>
                                                </div>
                                            </div>
                                            <div className="video-info">
                                                <h3>{video.title}</h3>
                                                {/* <p>{video.description}</p> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Photos Section */}
                    {(mainCategory === 'photos' || mainCategory === null) && (
                        <div className="photos-section">
                            {!selectedCatalog && (
                                <div className="year-tabs">
                                    <button
                                        className={`year-tab-btn all-galleries-tab ${showAllGalleries ? 'active' : ''}`}
                                        onClick={handleAllGalleriesClick}
                                    >
                                        All Galleries
                                    </button>
                                    {years.slice().reverse().map(year => (
                                        <button
                                            key={year}
                                            className={`year-tab-btn ${selectedYear === year ? 'active' : ''}`}
                                            onClick={() => handleYearClick(year)}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {selectedCatalog && (
                                <div className="catalog-header">
                                    <h2 className="catalog-title">
                                        {galleryPhotos[selectedYear]?.find(cat => cat.title === selectedCatalog)?.title}
                                    </h2>
                                </div>
                            )}

                            {showAllGalleries ? (
                                <div className="photos-grid ml-10">
                                    {years.map(year =>
                                        galleryPhotos[year].map((catalog, catalogIndex) => (
                                            <div key={`${year}-${catalogIndex}`} className="photo-item-wrapper">
                                                <div
                                                    className="photo-item"
                                                    onClick={() => {
                                                        setSelectedYear(year);
                                                        setSelectedCatalog(catalog.title);
                                                        setShowAllGalleries(false);
                                                    }}
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            setSelectedYear(year);
                                                            setSelectedCatalog(catalog.title);
                                                            setShowAllGalleries(false);
                                                        }
                                                    }}
                                                >
                                                    <img src={catalog.catalogThumbnail} alt={catalog.title} />
                                                    <div className="photo-overlay">
                                                        <span className="zoom-icon">+</span>
                                                    </div>
                                                </div>
                                                <div className='' style={{ width: 160 }}>
                                                    <p className="photo-item-title">{catalog.title}</p>
                                                    {catalog.subTitle && <p className="photo-item-subtitle">{catalog.subTitle}</p>}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : selectedYear && !selectedCatalog ? (
                                <div className="photos-grid ml-10">
                                    {galleryPhotos[selectedYear].map((catalog, catalogIndex) => (
                                        <div key={catalogIndex} className="photo-item-wrapper">
                                            <div
                                                className="photo-item"
                                                onClick={() => handleCatalogClick(catalog.title)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => e.key === 'Enter' && handleCatalogClick(catalog.title)}
                                            >
                                                <img src={catalog.catalogThumbnail} alt={catalog.title} />
                                                <div className="photo-overlay">
                                                    <span className="zoom-icon">+</span>
                                                </div>
                                            </div>
                                            <div className='' style={{ width: 160 }}>
                                                <p className="photo-item-title">{catalog.title}</p>
                                                {catalog.subTitle && <p className="photo-item-subtitle">{catalog.subTitle}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : selectedYear && selectedCatalog && (
                                <div className="photos-grid">
                                    {galleryPhotos[selectedYear]
                                        .find(cat => cat.title === selectedCatalog)
                                        ?.photos.map((photo, index) => (
                                            <div key={photo.id} className="photo-item-wrapper">
                                                <div
                                                    className="photo-item"
                                                    onClick={() => openLightbox(photo, index)}
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(photo, index)}
                                                >
                                                    <img src={photo.thumbnail} alt={photo.alt} />
                                                    <div className="photo-overlay">
                                                        <span className="zoom-icon">+</span>
                                                    </div>

                                                </div>

                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="lightbox-overlay"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
                        <CancelIcon
                            className="lightbox-close"
                            onClick={closeLightbox}
                            aria-label="Close lightbox"
                        />
                        <div className="lightbox-image-wrapper">
                            <img
                                src={lightboxImage.src}
                                alt={lightboxImage.alt}
                            />
                        </div>
                        <div className="lightbox-controls">
                            <ArrowCircleLeftIcon
                                className="lightbox-nav lightbox-prev"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateLightbox('prev');
                                }}
                                aria-label="Previous image"
                            />
                            <span className="lightbox-counter">
                                {currentImageIndex + 1} / {galleryPhotos[selectedYear]?.find(cat => cat.title === selectedCatalog)?.photos.length || 0}
                            </span>
                            <ArrowCircleRightIcon
                                className="lightbox-nav lightbox-next"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateLightbox('next');
                                }}
                                aria-label="Next image"
                            />
                        </div>


                    </div>
                </div>
            )}

            {/* Video Lightbox */}
            {videoLightbox && (
                <div
                    className="lightbox-overlay"
                    onClick={closeVideoLightbox}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="video-lightbox-container" onClick={(e) => e.stopPropagation()}>
                        <CancelIcon
                            className="lightbox-close"
                            onClick={closeVideoLightbox}
                            aria-label="Close video"
                        />
                        <div className="video-lightbox-wrapper">
                            <iframe
                                src={videoLightbox.videoUrl}
                                title={videoLightbox.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="video-lightbox-info">
                            {/* <h3>{videoLightbox.title}</h3> */}
                            {/* <p>{videoLightbox.description}</p> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;

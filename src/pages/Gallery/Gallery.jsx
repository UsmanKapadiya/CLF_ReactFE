import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './Gallery.css';
import Title from '../../assets/title.png';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { GALLERY_CATEGORIES } from '../../constants/galleryData';
import MetaTitle from '../../components/MetaTags/MetaTags';
import { getAllVideos, getPhotosList } from '../../services/ApiServices';

function Gallery() {
    const location = useLocation();

    // Determine initial category from URL
    const getCategoryFromPath = useCallback(() => {
        if (location.pathname.includes('/videos')) return 'videos';
        if (location.pathname.includes('/photos')) return 'photos';
        return null;
    }, [location.pathname]);

    const [galleryPhoto, setGalleryPhoto] = useState([]);
    const [galleryVideos, setGalleryVideos] = useState([]);
    const [mainCategory, setMainCategory] = useState(getCategoryFromPath);
    const [selectedCatalog, setSelectedCatalog] = useState(null);
    const [showAllGalleries, setShowAllGalleries] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [videoLightbox, setVideoLightbox] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState();
    const [galleryError, setGalleryError] = useState('');
    const [videoError, setVideoError] = useState('');

    // Fetch photos or videos based on mainCategory
    useEffect(() => {
        if (mainCategory === 'videos') {
            const fetchVideos = async () => {
                setLoading(true);
                setVideoError('');
                const res = await getAllVideos();
                if (res?.success) {
                    setGalleryVideos(res?.data?.data || []);
                    setVideoError('');
                } else {
                    setGalleryVideos([]);
                    setVideoError(res?.error || 'Failed to fetch videos. Please try again.');
                }
                setLoading(false);
            };
            fetchVideos();
        } else {
            const fetchPhotos = async () => {
                setLoading(true);
                setGalleryError('');
                const res = await getPhotosList();
                if (res?.success) {
                    setGalleryPhoto(res?.data?.data);
                    setGalleryError('');
                } else {
                    setGalleryPhoto([]);
                    setGalleryError(res?.error || 'Failed to fetch photos. Please try again.');
                }
                setLoading(false);
            };
            fetchPhotos();
        }
    }, [mainCategory]);
    // Memoize computed values
    const years = useMemo(() => Object.keys(galleryPhoto).sort((a, b) => b - a), [galleryPhoto]);
    const defaultYear = useMemo(() => {
        const currentYear = new Date().getFullYear().toString();
        return years.includes(currentYear) ? currentYear : years[0];
    }, [years]);

    // Sync state with URL changes
    useEffect(() => {
        const category = getCategoryFromPath();
        setMainCategory(category);
        if (category === 'photos') {
            setSelectedYear(years[0]);
            setShowAllGalleries(false);
        } else if (!category && years.length > 0) {
            setMainCategory('photos');
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

        const yearData = galleryPhoto[selectedYear];
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

    const getGalleryTitle = () => {
        if (mainCategory === 'photos') return 'Photos | 振江武術館';
        if (mainCategory === 'videos') return 'Videos | 振江武術館';
        return 'Gallery振江武術館';
    };
console.log(galleryVideos);
    return (
        <div className="gallery-page">
            <MetaTitle pageTitle={getGalleryTitle()} />
            <section className="clf_page_title">
                <img src={Title} alt="CLF Kung Fu Club gallery banner" />
            </section>

            <div className="gallery-container">
                {/* Sidebar Category Filters - hide if error */}
                {!(galleryError || videoError) && (
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
                )}

                {/* Main Content Area */}
                <div className="gallery-main-content">
                    {/* Videos Section */}
                    {mainCategory === 'videos' && (
                        <div className="videos-section">
                            {videoError ? (
                                <div className="gallery-error-message news-full-width">{videoError}</div>
                            ) : galleryVideos.length === 0 ? (
                                <div className="news-empty-message news-full-width">No Videos Available.</div>
                            ) : (
                                <>
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
                                                <img src={galleryVideos[0].catalogThumbnail || galleryVideos[0].thumbnail} alt={galleryVideos[0].title} />
                                                <div className="video-overlay">
                                                    <span className="play-icon">▶</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Other Videos Grid - 3 Columns */}
                                    {galleryVideos.length > 1 && (
                                        <div className="videos-grid">
                                            {galleryVideos.slice(1).map(video => (
                                                <div key={video._id || video.id} className=" ">
                                                    <div
                                                        className="video-thumbnail"
                                                        onClick={() => handleVideoPlay(video)}
                                                        role="button"
                                                        tabIndex={0}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleVideoPlay(video)}
                                                    >
                                                        <img src={video.catalogThumbnail || video.thumbnail} alt={video.title} />
                                                        <div className="video-overlay">
                                                            <span className="play-icon">▶</span>
                                                        </div>
                                                    </div>
                                                    <div className="video-info">
                                                        <h3>{video.title}</h3>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* Photos Section */}
                    {(mainCategory === 'photos' || mainCategory === null) && (
                        <div className="photos-section">
                            {galleryError ? (
                                <div className="gallery-error-message news-full-width">{galleryError}</div>
                            ) : galleryPhoto && Object.keys(galleryPhoto).length === 0 ? (
                                <div className="news-empty-message news-full-width">No Photos Available.</div>
                            ) : (
                                <>
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
                                                {galleryPhoto[selectedYear]?.find(cat => cat.title === selectedCatalog)?.title}
                                            </h2>
                                        </div>
                                    )}

                                    {showAllGalleries ? (
                                        <div className="photos-grid ml-10">
                                            {years.map(year =>
                                                galleryPhoto[year].map((catalog, catalogIndex) => (
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
                                            {galleryPhoto[selectedYear].map((catalog, catalogIndex) => (
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
                                            {galleryPhoto[selectedYear]
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
                                </>
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
                                {currentImageIndex + 1} / {galleryPhoto[selectedYear]?.find(cat => cat.title === selectedCatalog)?.photos.length || 0}
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
                                width="100%"
                                height="100%"
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

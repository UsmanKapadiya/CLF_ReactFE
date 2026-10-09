import { useMemo, useState, useEffect, useCallback } from 'react';
import './About.css';
import Title from '../../assets/About.png';
import AboutBanner from "../../assets/aboutBanner.png"
import MetaTitle from '../../components/MetaTags/MetaTags';
import { getAboutList } from '../../services/ApiServices';
import ContentRender from '../../components/ContentRender/ContentRender';
import PhotoLightbox from '../../components/PhotoLightbox/PhotoLightbox';

const IMAGE_LINK = /\.(jpe?g|png|gif|webp|avif|bmp)(\?.*)?$/i;

function About() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [aboutData, setAboutData] = useState([]);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const handleContentClick = useCallback((e) => {
        const opensInLightbox = (img) => {
            const link = img.closest('a');
            return !link || IMAGE_LINK.test(link.getAttribute('href') || '');
        };
        const clicked = e.target.closest('img');
        if (!clicked || !e.currentTarget.contains(clicked) || !opensInLightbox(clicked)) return;
        e.preventDefault(); // don't follow the "enlarge" link to the raw image file
        const imgs = Array.from(e.currentTarget.querySelectorAll('img')).filter(opensInLightbox);
        setLightboxImages(imgs.map((img) => {
            const link = img.closest('a');
            const big = link && IMAGE_LINK.test(link.getAttribute('href') || '') ? link.href : null;
            return { src: big || img.currentSrc || img.src, alt: img.alt || '' };
        }));
        setLightboxIndex(imgs.indexOf(clicked));
    }, []);

    useEffect(() => {
        setLightboxIndex(null);
    }, [selectedItem]);

    // Fetch about list on mount
    useEffect(() => {
        const fetchAbout = async () => {
            const res = await getAboutList();
            // You can replace this with setState if you want to use the data
            if(res?.success){
                setAboutData(res?.data?.data)
            }
        };
        fetchAbout();
    }, []);

    // Define category order
    const orderedCategories = ['style', 'biography'];

    // Get unique categories from data in specified order
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(
            (aboutData || [])
                .map(item => item.category)
                .filter(category => category != null)
        )];
        // Sort by predefined order, then alphabetically for any other categories
        return uniqueCategories.sort((a, b) => {
            const indexA = orderedCategories.indexOf(a);
            const indexB = orderedCategories.indexOf(b);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a?.localeCompare?.(b) ?? 0;
        });
    }, [aboutData]);

    // Group data by category
    const categoryData = useMemo(() => {
        const grouped = {};
        categories.forEach(category => {
            grouped[category] = aboutData.filter(item => item.category === category);
        });
        return grouped;
    }, [categories]);

    // Get parent items (no parent_id or parent_id is null/undefined)
    const getParentItems = (data) =>
        (data || []).filter(item => item && (item.parent_id === null || item.parent_id === undefined));

    // Render hierarchical list
    const renderHierarchicalList = (data) => {
        const parents = getParentItems(data);
        return parents.map(parent => {
            return (
                <div key={parent._id ?? parent.id} className="sidebar-section">
                    <div
                        className={`sidebar-item parent ${selectedItem?.id === parent.id ? 'active' : ''}`}
                        onClick={() => setSelectedItem(parent)}
                    >
                        {parent.name}
                    </div>
                    {parent.children?.length > 0 && (
                        <div className="sidebar-children">
                            {parent?.children.map(child => (
                                <div
                                    key={child._id ?? child.id}
                                    className={`sidebar-item child ${selectedItem?.id === child.id ? 'active' : ''}`}
                                    onClick={() => setSelectedItem(child)}
                                >
                                    {child.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="">
            <MetaTitle pageTitle={"About振江武術館"} />
            <section className="clf_page_title">
                <img src={Title} alt="CLF Kung Fu Club about us banner" />
            </section>

            <div className="about-container">
                <div className="about-layout">
                    {/* Left Sidebar */}
                    <aside className="about-sidebar">
                        {categories.map(category => {
                            return(
                            <div key={category} className="sidebar-category">
                                <h2 className="sidebar-title">{category}</h2>
                                <div className="sidebar-list">
                                    {renderHierarchicalList(categoryData[category])}
                                </div>
                            </div>
                        )})}
                    </aside>

                    {/* Main Content */}
                    <main className="about-content">
                        {selectedItem ? (
                            <div className="content-detail">
                                {/* <div className="category-label" style={{
                                    fontSize: '12px',
                                    color: 'var(--text-muted)',
                                    textTransform: 'uppercase',
                                    fontWeight: '600',
                                    marginBottom: '10px',
                                    letterSpacing: '0.5px'
                                }}>
                                    {selectedItem.category.toUpperCase()} qws
                                </div> */}
                                <div
                                    className="content-description"
                                    onClick={handleContentClick}
                                    dangerouslySetInnerHTML={{
                                        __html: ContentRender(selectedItem.description),
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="">
                                <img src={AboutBanner} alt="CLF Kung Fu Club about us banner" style={{ width: '700px', height: '222px', objectFit: 'contain', marginBottom: '0.5rem' }} />
                                <p className='aboutText' style={{ width: '700px', maxWidth: '100%' }}>Welcome to <strong>CLF Kung Fu Club (</strong><strong>振江武術館</strong><strong>)</strong> resource center.&nbsp; We operate a network of training center in different neighbourhoods offering professional instruction on Chen's Tai Chi and Choy Lee Fat with various class times.&nbsp; In this site, you can find information about our clu b, Chen's Tai Chi and Choy Lee Fat.&nbsp; As always, we are happy and ready to discuss any questions that you may have, please feel free to contact or email us.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <PhotoLightbox
                images={lightboxImages}
                index={lightboxIndex}
                onIndexChange={setLightboxIndex}
            />
        </div>
    );
}

export default About;

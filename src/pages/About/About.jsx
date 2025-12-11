import { useMemo, useState } from 'react';
import './About.css';
import Title from '../../assets/About.png';
import AboutBanner from "../../assets/aboutBanner.png"
import { ABOUT_DATA } from '../../constants/aboutData';
import MetaTitle from '../../components/MetaTags/MetaTags';

function About() {
    const [selectedItem, setSelectedItem] = useState(null);

    // Define category order
    const orderedCategories = ['style', 'biography'];

    // Get unique categories from data in specified order
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(ABOUT_DATA.map(item => item.category))];
        // Sort by predefined order, then alphabetically for any other categories
        return uniqueCategories.sort((a, b) => {
            const indexA = orderedCategories.indexOf(a);
            const indexB = orderedCategories.indexOf(b);
            
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });
    }, []);

    // Group data by category
    const categoryData = useMemo(() => {
        const grouped = {};
        categories.forEach(category => {
            grouped[category] = ABOUT_DATA.filter(item => item.category === category);
        });
        return grouped;
    }, [categories]);

    // Get parent items (no parent_id)
    const getParentItems = (data) =>
        data.filter(item => item.parent_id === null);

    // Get child items for a parent
    const getChildItems = (data, parentId) =>
        data.filter(item => item.parent_id === parentId);

    // Render hierarchical list
    const renderHierarchicalList = (data) => {
        const parents = getParentItems(data);

        return parents.map(parent => {
            const children = getChildItems(data, parent.id);

            return (
                <div key={parent.id} className="sidebar-section">
                    <div
                        className={`sidebar-item parent ${selectedItem?.id === parent.id ? 'active' : ''}`}
                        onClick={() => setSelectedItem(parent)}
                    >
                        {parent.name}
                    </div>
                    {children.length > 0 && (
                        <div className="sidebar-children">
                            {children.map(child => (
                                <div
                                    key={child.id}
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
                        {categories.map(category => (
                            <div key={category} className="sidebar-category">
                                <h2 className="sidebar-title">{category.toUpperCase()}</h2>
                                <div className="sidebar-list">
                                    {renderHierarchicalList(categoryData[category])}
                                </div>
                            </div>
                        ))}
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
                                <h2 className="content-title">{selectedItem.title}</h2>
                                <div
                                    className="content-description"
                                    dangerouslySetInnerHTML={{ __html: selectedItem.description }}
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
        </div>
    );
}

export default About;

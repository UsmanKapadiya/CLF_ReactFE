import { useMemo, useState } from 'react';
import './About.css';
import Title from '../../assets/About.png';
import AboutBanner from "../../assets/aboutBanner.png"
import { ABOUT_DATA } from '../../constants/aboutData';

function About() {
    const [selectedItem, setSelectedItem] = useState(null);

    // Filter data by category
    const styleData = useMemo(() =>
        ABOUT_DATA.filter(item => item.category === 1),
        []);

    const biographyData = useMemo(() =>
        ABOUT_DATA.filter(item => item.category === 2),
        []);

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
            <section className="clf_page_title">
                <img src={Title} alt="CLF Kung Fu Club about us banner" />
            </section>

            <div className="about-container">
                <div className="about-layout">
                    {/* Left Sidebar */}
                    <aside className="about-sidebar">
                        {/* STYLE Section */}
                        <div className="sidebar-category">
                            <h2 className="sidebar-title">STYLE</h2>
                            <div className="sidebar-list">
                                {renderHierarchicalList(styleData)}
                            </div>
                        </div>

                        {/* BIOGRAPHIES Section */}
                        <div className="sidebar-category">
                            <h2 className="sidebar-title">BIOGRAPHIES</h2>
                            <div className="sidebar-list">
                                {renderHierarchicalList(biographyData)}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="about-content">
                        {selectedItem ? (
                            <div className="content-detail">
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

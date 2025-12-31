import Banner from '../../assets/default-banner31.png';
import welcome from '../../assets/welcome1.png';
import NewsCarousel from '../../components/NewsCarousel/NewsCarousel';
import LocationCard from '../../components/LocationCard/LocationCard';
import { LOCATIONS_DATA } from '../../constants/locationsData';
import MetaTitle from '../../components/MetaTags/MetaTags';
import { useEffect, useState } from 'react';
import { getAllNews } from '../../services/ApiServices';

function Home() {
  const [recentNews, setRecentNews] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await getAllNews(page, itemsPerPage)
      if (res.success) {
        setRecentNews(res.data?.data || []);
      } else {
        setError(res.error || 'Failed to fetch news');
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="mt-1 container">
      <MetaTitle pageTitle={"振江武術館 | Clf Canada"} />
      <section className="slider">
        <img src={Banner} alt="CLF Kung Fu Club martial arts training banner" className="slides" />
        <article className="post static">
          <div className="homepage_banner">
            <img src={welcome} alt="Welcome to CLF Kung Fu Club" />
          </div>
          <div>
            <p className="welcomeText">
              We operate a network of training centers in different neighbourhoods offering professional instruction on Chen&apos;s Tai Chi and Choy Lee Fat with various class times. In this site, you can find information about our club, Chen&apos;s Tai Chi and Choy Lee Fat. As always, we are happy and ready to discuss any questions that you may have, please feel free to contact or email us.
            </p>
          </div>
        </article>
      </section>

      <section className="container-fluid home_post_back" aria-label="Latest news section">
        <NewsCarousel newsData={recentNews} />
      </section>

      <section className="three-column-grid" aria-label="Training locations">
        <div className="column column-1">
          <h1 className="location-heading">
            <span className="underline-loc">LOC</span>ATIONS
          </h1>
        </div>
        {LOCATIONS_DATA.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </section>
    </div>
  );
}

export default Home;

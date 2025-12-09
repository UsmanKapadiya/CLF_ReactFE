import Banner from '../../assets/default-banner31.png';
import welcome from '../../assets/welcome1.png';
import NewsCarousel from '../../components/NewsCarousel/NewsCarousel';
import LocationCard from '../../components/LocationCard/LocationCard';
import { LOCATIONS_DATA } from '../../constants/locationsData';

function Home() {
  return (
    <div className="mt-1 container">
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
        <NewsCarousel />
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

import { useState } from 'react'
import Banner from "../../assets/default-banner31.png"
import welcome from "../../assets/welcome1.png"
import NewsCarousel from "../../components/NewsCarousel/NewsCarousel"
import ArrowForwardIcon from '@mui/icons-material/NavigateNext'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import "../../assets/css/styles.css"

function Home() {
  const [isScheduleOpen1, setIsScheduleOpen1] = useState(false);
  const [isScheduleOpen2, setIsScheduleOpen2] = useState(false);
  return (
    <div className="mt-1">
      <div className="slider">
        <img src={Banner} alt="Banner" className="slides" />
        <div className="post static">
          <div className="homepage_banner">
            <img src={welcome} alt="Welcome" />
          </div>
          <div>
            <p className="welcomeText">
              We operate a network of training center in different neighbourhoods offering professional instruction on Chen’s Tai Chi and Choy Lee Fat with various class times. In this site, you can find information about our club, Chen’s Tai Chi and Choy Lee Fat. As always, we are happy and ready to discuss any questions that you may have, please feel free to contact or email us.
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid home_post_back">
        <NewsCarousel />
      </div>
      <div className="three-column-grid">
        <div className="column column-1">
          <h1 className="location-heading"><span className="underline-loc">LOC</span>ATIONS</h1>
        </div>
        <div className="column column-2">
          <h3 className="widget-title">Richmond (Main Club)</h3>
          <div className="widget-text">
            <p className="widget-p-bottom ">
              <strong>CLF Kung Fu Club</strong><br />Unit 213 – 4451 No. 3 Rd<br />Richmond, BC, V6X 2C3
            </p>
            <p>604 779 7729</p>
          </div>
          <div className="cursor-pointer" onClick={() => setIsScheduleOpen1(!isScheduleOpen1)}>
            <p className="check_schedule">
              See Schedule
              {isScheduleOpen1 ? (
                <ExpandMoreIcon className="arrow-icon" />
              ) : (
                <ArrowForwardIcon className="arrow-icon" />
              )}
            </p>
          </div>
          {isScheduleOpen1 && (
            <div id="schedule_expand1" className="schedule-expand">
              <h3 className="widget-title upperCaseText">Choy Lee Fat</h3>
              <div className="textwidget">
                <p>
                  Tue&nbsp;&nbsp;05:30pm - 07:00pm<br />
                  Thur&nbsp;05:30pm - 07:00pm<br />
                  Sat&nbsp;&nbsp;&nbsp;04:00pm - 05:30pm<br />
                  Sat&nbsp;&nbsp;&nbsp;07:00pm - 08:30pm<br />
                  Sat&nbsp;&nbsp;&nbsp;08:30pm<br />
                  Lion Dance Class
                </p>
              </div>
              <h3 className="widget-title upperCaseText">Chen Style Tai Chi</h3>
              <div className="textwidget">
                <p>
                  Mon&nbsp;&nbsp;&nbsp;11:00am - 12:30pm<br />
                  Tue&nbsp;&nbsp;&nbsp;&nbsp;07:00pm - 08:30pm<br />
                  Wed&nbsp;&nbsp;&nbsp;11:00am - 12:30pm<br />
                  Thur&nbsp;&nbsp;&nbsp;07:00pm - 08:30pm<br />
                  Fri&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11:00am - 12:30pm<br />
                  Sat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10:00am - 11:30am<br />
                  Sun&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;05:00pm - 06:30pm
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="column column-3">
          <h3 className="widget-title">Vancouver</h3>
          <div className="widget-text">
            <p className="widget-p-bottom">
              <strong>Mount Pleasant Community Centre</strong><br />
              1 Kingsway, Vancouver, BC<br />
              604 257 3080 | ext. 1
            </p>
          </div>
          <div className="cursor-pointer" onClick={() => setIsScheduleOpen2(!isScheduleOpen2)}>
            <p className="check_schedule">
              See Schedule
              {isScheduleOpen2 ? (
                <ExpandMoreIcon className="arrow-icon" />
              ) : (
                <ArrowForwardIcon className="arrow-icon" />
              )}
            </p>
          </div>
          {isScheduleOpen2 && (
            <div id="schedule_expand2" className="schedule-expand">
              <h3 className="widget-title upperCaseText">Choy Lee Fat</h3>
              <div className="textwidget">
                <p>Wed&nbsp;&nbsp;05:30pm - 07:00pm<br />
                  Fri&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;05:30pm - 07:00pm</p>
              </div>
              <h3 className="widget-title upperCaseText">Chen Style Tai Chi</h3>
              <div className="textwidget">
                <p>Sun&nbsp;&nbsp;&nbsp;09:00am - 10:00am<br />
                  Wed&nbsp;&nbsp;07:00pm - 08:00pm<br />
                  Fri&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;07:00pm - 08:00pm</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}

export default Home;

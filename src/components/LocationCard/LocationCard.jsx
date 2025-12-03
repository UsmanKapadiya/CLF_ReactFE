import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

function LocationCard({ location }) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const toggleSchedule = () => {
    setIsScheduleOpen(prev => !prev);
  };

  return (
    <div className="column">
      <h3 className="widget-title">{location.name}</h3>
      <div className="widget-text">
        <p className="widget-p-bottom">
          <strong>{location.details.businessName}</strong>
          <br />
          {location.details.address}
          {location.details.city && (
            <>
              <br />
              {location.details.city}
            </>
          )}
        </p>
        <p>{location.details.phone}</p>
      </div>
      
      <div className="cursor-pointer" onClick={toggleSchedule}>
        <p className="check_schedule">
          See Schedule
          {isScheduleOpen ? (
            <ExpandMoreIcon className="arrow-icon" />
          ) : (
            <ArrowForwardIcon className="arrow-icon" />
          )}
        </p>
      </div>
      
      {isScheduleOpen && (
        <div className="schedule-expand">
          {location.schedules.map((schedule, index) => (
            <div key={index}>
              <h3 className="widget-title upperCaseText">{schedule.title}</h3>
              <div className="textwidget">
                <p>
                  {schedule.classes.map((classTime, idx) => (
                    <span key={idx}>
                      {classTime}
                      {idx < schedule.classes.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.shape({
      businessName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string,
      phone: PropTypes.string.isRequired
    }).isRequired,
    schedules: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        classes: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    ).isRequired
  }).isRequired
};

export default LocationCard;

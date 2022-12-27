import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import "./Timeline.css";
// import { Typography } from '@material-ui/core';

const Timeline = ({ data }) => {
  return (
    <VerticalTimeline
      lineColor='#11aaaf'
    >
      {data.map((item) => {
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={item.years}
            icon={<img className="company_logo" style={{ borderRadius: "50%" }} src={"images/" + item.logo} alt="Company Logo" />}
            iconOnClick={() => window.open(item.url)}
          >
            <h3 className="vertical-timeline-element-company">{item.company}</h3>
            <h4 className="vertical-timeline-element-title">{item.title}</h4>
            <h4 className="vertical-timeline-element-location">{item.location}</h4>
            <p className="vertical-timeline-element-description">
            {item.description}
            </p>
          </VerticalTimelineElement>
        )
      })}
    </VerticalTimeline>
  )
}

export default Timeline;
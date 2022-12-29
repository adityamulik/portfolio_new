import React, { lazy, useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import "./Timeline.css";
import { BsPlusLg } from "react-icons/bs";

const Timeline = ({ data }) => {
  let length = data.length;  
  const [counter, setCounter] = useState(2);
  const [elements, setElements] = useState(
    [
      data.slice(0,2).map((item, idx) => {
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
      })
    ]
  );

  const lazyLoadItems = () => {
    let newElements = [
      data.slice(counter, counter + 2).map((item, idx) => {
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
      })
    ];

    setElements(oldEle => [...oldEle, newElements]);
  }

  return (
    <VerticalTimeline
      lineColor='#11aaaf'
    >
      {elements}
      {length < counter ? 
        null :
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#11ABB0', color: '#fff' }}
          icon={<BsPlusLg />}
          iconOnClick={() => {
            lazyLoadItems();
            setCounter(counter+2);
          }}
        >            
        </VerticalTimelineElement>
      }
    </VerticalTimeline>
  )
}

export default Timeline;
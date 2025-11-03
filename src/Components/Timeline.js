import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import "./Timeline.css";
import { BsPlusLg } from "react-icons/bs";

const Timeline = ({ data = [] }) => {
  // Normalize input: keep company entries with `roles` as a single item
  // so that multiple roles for the same company render inside one card.
  const timelineItems = data.map((item) => {
    if (item && Array.isArray(item.roles)) {
      return {
        company: item.company,
        logo: item.logo,
        url: item.url,
        roles: item.roles,
      };
    }
    return item;
  }).filter(Boolean);

  const total = timelineItems.length;
  const [visibleCount, setVisibleCount] = useState(2);

  const visibleItems = timelineItems.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((c) => Math.min(c + 2, total));
  };

  // Helpers to parse and format role year ranges
  const parseMonthYear = (part) => {
    if (!part) return null;
    const p = part.trim();
    if (/present/i.test(p)) return new Date();
    // Match formats like "Nov 2025" or "November 2025"
    const m = p.match(/([A-Za-z]+)\s+(\d{4})/);
    if (m) {
      const monthStr = m[1].slice(0,3).toLowerCase();
      const months = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11 };
      const monthIndex = months[monthStr] ?? 0;
      return new Date(parseInt(m[2], 10), monthIndex, 1);
    }
    // Match just a year like "2020"
    const y = p.match(/(\d{4})/);
    if (y) return new Date(parseInt(y[1], 10), 0, 1);
    const parsed = Date.parse(p);
    if (!isNaN(parsed)) return new Date(parsed);
    return null;
  };

  const formatMonthYear = (date) => {
    if (!(date instanceof Date)) return '';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const computeYearsFromRoles = (roles) => {
    if (!Array.isArray(roles) || roles.length === 0) return '';
    const ranges = roles.map((role) => {
      const yrs = (role.years || '').split('-').map(s => s.trim());
      const start = parseMonthYear(yrs[0]);
      const end = yrs[1] ? parseMonthYear(yrs[1]) : start;
      return { start, end, raw: role.years };
    });

    const starts = ranges.map(r => r.start).filter(Boolean);
    const ends = ranges.map(r => r.end).filter(Boolean);
    const hasPresent = ranges.some(r => /present/i.test(r.raw || ''));

    if (!starts.length && !ends.length) return roles.map(r=>r.years).filter(Boolean).join(', ');

    const min = new Date(Math.min(...starts.map(d => d.getTime())));
    const max = ends.length ? new Date(Math.max(...ends.map(d => d.getTime()))) : min;

    const startLabel = formatMonthYear(min);
    const endLabel = hasPresent ? 'Present' : formatMonthYear(max);

    if (startLabel === endLabel) return startLabel;
    return `${startLabel} - ${endLabel}`;
  };

  if (!timelineItems.length) return null;

  return (
    <VerticalTimeline lineColor='#11aaaf'>
      {visibleItems.map((item, idx) => {
        const key = `${item.company || 'company'}-${idx}`;
        if (Array.isArray(item.roles)) {
          item.years = computeYearsFromRoles(item.roles);
        }
        return (
          <VerticalTimelineElement
            key={key}
            className="vertical-timeline-element--work"
            date={item.years}
            icon={item.logo ? (
              <img className="company-logo" style={{ borderRadius: "50%" }} src={"images/" + item.logo} alt="Company Logo" />
            ) : undefined}
            iconOnClick={() => item.url && window.open(item.url)}
          >
            {item.company && <h3 className="vertical-timeline-element-company">{item.company}</h3>}
            {item.title && <h4 className="vertical-timeline-element-title">{item.title}</h4>}
            {item.location && <h4 className="vertical-timeline-element-location">{item.location}</h4>}
            {item.description && (
              <p className="vertical-timeline-element-description">{item.description}</p>
            )}
            {
            Array.isArray(item.roles) && item.roles.map((role, rIdx) => (
              <div key={`${key}-role-${rIdx}`} className="timeline-role">
                {role.title && (
                  <h4 className="vertical-timeline-element-title">
                    {role.title}
                  </h4>
                )}
                {role.location && <h4 className="vertical-timeline-element-location">{role.location} ({role.years})</h4>}
                {role.description && (
                  <p className="vertical-timeline-element-description">{role.description}</p>
                )}
                {rIdx < item.roles.length - 1 && (<div className="role-separator"><br/></div>)}                 
              </div>
            ))}
          </VerticalTimelineElement>
        );
      })}

      {visibleCount < total && (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#11ABB0', color: '#fff' }}
          icon={<BsPlusLg />}
          iconOnClick={handleLoadMore}
        />
      )}
    </VerticalTimeline>
  );
};

export default Timeline;

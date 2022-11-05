import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';
import Item from './Item';

class Portfolio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      githubData: []
    };
  };

  componentDidMount() {
    
  }

  render() {
    
    return (

      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">
            <h1>My Contributions & Projects</h1>
            <div>
              <Carousel>
                <Item>Ansible Memsource Collection - RedHat Ansible Team Internship</Item>
                <Item>INFO7255 - Advance Big Data Indexing Final Project</Item>
                <Item>INFO6205 - The Menace</Item>
                <Item>IPTC Image Metadata Automation</Item>
              </Carousel>
            </div>
            <h1>My GitHub Calendar.</h1>

            <div id="portfolio-wrapper" className="github-calendar">
              <GitHubCalendar 
                username="adityamulik" 
                color="#11ABB0" 
              >
                <ReactTooltip delayShow={50} html />
              </GitHubCalendar>
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;

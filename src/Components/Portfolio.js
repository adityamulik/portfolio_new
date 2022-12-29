import React, { Component } from 'react';
import axios from 'axios';
import Project from './Project';

class Portfolio extends Component {  

  render() {

    if(this.props.data) {
      var description = this.props.data.description;
      console.log(description);

      var project = this.props.data.projects.map(
        (item) => {
          return (<Project data={item}/>)
        }
      );
    }
    
    return (

      <section id="portfolio">
        <div className="row">
          <div className="three columns header-col">
              {/* <h1><span>Projects</span></h1> */}
          </div>

          <div className="twelve columns collapsed">
              <h1>My Key Projects & Open Source Contribution!</h1>
              <p>
                {description}
              </p>

              <div className="card-holder">
                {project}
              </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;

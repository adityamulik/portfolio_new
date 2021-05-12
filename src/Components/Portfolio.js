import React, { Component } from 'react';
import axios from 'axios';
// import Carousel from 'react-elastic-carousel';
// import Item from "./Item";
import './Carousel.css';
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';

class Portfolio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      githubData: []
    };
  };

  componentDidMount() {
    axios.get(`https://api.github.com/users/adityamulik/repos`)
      .then(res => {
        this.setState({githubData: res.data});
      })
  }

  render() {

    if(this.state.githubData) {
      // console.log(this.state.githubData[15]);
      // const obj = this.state.githubData.map(data => {
      //   return <Item key={data.name}>{data.name}</Item>
      // })
      for(let i=1; i<=this.state.githubData.length; i++) {
        // console.log(this.state.githubData[i]);
      }
    }

    // const breakPoints = [
    //   {width: 1, itemsToShow: 1},
    //   {width: 550, itemsToShow: 2},
    //   {width: 768, itemsToShow: 3},
    //   {width: 1200, itemsToShow: 4},
    // ]
    
    return (

      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">
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

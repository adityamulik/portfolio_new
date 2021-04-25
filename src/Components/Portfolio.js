import React, { Component } from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import Item from "./Item";
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
      console.log(this.state.githubData[15]);
      // const obj = this.state.githubData.map(data => {
      //   return <Item key={data.name}>{data.name}</Item>
      // })
      for(let i=1; i<=this.state.githubData.length; i++) {
        console.log(this.state.githubData[i]);
      }
    }

    const breakPoints = [
      {width: 1, itemsToShow: 1},
      {width: 550, itemsToShow: 2},
      {width: 768, itemsToShow: 3},
      {width: 1200, itemsToShow: 4},
    ]
    
    return (

      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check Out Some of My Works on GitHub.</h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
              <Carousel 
                breakPoints={breakPoints}
              >
                <Item>
                  <h2>GeoLocation API</h2>
                </Item>
                <Item>
                  <h2>WebScrapping</h2>
                </Item>
                <Item>
                  <h2>Task Management</h2>
                </Item>
                <Item>
                  <h2>Relaxer App</h2>
                </Item>
              </Carousel>
            </div>
            <br></br>
            <h1>My GitHub Calendar.</h1>

            <div id="portfolio-wrapper" className="github-calendar" blockSize={14} blockMargin={4} fontSize={16}>
              <GitHubCalendar username="adityamulik" color="hsl(203, 82%, 33%)" >
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

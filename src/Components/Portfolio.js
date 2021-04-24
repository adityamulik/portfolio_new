import React, { Component } from 'react';
import axios from 'axios';

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
      // console.log(this.state.githubData)
      var githubDataNew = this.state.githubData.map(function(item){
        return <div key={item.name}>
          <p>{item.name}</p>
        </div>
      })
      // console.log(githubDataNew)
      for(let i=1; i<=githubDataNew.length; i++) {
        var githubNo = () => {
          return <div key={i}>
            <p>{i}</p>
          </div>
        }
      }
    }
    
    return (

      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check Out Some of My Works.</h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">

            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;

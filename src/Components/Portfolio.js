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
      console.log(this.state.githubData)
      var githubDataNew = this.state.githubData.map(function(item){
        return <div key={item.name}>
          <p>{item.name}</p>
        </div>
      })
    }

    if(this.props.data){
      console.log(this.props.data.projects);
      var projects = this.props.data.projects.map(function(projects){
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
               <img alt={projects.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{projects.title}</h5>
                     <p>{projects.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
    }

    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check Out Some of My Works.</h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
                {githubDataNew}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;

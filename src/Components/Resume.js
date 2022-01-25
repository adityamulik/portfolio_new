import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

class Resume extends Component {
  
  render() {

    if(this.props.data){
      var skillmessage = this.props.data.skillmessage;
      var education = this.props.data.education.map(function(education){
        return <div key={education.school}><h3>{education.school}</h3>
        <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
        <p>{education.description}</p></div>
      });
      var work = this.props.data.work.map(function(work){
        return (
        <div key={work.company}>
          <div className="company_container"> 
            <div className='company_logo_container'>
              <img className="company_logo" src={"images/" + work.logo} alt="Hackerrank Logo" />
            </div>
            <div className='company_details'>
              <h3>{work.company}</h3>
              <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
              <p>{work.description}</p>
            </div>            
          </div>
        </div>)
      });
      var data = {
        labels: this.props.data.skills,
        datasets: [
          {
            label: 'Ability',
            data: this.props.data.skills_values,
            backgroundColor: 'rgba(17, 171, 176, 0.3)',
            borderColor: '#11ABB0',
            borderWidth: 2
          },
        ]
      };
      var certificationmessage = this.props.data.certificationmessage;
      var certificate = this.props.data.certification.map(function(certi){
        return <div key={certi.name} className="certificate">
                  <div className="image-container">
                    <img className="logo" src={"images/" + certi.logo} alt="Hackerrank Logo" />
                  </div>   
                  <div className="certicate-credentials-container">
                    <h4 className="certificate-name">{certi.name}</h4>
                    <p className="certificate-para">{certi.author}</p>
                    <p className="certificate-para">Issued {certi.issued}</p>
                    <p className="certificate-para"><a href={certi.link} target="_blank" rel="noopener noreferrer">View</a></p>
                  </div>                                 
              </div>
        });
    }

    const options = {
      responsive: true,
      scale: {
        ticks: { beginAtZero: true },
        min: 0,
        max: 100
      }
    };

    return (
      <section id="resume">

      <div className="row education">
         <div className="three columns header-col">
            <h1><span>Education</span></h1>
         </div>

         <div className="nine columns main-col">
            <div className="row item">
               <div className="twelve columns">
                 {education}
               </div>
            </div>
         </div>
      </div>


      <div className="row work">

         <div className="three columns header-col">
            <h1><span>Work</span></h1>
         </div>

         <div className="nine columns main-col">
          {work}
        </div>
    </div>

      <div className="row work">
         <div className="three columns header-col">
            <h1><span>Skills</span></h1>
         </div>

         <div className="nine columns main-col">

          <p>{skillmessage}
          </p>

          <div className="bars">
            {data && (
              <Radar data={data} options={options} />
            )}            
          </div>
			  </div>
      </div>

      <div className="row certification">

        <div className="three columns header-col">
          <h1><span>Certifications</span></h1>
        </div>

        <div className="nine columns main-col">
          <p>
            {certificationmessage}
          </p>
          <div className="certificate-container">
            {certificate}
          </div>
			  </div>
      </div>

   </section>
    );
  }
}

export default Resume;

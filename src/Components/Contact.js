import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import Alert from 'react-bootstrap/Alert'

class Contact extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isDisabled: true,
         user_name: null,
         user_email: null,
         message: null,
         errors: {
            user_name: '',
            user_email: '',
            message: '',
         }
      }
   }

   handleChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      let errors = this.state.errors;
      const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
      switch(name) {
         case 'user_name':
            errors.user_name = 
               value.length < 1
               ? 'Please enter your name!'
               : '';
            break;
         case 'user_email':
            errors.user_email = 
               validEmailRegex.test(value)
               ? ''
               : 'Email Address is not valid!';
            break;
         case 'message':
            errors.message = 
               value.length < 10
               ? 'Please enter some message!'
               : '';
            break;
         default:
            break;
      }

      this.setState({errors, [name]: value}, () => {
         console.log(errors);
      })

      if(this.state.user_email != null && this.state.user_name != null && this.state.message != null) {
         this.setState({
            isDisabled: false
         })
      }
   }

   render() {

      if(this.props.data){
         var name = this.props.data.name;
         var street = this.props.data.address.street;
         var city = this.props.data.address.city;
         var state = this.props.data.address.state;
         var zip = this.props.data.address.zip;
         var phone= this.props.data.phone;
         var email = this.props.data.email;
         var message = this.props.data.contactmessage;
      }

      const sendEmail = e => {
         const URL = `http://localhost:3000?${process.env}`;
         e.preventDefault();
         if(validateForm(this.state.errors)) {
            console.info('Valid Form');
            // emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAILJS_USER_ID)
            //    .then((result) => {
            //       console.log("Status" ,result.text);
            //       document.getElementById("image-loader").style.display = 'none';
            //    }, (error) => {
            //       console.log(error.text);
            //    });
         }
         else {
            console.error('Invalid Form')
         }
      };

      const validateForm = errors => {
         let valid = true;
         Object.values(errors).forEach(            
            val => {
               val.length > 0 &&  (valid = false)
            }
         )
         return valid;
      };

      const {errors} = this.state;

      return (
         <section id="contact">

            <div className="row section-head">

               <div className="two columns header-col">

                  <h1><span>Get In Touch.</span></h1>

               </div>

               <div className="ten columns">

                     <p className="lead">{message}</p>

               </div>

            </div>

            <div className="row">
               <div className="eight columns">

                  <form onSubmit={sendEmail}>
                     <fieldset>

                        <div>
                           <label htmlFor="user_name">Name <span className="required">*</span></label>
                           <input type="text" size="35" name="user_name" onChange={this.handleChange}/>
                        </div>

                        <div>
                           <label htmlFor="user_email">Email <span className="required">*</span></label>
                           <input type="email" size="35" name="user_email" onChange={this.handleChange}/>
                        </div>

                        <div>
                           <label htmlFor="message">Message <span className="required">*</span></label>
                           <textarea cols="50" rows="15" id="message" name="message" onChange={this.handleChange}></textarea>
                        </div>

                        <div>
                           <button type="submit" className="submit" disabled={this.state.isDisabled}>Submit</button>
                           <span id="image-loader">
                              <img alt="" src="images/loader.gif" />
                           </span>
                        </div>
                     </fieldset>
                  </form>

               <div id="message-warning"> Error boy</div>
                     <div id="message-success">
                        <i className="fa fa-check"></i>Your message was sent, thank you!<br />
                     </div>
               </div>


               <aside className="four columns footer-widgets">
                  <div className="widget widget_contact">

                     <h4>Address and Phone</h4>
                     <p className="address">
                        {name}<br />
                        {street} <br />
                        {city}, {state} {zip}<br />
                        <span>{phone}</span>
                     </p>
                  </div>

                  <div className="widget widget_tweets">
                     <h4 className="widget-title">Latest Tweets</h4>
                     <ul id="twitter">
                        <li>
                           <span>
                           This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
                           Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum
                           <a href="#">http://t.co/CGIrdxIlI3</a>
                           </span>
                           <b><a href="#">2 Days Ago</a></b>
                        </li>
                        <li>
                           <span>
                           Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                           eaque ipsa quae ab illo inventore veritatis et quasi
                           <a href="#">http://t.co/CGIrdxIlI3</a>
                           </span>
                           <b><a href="#">3 Days Ago</a></b>
                        </li>
                     </ul>
                  </div>
               </aside>
         </div>
      </section>
      );
   }
}

export default Contact;

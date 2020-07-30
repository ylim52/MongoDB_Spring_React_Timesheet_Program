import React, { Component } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.css';
import ProfileService from '../../service/ProfileService';


const ImgUpload =({
    onChange,
    src,
  })=>{
    return(
      <label for="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <img for="photo-upload" src={src}/>
        </div>
        <input id="photo-upload" type="file" onChange={onChange}/> 
      </label>
    );
  }

class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        //contacts: [],
        src: '',
        contact: {
         file: '',
         imagePreview: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
         id: '',
         phone: '',
          email: '',
          address: {
              street: '',
              city: '',
              state: '',
              zipcode: ''
          },
          emergencycontact: {
            contact1: { 
                name: '',
                phone:''
            },
            contact2: {
                name: '',
                phone: ''
            }
          }},
         error: '',
         thankyou: false
        };
        
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur   = this.handleBlur.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleContact1Change = this.handleContact1Change.bind(this);
        this.handleContact2Change = this.handleContact2Change.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.photoUpload = this.photoUpload.bind(this);
      }

      componentDidMount(){
          fetch('/api/person/profile')
          .then(response => response.json())
          .then((json) => {this.setState({
              contact:{
              id: json.id,
              phone: json.phone,
              email: json.email,
              address:{
                  street: json.address.street,
                  city: json.address.city,
                  state: json.address.state,
                  zipcode: json.address.zipcode
              },
              emergencycontact: {
                  contact1: {
                      name: json.emergencycontact[0].name,
                      phone: json.emergencycontact[0].phone
                  },
                  contact2:{
                      name: json.emergencycontact[1].name,
                      phone: json.emergencycontact[1].phone
                  }
              }
            }
          })})
      }
      
      photoUpload (e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file);
      }

      isValidEmail(email) {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
      }
      
      isValidphone(phoneno) {
        return /^[6-9]\d{9}$/.test(phoneno);
      } 
      
      validateField(field, value) {
        if(value.length<=0) {
          return <div className="alert alert-danger"><span className="text-capitalize">{field}</span> is required field.</div>;
        } else {
           if(field=='email')       {
            if(!this.isValidEmail(value))
            return <div className="alert alert-danger">Invalid Email.</div>;
          } else if(field=='phone') {
            if(!this.isValidphone(value))
            return <div className="alert alert-danger">Invalid phone Number.</div>;
          } else {
            return '';
          }
        }
      }
      
      handleBlur(event) {
          this.setState({ error: this.validateField(event.target.name, event.target.value) });
      }
      
      handleChange(event) {
        let inputname = event.target.name;
        let inputvalue = event.target.value;

        let statuscopy = Object.assign({}, this.state);
        statuscopy.contact[inputname] = inputvalue;
          this.setState(statuscopy);
      }

      handleAddressChange(event){
        let inputname = event.target.name;
        let inputvalue = event.target.value;

        let statuscopy = Object.assign({}, this.state);
        statuscopy.contact.address[inputname] = inputvalue;
          this.setState(statuscopy);
      }

      handleContact1Change(event){
        let inputname = event.target.name;
        let inputvalue = event.target.value;

        let statuscopy = Object.assign({}, this.state);
        statuscopy.contact.emergencycontact.contact1[inputname] = inputvalue;
          this.setState(statuscopy);
      }

      handleContact2Change(event){
        let inputname = event.target.name;
        let inputvalue = event.target.value;

        let statuscopy = Object.assign({}, this.state);
        statuscopy.contact.emergencycontact.contact2[inputname] = inputvalue;
          this.setState(statuscopy);
      }

      handleSubmit(event) {
        const {phone, email, address} = this.state.contact;

        ProfileService.update(
            {phone, email, address}
        )
        this.setState({ 
          thankyou: true
        });
        
        event.preventDefault();
        
        
      }

      updateProfile(){
        const {phone, email, address} = this.state.contact;
          ProfileService.update(
              {phone, email, address}
          )
      }
      
      render() {
        const{imagePreview} = this.state.contact;
        if(!this.state.thankyou) {
        return (
                <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5">
                <div className="card-header bg-white f_20_22 border-0 text-center">{this.props.title}</div>
                <div className="card-body">
                   {this.state.error}
                   <form onSubmit={this.handleSubmit} encType="multipart/form-data" autoComplete="off">
                   <ImgUpload onChange={(e)=>this.photoUpload(e)} src={imagePreview}/>
        <h2>Contact</h2>
          <div className="position-relative form-group">
            <input name="phone" type="text" className="text-field form-control mb-3 bg_grey border-0 py-1"  onBlur={this.handleBlur} value={this.state.contact.phone} onChange={this.handleChange}  />
          </div>
        <div className="position-relative form-group">
            <input name="email" type="email" className="text-field form-control mb-3 bg_grey border-0 py-1"  value={this.state.contact.email} onChange={this.handleChange} onBlur={this.handleBlur} required="required" />
          </div>
          <div className="position-relative form-group">
            <input name ="street" type="text" className="text-field form-control mb-3 bg_grey border-0 py-3" value={this.state.contact.address.street} onChange={this.handleAddressChange} onBlur={this.handleBlur} required="required" />
            <input name="city" type="text" className="text-field form-control mb-3 bg_grey border-0 py-3"  value={this.state.contact.address.city} onChange={this.handleAddressChange}  onBlur={this.handleBlur} required="required" />
            <input name="state" type="text" className="text-field form-control mb-3 bg_grey border-0 py-3" value={this.state.contact.address.state} onChange={this.handleAddressChange}  onBlur={this.handleBlur} required="required" />
            <input name="zipcode" type="text" className="text-field form-control mb-3 bg_grey border-0 py-3"  value={this.state.contact.address.zipcode} onChange={this.handleAddressChange} onBlur={this.handleBlur} required="required" />
          </div>
        <h2>Emergency Contact 1</h2>
          <div className="position-relative form-group">
            <input name="name" className="text-field form-control mb-3 bg_grey border-0 py-3" placeholder="First Name, Last Name" value={this.state.contact.emergencycontact.contact1.name}  onBlur={this.handleBlur} required="required" />
          </div>
          <div className="position-relative form-group">
            <input name="phone" type="text" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="(123)456-7890" value={this.state.contact.emergencycontact.contact1.phone} onBlur={this.handleBlur} />
          </div>
          <h2>Emergency Contact 2</h2>
          <div className="position-relative form-group">
            <input name="name" type="text" className="text-field form-control mb-3 bg_grey border-0 py-3" placeholder="First Name, Last Name" value={this.state.contact.emergencycontact.contact2.name} onBlur={this.handleBlur} required="required" />
          </div>
          <div className="position-relative form-group">
            <input name="phone" type="text" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="(123)456-7890" value={this.state.contact.emergencycontact.contact2.phone} onBlur={this.handleBlur}  />
          </div>
            <p className="text-center mb-0"><button type="submit" className="btn btn-primary px-5 text-uppercase py-3 f_12_14 border-0 d-inline-block" onClick={this.updateProfile}>Update</button></p>
        </form>

                   </div>
                 </div> 
             )}
          
        
         if(this.state.thankyou) {
           return (
             <div className="thankyou_details">
               <p>Updated Your Profile!</p>
                <ul className="list-group">
                  <li className="list-group-item">phone: {this.state.contact.phone}</li>
                  <li className="list-group-item">Email: {this.state.contact.email}</li>
                  <li className="list-group-item">Address: {this.state.contact.address.street} {this.state.contact.address.city} {this.state.contact.address.state} {this.state.contact.address.zipcode}</li>
                  <li className="list-group-item">Emergency Contact 1: {this.state.contact.emergencycontact.contact1.name} {this.state.contact.emergencycontact.contact1.phone}</li>
                  <li className="list-group-item">Emergency Contact 2: {this.state.contact.emergencycontact.contact2.name} {this.state.contact.emergencycontact.contact2.phone}</li>
                </ul>
             </div>
            )
          }
      }
    }

export default Profile;
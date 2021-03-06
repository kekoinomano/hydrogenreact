import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Constantes from '../Constantes';
import {Reg, onChange, Diverror, Loader } from '../ConsultasAPI/login';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Registration = () => {
  //Creamos los 3 datos de los formularios


  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    type: 'buyer',
    company_name:'',
    company_id:'',
    phone:'',
    company_city:'',
    company_address:'',
    company_zip:'',
    company_state:'',
    company_country:'',
    personal_name:'',
    personal_last_name:'',
    personal_title:'',
    dob:'',
  });
  const [formData2, setFormData2] = useState({
    email: '',
    password: ''
  });
  const [formData3, setFormData3] = useState({
    email: ''
  });

  //Variable error, vista y cargador
  const [error ,setError ] = useState("");
  const [loader ,setLoader ] = useState(false);
  const refBuyer = useRef();
  const refSeller = useRef();

  const laview = (tipo, larefactiva, larefinactiva) => {
    larefactiva.current.className ="typeButton active";
    larefinactiva.current.className ="typeButton";
    setFormData({ ...formData, type: tipo});
  };
  const cambiarTel = (number) => {
    setFormData({ ...formData, phone: number});
    console.log(formData);
  };

  return (
      
      <div className='registration column is-one-third' id='register'>
        <h1 className='is-size-3'>Registration</h1>
        <label className='label' htmlFor='nombre'>
              Type
            </label>
            <div className='typeDiv'>
              <button className ='typeButton active' ref={refBuyer} onClick={() => laview("buyer", refBuyer, refSeller)}>Buyer</button>
              <button className ='typeButton' ref={refSeller} onClick={() => laview("seller", refSeller, refBuyer)}>Seller</button>
            </div>
        <form className='field regForm' onSubmit={(e) => Reg(e, formData, setFormData, setError, setLoader)}>
          <div className='form-group'>
            

            <label className='label' htmlFor='nombre'>
              Username
            </label>
            <input
              
              required
              placeholder='Username'
              type='text'
              id='nombre'
              name='username'
              onChange={(e) => onChange(e, formData, setFormData)}
              className='input'
            />
          </div>
          <div className='form-group'>
            <label className='label' htmlFor='precio'>
              Email
            </label>
            <input
              required
              placeholder='Email'
              type='email'
              id='email'
              name='email'
              onChange={(e) => onChange(e, formData, setFormData)}
              className='input'
            />
          </div>
          <div className='form-group'>
            <label className='label' htmlFor='calificacion'>
            Password
            </label>
            <input
              required
              placeholder='Password'
              type='password'
              id='password'
              name='password'
              onChange={(e) => onChange(e, formData, setFormData)}
              className='input'
              autoComplete='new-password'
            />
          </div>
          <div className='form-group'>
            <label className='label' htmlFor='calificacion'>
              Repite Password
            </label>
            <input
              required
              placeholder='Repeat password'
              type='password'
              id='password2'
              name='password2'
              onChange={(e) => onChange(e, formData, setFormData)}
              className='input'
              autoComplete='new-password'
            />
          </div>
          {(() => {
            if (formData.type=='seller') {
              return (
                <div className='company-info'>
                  <div className='company-info-text'>Company information</div>
                  <label className='label' htmlFor='nombre'>
                    Name
                  </label>
                  <input required placeholder='Company Name' type='text' id='nombre' name='company_name' 
                    onChange={(e) => onChange(e, formData, setFormData)} className='input'
                  />
                  <input required placeholder='Company Tax ID (12-3456789)' type='text' id='nombre' name='company_id' 
                    onChange={(e) => onChange(e, formData, setFormData)} className='input'
                  />
                  <label className='label' htmlFor='nombre'>
                    Address
                  </label>
                  <input required placeholder='Street Address' type='text' id='nombre' name='company_address' 
                    onChange={(e) => onChange(e, formData, setFormData)} className='input'
                  />
                  <div className='input50'>
                    <input required placeholder='City' type='text' id='nombre' name='company_city' 
                      onChange={(e) => onChange(e, formData, setFormData)} className='input'
                    />
                    <input required placeholder='State' type='text' id='nombre' name='company_state' 
                      onChange={(e) => onChange(e, formData, setFormData)} className='input'
                    />
                  </div>
                  <div className='input50'>
                    <input required placeholder='Zip Code' type='text' id='nombre' name='company_zip' 
                      onChange={(e) => onChange(e, formData, setFormData)} className='input'
                    />
                    <select className='simInput' id="country" name="company_country" defaultValue={'DEFAULT'} onChange={(e) => onChange(e, formData, setFormData)}>
                      <option disabled value='DEFAULT'>Country</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AX">Aland Islands</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AS">American Samoa</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antarctica</option>
                      <option value="AG">Antigua and Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrain</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus</option>
                      <option value="BE">Belgium</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermuda</option>
                      <option value="BT">Bhutan</option>
                      <option value="BO">Bolivia</option>
                      <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                      <option value="BA">Bosnia and Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BV">Bouvet Island</option>
                      <option value="BR">Brazil</option>
                      <option value="IO">British Indian Ocean Territory</option>
                      <option value="BN">Brunei Darussalam</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="KH">Cambodia</option>
                      <option value="CM">Cameroon</option>
                      <option value="CA">Canada</option>
                      <option value="CV">Cape Verde</option>
                      <option value="KY">Cayman Islands</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CX">Christmas Island</option>
                      <option value="CC">Cocos (Keeling) Islands</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comoros</option>
                      <option value="CG">Congo</option>
                      <option value="CD">Congo, Democratic Republic of the Congo</option>
                      <option value="CK">Cook Islands</option>
                      <option value="CR">Costa Rica</option>
                      <option value="CI">Cote D'Ivoire</option>
                      <option value="HR">Croatia</option>
                      <option value="CU">Cuba</option>
                      <option value="CW">Curacao</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">Equatorial Guinea</option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FK">Falkland Islands (Malvinas)</option>
                      <option value="FO">Faroe Islands</option>
                      <option value="FJ">Fiji</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="GF">French Guiana</option>
                      <option value="PF">French Polynesia</option>
                      <option value="TF">French Southern Territories</option>
                      <option value="GA">Gabon</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="DE">Germany</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GR">Greece</option>
                      <option value="GL">Greenland</option>
                      <option value="GD">Grenada</option>
                      <option value="GP">Guadeloupe</option>
                      <option value="GU">Guam</option>
                      <option value="GT">Guatemala</option>
                      <option value="GG">Guernsey</option>
                      <option value="GN">Guinea</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti</option>
                      <option value="HM">Heard Island and Mcdonald Islands</option>
                      <option value="VA">Holy See (Vatican City State)</option>
                      <option value="HN">Honduras</option>
                      <option value="HK">Hong Kong</option>
                      <option value="HU">Hungary</option>
                      <option value="IS">Iceland</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IR">Iran, Islamic Republic of</option>
                      <option value="IQ">Iraq</option>
                      <option value="IE">Ireland</option>
                      <option value="IM">Isle of Man</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italy</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan</option>
                      <option value="JE">Jersey</option>
                      <option value="JO">Jordan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="KP">Korea, Democratic People's Republic of</option>
                      <option value="KR">Korea, Republic of</option>
                      <option value="XK">Kosovo</option>
                      <option value="KW">Kuwait</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="LA">Lao People's Democratic Republic</option>
                      <option value="LV">Latvia</option>
                      <option value="LB">Lebanon</option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libyan Arab Jamahiriya</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MO">Macao</option>
                      <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                      <option value="MG">Madagascar</option>
                      <option value="MW">Malawi</option>
                      <option value="MY">Malaysia</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MQ">Martinique</option>
                      <option value="MR">Mauritania</option>
                      <option value="MU">Mauritius</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">Mexico</option>
                      <option value="FM">Micronesia, Federated States of</option>
                      <option value="MD">Moldova, Republic of</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="ME">Montenegro</option>
                      <option value="MS">Montserrat</option>
                      <option value="MA">Morocco</option>
                      <option value="MZ">Mozambique</option>
                      <option value="MM">Myanmar</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NL">Netherlands</option>
                      <option value="AN">Netherlands Antilles</option>
                      <option value="NC">New Caledonia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk Island</option>
                      <option value="MP">Northern Mariana Islands</option>
                      <option value="NO">Norway</option>
                      <option value="OM">Oman</option>
                      <option value="PK">Pakistan</option>
                      <option value="PW">Palau</option>
                      <option value="PS">Palestinian Territory, Occupied</option>
                      <option value="PA">Panama</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Peru</option>
                      <option value="PH">Philippines</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar</option>
                      <option value="RE">Reunion</option>
                      <option value="RO">Romania</option>
                      <option value="RU">Russian Federation</option>
                      <option value="RW">Rwanda</option>
                      <option value="BL">Saint Barthelemy</option>
                      <option value="SH">Saint Helena</option>
                      <option value="KN">Saint Kitts and Nevis</option>
                      <option value="LC">Saint Lucia</option>
                      <option value="MF">Saint Martin</option>
                      <option value="PM">Saint Pierre and Miquelon</option>
                      <option value="VC">Saint Vincent and the Grenadines</option>
                      <option value="WS">Samoa</option>
                      <option value="SM">San Marino</option>
                      <option value="ST">Sao Tome and Principe</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="SN">Senegal</option>
                      <option value="RS">Serbia</option>
                      <option value="CS">Serbia and Montenegro</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">Singapore</option>
                      <option value="SX">Sint Maarten</option>
                      <option value="SK">Slovakia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="SO">Somalia</option>
                      <option value="ZA">South Africa</option>
                      <option value="GS">South Georgia and the South Sandwich Islands</option>
                      <option value="SS">South Sudan</option>
                      <option value="ES">Spain</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="SD">Sudan</option>
                      <option value="SR">Suriname</option>
                      <option value="SJ">Svalbard and Jan Mayen</option>
                      <option value="SZ">Swaziland</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="SY">Syrian Arab Republic</option>
                      <option value="TW">Taiwan, Province of China</option>
                      <option value="TJ">Tajikistan</option>
                      <option value="TZ">Tanzania, United Republic of</option>
                      <option value="TH">Thailand</option>
                      <option value="TL">Timor-Leste</option>
                      <option value="TG">Togo</option>
                      <option value="TK">Tokelau</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad and Tobago</option>
                      <option value="TN">Tunisia</option>
                      <option value="TR">Turkey</option>
                      <option value="TM">Turkmenistan</option>
                      <option value="TC">Turks and Caicos Islands</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="UM">United States Minor Outlying Islands</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Viet Nam</option>
                      <option value="VG">Virgin Islands, British</option>
                      <option value="VI">Virgin Islands, U.s.</option>
                      <option value="WF">Wallis and Futuna</option>
                      <option value="EH">Western Sahara</option>
                      <option value="YE">Yemen</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                    </select>
                    
                  </div>

                  <label className='label' htmlFor='nombre'>
                    Company Phone Number
                  </label>
                  
                  <PhoneInput placeholder='Phone Number' defaultCountry="US"  onChange={(e) => {cambiarTel(e)}}/>
                  <label className='label' htmlFor='nombre'>
                    Personal information
                  </label>
                  <input
                    required
                    placeholder='Name'
                    type='text'
                    id='personal_name'
                    name='personal_name'
                    onChange={(e) => onChange(e, formData, setFormData)}
                    className='input'
                  />
                  <input
                    required
                    placeholder='Last Name'
                    type='text'
                    id='personal_last_name'
                    name='personal_last_name'
                    onChange={(e) => onChange(e, formData, setFormData)}
                    className='input'
                  />
                  <input
                    required
                    placeholder='Day of Birthday'
                    type='date'
                    id='dob'
                    name='dob'
                    onChange={(e) => onChange(e, formData, setFormData)}
                    className='input'
                  />
                  <input
                    required
                    placeholder='Title in company'
                    type='text'
                    id='personal_title'
                    name='personal_title'
                    onChange={(e) => onChange(e, formData, setFormData)}
                    className='input'
                  />
                </div>
              )
              }
          })()}
          <Diverror error={error}/>
          {loader ?(
            <Loader></Loader>
          ):(
            <input
            type='submit'
            className='divButon'
            value='Create'
            style={{ marginTop: 20}}
          />
          )}
          
        </form>
        <div className='form-group'>Already have an account? 
          <Link to='#' style={{marginLeft: 20}} >Sign In</Link>
        </div>
      </div>
    );
  
  
};


export default Registration;

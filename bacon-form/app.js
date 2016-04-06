import get_reqd_field_stream from './get_reqd_field_stream';
import get_all_field_stream from './get_all_field_stream';
import _ from 'highland';
import $ from 'jquery';
import {validateUser} from './form-validation'; 
import gPlaces from './address-api'
import Awesomplete from 'awesomplete';
import './node_modules/awesomplete/awesomplete.css';
const $regBtn = $('#register-submit');
const dom_address = document.getElementById('address');
let address_autocomplete = new Awesomplete(dom_address,[]);

const toggleButton = (bool) => {$regBtn.prop('disabled',!bool)}; 
const requiredFields = ['username','email','password'];	
const allFields = [
  'fullname',
  'username',
  'email',
  'password',
  'address'
];
const all_field_stream = get_all_field_stream(
  allFields,
  'keyup',
  'form'
);
all_field_stream.map(validateUser).each(toggleButton);

const address_autocomplete_stream = stream => 
  stream
    .fork()
    .filter(({address}) => address!== undefined && address.trim() !== '')
    .map(({address}) => gPlaces(address))
    .series()
    .pluck('predictions')
    .series()
    .pick(['description','place_id','reference'])

const autocomplete_addresses = address_autocomplete_stream(all_field_stream)
  .map(({
	  description:label,
	  place_id:value
  }) =>({
    label,
    value
  }))
  .scan([],(res,item) => res.concat(item))
  .each(_.log)

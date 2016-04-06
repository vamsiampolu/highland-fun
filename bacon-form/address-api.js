import 'whatwg-fetch';
import _ from 'highland';
const key='AIzaSyDM_qBwJJ-gpYD_ezmwxcG3dwG2e5n1hBg';
const url='https://maps.googleapis.com/maps/api/place/autocomplete/json';
const get_places = (input,type) => {
   const req_url = `${url}?input=${input}&key=${key}&type=${type}`;
   const cors_url=`https://cors-anywhere.herokuapp.com/${req_url}`;
   const promise = fetch(cors_url).then(x => x.json());
   return _(promise);
};

export default get_places;

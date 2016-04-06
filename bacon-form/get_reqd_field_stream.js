import $ from 'jquery';
import _ from 'highland';

const get_reqd_field_stream = (all_field_stream,requiredFields) => (all_field_stream.pick(requiredFields))


export const get_reqd_field_stream_from_form = (requiredFields,event,selector) => {
  //const reg_form = $('form'); 
  const reqd_field_stream = _(event,$(selector))
    .debounce(1000)
    .map(
        ({
          target
        }) => ({
          name:target.getAttribute('name'),
          value:target.value
       })
      )
    .filter(({name}) => requiredFields.indexOf(name)!= -1)
    .scan({} ,(res,{name,value}) => { 
       const fieldInfo = requiredFields.reduce((result,fname) => (
          {
            ...result,
            [fname]:res[fname]
          }
        ),{});  
       res = {
          ...fieldInfo,
          ...res,
          [name]:value
       };
       return res;
  })
    .errors(error => {
      console.error(error);
    })
    return reqd_field_stream;  
};

export default get_reqd_field_stream;

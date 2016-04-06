import _ from 'highland';
import $ from 'jquery';

const get_all_field_stream = (allFields,event,selector) => (_(event,$(selector))
     .debounce(1000)
     .map(
        ({
          target
        }) => ({
          name:target.getAttribute('name'),
          value:target.value
       })
      )
      .scan({} ,(res,{name,value}) => { 
         const fieldInfo = allFields.reduce((result,fname) => (
            {
              ...result,
              [fname]:res[fname]
            }
          ),{});  
         res = {
            ...fieldInfo,
            ...res,
            [name]:value===''?undefined:value
         };
         return res;
    })
    .errors(error => {
        console.error(error);
    }))

export default get_all_field_stream;

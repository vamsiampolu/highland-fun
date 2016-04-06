import t,{validate} from 'tcomb-validation';
import _ from 'highland';
const emailRegex = /^[a-zA-Z._]+[@][a-zA-Z._]+$/
const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z])[0-9a-zA-Z\W]{6,}$/ 
const Email = t.subtype(t.String, email => emailRegex.test(email));
const Password = t.subtype(t.String,password => passwordRegex.test(password))
const User = t.struct({
  fullname:t.maybe(t.String),
  username:t.String,
  email:Email,
  password:Password
});

const validateForm = _.curry((type,data) => validate(data,type));
const validateUser = validateForm(User);
const performValidation = (data) => validateUser(data).isValid() 

export default User;
export {performValidation as validateUser};

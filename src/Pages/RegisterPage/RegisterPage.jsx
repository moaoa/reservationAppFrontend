import React, {useContext} from 'react';
import {Context} from '../../App'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {registerUserHOC} from '../../state/actions'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
      '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
          
        },
        margin: '0 auto',
  },
  spacing:{
      width: '50%',
      // margin: '0 auto'
  }
}));

export default function BasicTextFields() {
  const history = useHistory();
  const classes = useStyles();
  const context = useContext(Context);
  const MIN_PASSWORD_LENGTH = 6;
  const [data, setData]  = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  })
  const errors = {
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  };
  const handleChange = (field, event) => {
    setData(prevState => {
      return {
        ...prevState,
        [field]: event.target.value
      }
    })
  }
  const validate = (data) => {
    
    Object.keys(data).forEach(key => {
      if(!data[key]){
        errors[key] = key + ' field is required'
      }else{
        errors[key] = ''
      }
    })
    // eslint-disable-next-line no-use-before-define
    const re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if email is not avalide eamil
    if(!errors.password && !re.test(data.email.toLowerCase())){
      errors.email = 'not a valid email'
    }
    
    if(data.password !== data.confirmPassword && !errors.password && !errors.confirmPassword){
      errors.confirmPassword = 'passwords must match'
    }
    if(!errors.password && String(data.password).length < MIN_PASSWORD_LENGTH){
      errors.password = 'psssword must be at least ' + MIN_PASSWORD_LENGTH + ' charecters .'
    }
    let pass  = true;
    Object.values(errors).forEach(value => {
      // if there is any error
      if(value){
        pass = false
      }
    })
    return pass;

  }
  const handleSubmit = () => {
    const pass = validate(data);
    if(pass){
      const registerUser = registerUserHOC(context);
      registerUser(data);
      history.push('/')
    }else{
      console.log(errors);
    }
  }

  return (
      <div className={classes.spacing}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField id="standard-basic" onChange={(e) => handleChange('name', e) } label="Name" />
          </div>
          <div>
            <TextField id="standard-basic" label="email" onChange={(e) => handleChange('email', e) } />
          </div>
          <div>
            <TextField id="standard-basic" label="password" onChange={(e) => handleChange('password', e) } type="password" />
          </div>
          <div>
            <TextField id="standard-basic" label="confirmPasswrod" onChange={(e) => handleChange('confirmPassword', e) } type="password" />
          </div>
            <Button onClick={handleSubmit}>SignUp</Button>
        </form>
      </div>
  );
}
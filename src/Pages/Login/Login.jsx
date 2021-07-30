import React, {useContext} from 'react';
import {Context} from '../../App'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {loginUserHOC} from '../../state/actions'
import {Redirect} from 'react-router-dom'

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

  const classes = useStyles();
  const context = useContext(Context);
  const [data, setData]  = React.useState({
    email: '',
    password: '',
  })
  const errors = {
    email: '',
    password: '',
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
      const loginUser = loginUserHOC(context)
      loginUser(data)
      
    }else{
      console.log(errors);
    }
  }

  if(context.state.auth.user) return <Redirect to="/"/>

  return (
      <div className={classes.spacing}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField 
            error={context.state.auth.error}
            helperText={context.state.auth.error}
            id="standard-basic" label="email" onChange={(e) => handleChange('email', e) } />
          </div>
          <div>
            <TextField error={context.state.auth.error} id="standard-basic" label="password" onChange={(e) => handleChange('password', e) } type="password" />
          </div>
            <Button onClick={handleSubmit}>SignIn</Button>
        </form>
      </div>
  );
}
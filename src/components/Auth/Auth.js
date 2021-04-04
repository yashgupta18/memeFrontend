import React, {useState} from 'react'
import {Container, Avatar, Button, Paper, Typography, Grid} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Icon from './icon'
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import  Input from './Input';
import {signin, signup} from '../../actions/auth';

const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:'',}

const Auth = () => {
    const classes=useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history=useHistory();

    const handleShowPassword = () =>{
        setShowPassword((prevShowPassword)=> !prevShowPassword);
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        
        // 2 types of click- signin or signup
        if(isSignup){
            dispatch(signup(formData, history));
        }else{
            dispatch(signin(formData, history));
        }
    }

    const handleChange = (e) => {
        // update form data state
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const switchMode = ()=> {
        setIsSignup((prevIsSignup)=> !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        // result of google signin
        // optional chaining
        const result = res?.profileObj;
        const token= res?.tokenId;

        try{
            // send data of user logged in to REACT STORE
            dispatch({type: 'AUTH', data: {result, token}}) //send to auth.js in reducers

            // referesh automatically if user signs in
            history.push('/');

        }catch(error){
            console.log(console.error);
        }
    }

    const googleFailure = (error)=> {
        console.log(error)
        console.log("Google Sign in was unsuccessful")
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" >{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} tyoe="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"  />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="517061940525-kippp3q6k8afkdo271eompc89lmpa5bn.apps.googleusercontent.com"
                        render={(renderProps)=> (
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant="contained" >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

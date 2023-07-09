import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'
import { useLocation, useNavigate} from 'react-router-dom';


function Login() {
  const UserInfo = useContext(UserContext);
  console.log(UserInfo.grade);
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");
  const navigate = useNavigate();
  const keyDown = (key) => {
    if(key == 'Enter'){
        Validation()
    }
  }
  const Validation = () => {
    //apiとかの処理
    UserInfo.user_auth = false
    if(UserInfo.user_auth){
      navigate('/')
    }else{
      navigate('/FailedToLogin', {state: {Username: Username}}) 
    }
  }
  return (<Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    padding={20}
  >
    <Card>
      <CardHeader title="ログインページ" />
      <CardContent>
        <div>
          <TextField
            fullWidth
            id="username"
            type="email"
            label="Username"
            placeholder="Username"
            margin="normal"
            value={Username}
            onChange={(e) => {SetUsername(e.target.value)}}
          />
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            margin="normal"
            value={Password}
            onChange={(e) => (SetPassword(e.target.value))}
            onKeyDown={(e) => (keyDown(e.key))}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={Validation}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  </Box>
  )
}

export default Login
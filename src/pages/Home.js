import React from 'react'
import "../App.css"
import {Button} from "@material-ui/core"
import { Redirect } from 'react-router-dom'
import logo from '../logo.svg';

const Home = (props) => {
    const {isAuthenticated, loginWithRedirect} = props
    if(isAuthenticated){
        return <Redirect to ="/home/"/>
    }
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <b>Selamat Datang di ChattingApp ReactJS</b>
            </p>
            <p>
              Silahkan Login Untuk Melanjutkan
            </p>
        <Button
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={()=>{loginWithRedirect()}}
          variant="contained"
        >
          Login
        </Button>
      </header>
    </div>
    )
}

export default Home

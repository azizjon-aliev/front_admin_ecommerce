import {AppRouter} from "./AppRouter";
import Navigation from "./Navigation";
import React, {useContext } from "react";
import {AuthContext} from "../context";



function App() {
  const {isAuth, isLoading} = useContext(AuthContext)
  
  return (
    <>
      {
        isAuth && !isLoading && <Navigation/>
      }
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'auto',
          width: '100%',
        }}
        >
        <AppRouter />
      </div>
    </>
  )
}

export default App

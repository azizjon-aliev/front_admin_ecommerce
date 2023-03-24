import {AppRouter} from "./AppRouter";
import Navigation from "./Navigation";
import React, {useMemo} from "react";



function App() {
  // const {isAuth, isLoading} = useContext(AuthContext)
  
  return (
    <>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        }}
      >

        <Navigation/>
        <AppRouter />
      </div>
    </>
  )
}

export default App

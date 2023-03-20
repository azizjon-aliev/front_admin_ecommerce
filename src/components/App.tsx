import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import {AppRouter} from "./AppRouter";
import Navigation from "./Navigation";

function App() {
  return (
    <>
        <Navigation />
        <AppRouter />
    </>
  )
}

export default App

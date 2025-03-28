import React from 'react'
import Sidebar from "./component/sidebar/Sidebar.jsx"
import Main from './component/main/Main.jsx'
import Header from './component/Header/Header.jsx'

const App = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-col  w-full flex  items-center'>
        <Header />
        <Main />
      </div>
    </div>
  )
}

export default App

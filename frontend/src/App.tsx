import Header from './components/layout/header'
import { Outlet } from 'react-router-dom'

const App = () => {

    return (
        <>
            {/* {isLoading === true ?
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      } */}
            <>
                <Header />
                <Outlet />
            </>
        </>
    )
}

export default App

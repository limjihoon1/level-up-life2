import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Detail from './component/Detail'
import Write from './component/Write'

const LevelRouter= ()=>{
    
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>

                <Route path='/' element={<App/>}></Route>
                <Route path='/write' element={<Write/>}></Route>
                <Route path='/detail/:no' element={<Detail/>}/>
                
            </Routes>
        </BrowserRouter>
    )
}

export default LevelRouter
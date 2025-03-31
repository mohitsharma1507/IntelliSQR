import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import Home from "./Home";


const App = ()=>{
return(
   <Router>
    <Routes>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
       <Route path="/home" element={<Home/>}></Route>

    </Routes>
   </Router>
)
}
export default App;
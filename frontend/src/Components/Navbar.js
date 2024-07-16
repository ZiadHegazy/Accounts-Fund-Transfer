import "./Navbar.css";
import { useNavigate } from "react-router-dom";
export function Navbar(props){
    const navigate=useNavigate();
    return (
        <div className="MainDivNavbar">
            <div className="navbar">
                <button onClick={()=>navigate("/import")} className={props.page==0? "underlinedbtn":"navButton"}>Import Accounts</button>
                <button onClick={()=>navigate("/list")} className={props.page==1? "underlinedbtn":"navButton"}>List Accounts</button>
                <button onClick={()=>{navigate("/getAccount")}} className={props.page==2? "underlinedbtn":"navButton"}>Account Info</button>
                <button onClick={()=>{navigate("/transfer")}} className={props.page==3? "underlinedbtn":"navButton"}>Transfer Funds</button>
            </div>
        </div>
    )
}
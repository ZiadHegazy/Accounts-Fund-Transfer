import { Alert, TextField } from "@mui/material";
import { Navbar } from "./Navbar"
import "./Transfer.css";
import { useState } from "react";
import { transfer } from "../API/common";
export function Transfer(){
    const [result, setResult] = useState(null);
    const [from,setFrom]=useState("");
    const [to,setTo]=useState("");
    const [amount,setAmount]=useState("");
    const handleFromChange=(e)=>{
        setFrom(e.target.value);
    }
    const handleToChange=(e)=>{
        setTo(e.target.value);
    }
    const handleAmountChange=(e)=>{
        setAmount(e.target.value);
    }
    const handleTransfer=async ()=>{
        const response=await transfer(from,to,amount);
        setResult(response);
    }
    return (
        <div className="MainDivImport">
            <Navbar page={3}/>
            <div className="transferDiv">
                <TextField onChange={handleFromChange} id="outlined-basic" label="From Account ID" variant="outlined" />
                <TextField onChange={handleToChange} id="outlined-basic" label="To Account ID" variant="outlined" />
                <TextField onChange={handleAmountChange} id="outlined-basic" label="Amount" variant="outlined" />
                <button onClick={handleTransfer} type="button" class="btn" name="uploadbutton">Transfer</button>
                {result!=null && result.status=="success" && <Alert severity="success">Transfer Successful</Alert>}
                {result!=null && result.status=="failed" && <Alert severity="error">{result.message}</Alert>}
                
            </div>
        </div>
    )
}
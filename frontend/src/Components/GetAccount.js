import { React, useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Alert, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import "./GetAccount.css";
import { getAccount } from "../API/common";
export function GetAccount() {
  const [result, setResult] = useState(null);
  const [search,setSearch]=useState("");
  const handleSearchChange=(e)=>{
    setSearch(e.target.value);
  }
  const handleSearch=async()=>{
    const response=await getAccount(search);
    
    setResult(response);
  }

  return (

    <div className="MainDivImport">
        <Navbar page={2} />
        <div className="searchDiv">
        <TextField onChange={handleSearchChange}  label="Account ID" variant="outlined" ></TextField>
        <button onClick={handleSearch}  type="button" class="btn" name="uploadbutton">Search</button>
          {result !=null && result.status=="success" && <Table sx={{ width: "100%" }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#615EFC", color: "white" }}>
                <TableCell sx={{ color: "white" }} align="center">ID</TableCell>
                <TableCell sx={{ color: "white" }} align="center">Name</TableCell>
                <TableCell sx={{ color: "white" }} align="center">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "white" }}>
              
                <TableRow key={result.data.id}>
                  <TableCell align="center">
                    {result.data.id}
                  </TableCell>
                  <TableCell align="center">{result.data.name}</TableCell>
                  <TableCell align="center">{result.data.balance}</TableCell>

                </TableRow>
            </TableBody>
          </Table>}
          {result !=null && result.status=="failed" && <Alert severity="error">{result.message}</Alert>}
          </div>
        </div>
  );
}
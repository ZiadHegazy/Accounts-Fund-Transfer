import { getAccounts } from "../API/common";
import "./List.css";
import { Navbar } from "./Navbar";
import img1 from "./OSV4VS0.jpg";
import {CircularProgress, Table,TableBody,TableCell,TableHead,TableRow} from '@mui/material';
import { useEffect, useState } from "react";
export function List(){
    const [accounts, setAccounts] = useState(null);
    useEffect(() => {
        const getAccounts2 = async () => {
            const data = await getAccounts();
            setAccounts(data);
        }
        getAccounts2();
    }, []);

    return (
        <div className="MainDivImport">
        <Navbar page={1}/>
        <div className="tableDiv">
        {accounts==null && <CircularProgress size={"5vw"}  />}
        {accounts!=null && accounts.length==0 && <h1 style={{color:"white",fontSize:"2rem"}}>No accounts found</h1>}
        {accounts !=null && accounts.length>0 && <Table sx={{width:"100%" }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{backgroundColor:"#615EFC",color:"white"}}>
            <TableCell sx={{color:"white"}} align="center">ID</TableCell>
            <TableCell sx={{color:"white"}} align="center">Name</TableCell>
            <TableCell sx={{color:"white"}} align="center">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{backgroundColor:"white"}}>
          {accounts.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.balance}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>}
        </div>

        
        
    </div>
    )
}
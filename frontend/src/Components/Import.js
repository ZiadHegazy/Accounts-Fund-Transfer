import { Navbar } from "./Navbar";
import img1 from "./OSV4VS0.jpg";
import "./Import.css";
import { useState } from "react";
import { Alert } from "@mui/material";
import { uploadFile } from "../API/common";
export function Import(){
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        console.log(file);
        setFile(e.target.files[0]);

    }
    const handleUpload = async () => {
        if(file!=null){
            const result= await uploadFile(file);
            setResult(result);
        }
    }
    return (
        <div className="MainDivImport">
            <Navbar page={0}/>
            {/* <img className="backgroundImageHome" src={img1}/> */}
            <div class="frame">
	<div class="center">
		<div class="title">
			<h1>Drop file or click to upload</h1>
		</div>

		<div class="dropzone">
			<img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" />
			<input onChange={handleFileChange} type="file" class="upload-input" />
		</div>
        {file !=null && <label >{file.name}</label>}

		<button onClick={handleUpload} style={{backgroundColor:file==null? "gray":null}} type="button" class="btn" name="uploadbutton">Import Accounts</button>
        {result!=null && <Alert severity="success">{result.message}</Alert>}
	</div>
</div>

           
        </div>
    )
}
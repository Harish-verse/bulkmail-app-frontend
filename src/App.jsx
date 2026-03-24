import { useState } from "react"
import "./index.css"
import axios from "axios"
import * as XLSX from "xlsx"

function mail(){
    const [msg,setmsg] = useState("")
    const [status,setstatus] = useState(false)
    const [emailList,setemailList] = useState([])

    const handlemsg = (evt)=>
    {
        setmsg(evt.target.value)
    }

    const handlefile = (event)=>
        {
            const file = (event.target.files[0])
    
    const Reader = new FileReader()
    Reader.onload = function(event){
        const data = event.target.result
        const workbook = XLSX.read(data,{type:"binary"})
        const sheetname = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetname]
        const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const totalmail = emailList.map(function(item){return item.A})
        console.log(totalmail)
        setemailList(totalmail)
    }

    Reader.readAsBinaryString(file)
        }
    const send = ()=>
    {
        setstatus(true)
             axios.post("https://bulkmail-app-backend-ay7s.onrender.com/success",{msg:msg,emailList:emailList})
        .then(function(data){
            if(data.data === true)
            {
                setstatus(false)
                alert("Email sent successfully")
            }else{
                alert("failed")
                setstatus(false)
            }
        })
    }

    return(
        <div>
            <div className="bg-blue-950 text-white text-center">
                <h1 className="text-2xl font-medium px-5 py-3">BulkMail</h1>
            </div>

            <div className="bg-blue-800 text-white text-center">
                <h1 className="font-medium font-medium px-5 py-3">We can help your business with sending multiple emails at once</h1>
            </div>

            <div className="bg-blue-600 text-white text-center">
                <h1 className="font-medium font-medium px-5 py-3">Drag and Drop</h1>
            </div>

            <div className="bg-blue-400 flex flex-col items-center text black p-10">
                <textarea onChange={handlemsg} value={msg} className=" bg-white w-[80%] h-32 py-2 outline-none px-2 border border-black rounded-md" placeholder="Enter the email text..."></textarea>

                <div>
                    <input onChange={handlefile} type="file" className="border-4 border-dashed py-4 px-4 border-white mt-5 mb-5 hover:cursor-pointer"></input>
                </div>
                <p>Total Emails in the File: {emailList.length}</p>

                <button onClick={send} className="bg-blue-950 mt-2 py-2 px-2 text-white font-medium rounded-md w-fit hover:cursor-pointer">{status?"Sending...":"Send"}</button>
            </div>

            <div className="bg-blue-300 text-white text-center p-13">
                
            </div>

            <div className="bg-blue-200 text-white text-center p-12">
                
            </div>
           
        </div>
        
    )
}
export default mail
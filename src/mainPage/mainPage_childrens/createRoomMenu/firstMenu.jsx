import { useState, useEffect, useRef } from "react"
import { Route, Link, useNavigate } from "react-router-dom"
import {apStyleTitleCase} from 'ap-style-title-case'
import NProgress from "nprogress"


export default function FirstMenu(props) {
    let [inputValue, set_inputValue] = useState('')
    let inputRef = useRef('')
    let navigate = useNavigate()

    function handle_createRoomButtonClick() {
        NProgress.start()
        let randomId = [1,2,3,4,5,6,7,8].map((each) => Math.floor(Math.random() * 9)).join('')
        fetch('http://localhost:3000/makeRoom', {
            method: 'POST', 
            credentials: 'include', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                room_id: randomId, 
                room_name: apStyleTitleCase(inputValue).trim(), 
                email: decodeURIComponent(document.cookie.split(';')[1].split('=')[1].replaceAll("'",''))})
        })

        navigate(`/room/${inputValue}-${randomId}`)
        NProgress.done()
    }

    return (
        <>
            { !props.showSecondMenu &&
                <div className="makeRoom_menu">
                    <input 
                        type="text" 
                        ref={inputRef} 
                        placeholder="Room name" 
                        onChange={(event) => apStyleTitleCase(set_inputValue(event.target.value.trim()))}
                    />

                    <div className="makeRoomMenu_buttonsWrapper">
                        <button 
                            className="cancelButton" 
                            onClick={() => props.set_displayCreateRoomMenu(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className="createButton" 
                            onClick={handle_createRoomButtonClick}
                        >
                            + Create
                        </button>
                    </div>
                </div>
            }
        </>
    )
}
import { useState, useEffect, useRef } from "react"
import { Route, Link, useNavigate } from "react-router-dom"
import {apStyleTitleCase} from 'ap-style-title-case'


export default function FirstMenu(props) {
    let [inputValue, set_inputValue] = useState('')
    let inputRef = useRef('')
    let navigate = useNavigate()

    function handle_createRoomButtonClick() {
        let randomId = [1,2,3,4,5,6,7,8].map((each) => Math.floor(Math.random() * 9))
        navigate(`/room/${apStyleTitleCase(inputValue.trim())}-${randomId.join('')}`)
    }

    return (
        <>
            { !props.showSecondMenu &&
                <div className="makeRoom_menu">
                    <input 
                        type="text" 
                        ref={inputRef} 
                        placeholder="Room name" 
                        onChange={(event) => set_inputValue(event.target.value)}
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
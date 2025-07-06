import { useState, useEffect, useRef } from "react"
import Navbar from "./mainPage_childrens/navbar"
import Numbers_container from "./mainPage_childrens/numbersContainer"
import CreateRoomMenu from "./mainPage_childrens/createRoomMenu/createRoomMenu"
import { faL } from "@fortawesome/free-solid-svg-icons"
import { useTransition, animated } from "react-spring"


export default function MainPage(props) {
    /* server stuff ------------------------------------------- */

    let [serverError, set_serverError] = useState(null)
    let [userDatas, set_userDatas] = useState(null)


    /* input stuff ------------------------------------------- */

    let inputRef = useRef(null)
    let [inputValue, set_inputValue] = useState('')
    function displayNumbers() {
        set_inputValue(event.target.value)
    }


    /* createRoomMenu stuff  --------------------------------- */

    let [displayCreateRoomMenu, set_displayCreateRoomMenu] = useState(false)
    let CreateRoomMenuTransition = useTransition(displayCreateRoomMenu, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 100 }
    })

    /* join room button ---------------------------------------- */

    function join_room() {
        
    }

    /* --------------------------------------------------------- */



    return (
        <>
        <div className="mainPage">
            { serverError !== null && <h1>{serverError}</h1> }
            <Navbar 
                buttonsInfo={{0: {pfp: '', text: 'My profile'}, 1: {text: 'Make room'}}}
                set_displayCreateRoomMenu={set_displayCreateRoomMenu}
            />

            <div className="mainPage_withoutNavbar">
                <div className="content_mainPage">
                    <div className="contentMainPage_wrapper">
                        <div className="inputNText_wrapper">
                            <p>Enter join code:</p>
                            <div className="inputs_wrapper">
                                <input type="text" onChange={displayNumbers} onKeyDown={displayNumbers} maxLength={8}/>
                                {[1,2,3,4,5,6,7,8].map((each, index) => 
                                    <Numbers_container 
                                        inputValue={inputValue} 
                                        id={index} 
                                    />
                                )}
                            </div>
                        </div>

                        <button 
                            disabled={(inputValue.split('').length < 8 ? true : false)} 
                            className={(inputValue.split('').length < 8 ? "button_off" : "button_on")}
                            onClick={join_room}
                        >
                                Join room
                        </button>
                    </div>
                </div>
            </div>


            { CreateRoomMenuTransition((style, item) => (
                item && 
                    <CreateRoomMenu 
                        displayCreateRoomMenu={displayCreateRoomMenu}
                        set_displayCreateRoomMenu={set_displayCreateRoomMenu}
                        style={style}
                        animated={animated}
                    />
            ))}
        </div>
        </>
    )
}
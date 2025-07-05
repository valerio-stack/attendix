import { useState, useEffect, useRef } from "react"
import FirstMenu from "./firstMenu"
import SecondMenu from "./secondMenu"


export default function CreateRoomMenu(props) {
    let [showSecondMenu, set_showSecondMenu] = useState(false)

    
    return (
        <>
        <props.animated.div className="makeRoomMenu_background" style={props.style}>
            <FirstMenu
                showSecondMenu={showSecondMenu}
                set_showSecondMenu={set_showSecondMenu}
                set_displayCreateRoomMenu={props.set_displayCreateRoomMenu}
            />
        </props.animated.div>
        </>
    )
}
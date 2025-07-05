import { faL } from "@fortawesome/free-solid-svg-icons"
import { Route, Link } from "react-router-dom"


export default function SecondMenu(props) {
    function add_column() {

    }

    function remove_column() {

    }


    // change the input here to dropdown menus on what kind of record is this (e.g: school, office,)

    return (
        <>
            { props.showSecondMenu &&
                <div className="makeRoom_menu">
                    <div className="secondMenu_inputContainer">
                        <input type="text" placeholder={'Column 1'}/>
                        <div className="input_rightButtons" id="deleteButton" onClick={remove_column}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>

                        <div className="input_rightButtons"id="addButton" onClick={add_column}>
                            <p>+</p>
                        </div>
                    </div>

                    <div className="makeRoomMenu_buttonsWrapper">
                        <button 
                            className="cancelButton" 
                            onClick={() => props.set_showSecondMenu(false)}
                        >
                            Back
                        </button>
                        
                        <Link
                            className="createButton" 
                            to={(true) ? `/mainPage/room` : '#'}
                        >
                            Create
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}
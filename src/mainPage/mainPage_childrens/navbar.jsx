

export default function Navbar(props) {
    return (
        <div className="mainPage_navbar">
            <div className="navbar_left">
                <h1>Attendix</h1>
            </div>

            <div className="navbar_right">
                <div className="menus_navbar" onClick={() => props.set_displayCreateRoomMenu(true)}>
                    <p>{props.buttonsInfo[1].text}</p>
                </div>

                <div className="menus_navbar">
                    <i className="fa-solid fa-user"></i>
                    <p>{props.buttonsInfo[0].text}</p>
                </div>
            </div>
        </div>
    )
}
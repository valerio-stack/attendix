import { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router'
import Navbar from "../mainPage/mainPage_childrens/navbar"
import ToggleSwitch from "../assetComponents/toggleSwitch"
import { io } from "socket.io-client"


export default function Room(props) {
    /* ------------------------------------------- */
    


    /* -------------------------------------------- */

    let [role, set_role] = 'admin'
    let {roomNameNId} = useParams()
    let [roomName, roomId] = roomNameNId.split('-')

    /* All stats:
        - Room name
        - Date created
        - Room creator name
        - Room creator message button

        - Joined people Diagram
        - Joined people fraction (e.g: 13/24) and the percentage under it (e.g: 47%)
        - Late people diagram
        - 
   */

    return (
        <>

        <div className="roomPage">
            <div className="roomPage_top">
                <div className="roomPage_titleNId">
                    <h1>{roomName}</h1>
                    <p>{'Room ID:'} {roomId}</p>
                </div>

                <div className="date">
                    <div className="leftArrow_container">
                        <img src="/left.png" alt="" />
                    </div>

                    <div className="dateText">
                        <p>Friday, 04 July 2025</p>
                        <input type="date" />
                    </div>

                    <div className="rightArrow_container">
                        <img src="/right.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="roomStats_wrapper">
                <div className="roomStats_left"></div>
                <div className="roomStats_right"></div>
            </div>


            <div className="tableContainer">
                <table>
                    <tbody>
                        <tr>
                            <th>Full name</th>
                            <th>Absent</th>
                            <th>Arrive</th>
                            <th>Clock out</th>
                            <th>Note</th>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Fauzan Karim Setyawan</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>07.00</td>
                            <td>?</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Joki Suryanto</td>
                            <td><ToggleSwitch height={20} width={38}/></td>
                            <td>-</td>
                            <td>-</td>
                            <td>Caturan</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
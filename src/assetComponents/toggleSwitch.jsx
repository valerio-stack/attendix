import { useState, useEffect, useRef } from "react"


export default function ToggleSwitch(props) {
    let switchRef = useRef(null)
    let circleRef = useRef(null)
    let [circleOnTheLeft, set_circleOnTheLeft] = useState(true)

    function moveCircle() {
        set_circleOnTheLeft((prev => !prev))
    }

    let switchHeight = `${props.height}px`
    let switchWidth = `${props.width}px`

    let circleHeight = `${props.height - 5.5}px`
    let circleHeight2 = `${(props.height - 5.5) + 1.5}px`
    let circleWidth = `${props.height - 5.5}px`
    let circleWidth2 = `${(props.height - 5.5) + 1.5}px`

    let circleLeft = `${(props.width / 12.6666666667)}px`
    let circleLeft2 = `${props.width - ((props.height - 5.5) + 1.5) - (props.width / 9.5)}px`

    /* ----------------------------------------------------- */

    



    return (
        <>
            { true &&
                <div 
                    className="switchContainer" 
                    ref={switchRef} 
                    onClick={moveCircle}
                    style={{
                        backgroundColor: (circleOnTheLeft ? 'rgb(170, 170, 170)' : 'rgb(7, 125, 143)'),
                        height: switchHeight,
                        width: switchWidth
                    }}
                >
                    <div 
                        className="switchCircle" 
                        ref={circleRef}
                        style={{
                            left: (circleOnTheLeft) ? circleLeft : circleLeft2,
                            height: (circleOnTheLeft) ? circleHeight : circleHeight2,
                            width: (circleOnTheLeft) ? circleWidth : circleWidth2,
                        }}
                    ></div>
                </div>
            }
        </>
    )
}
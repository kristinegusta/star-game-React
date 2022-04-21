import React from "react"
import { utils } from "./StarMatch"

const StarsDisplay = (props) => {
    return (
        <>
            {utils.range(1, props.starCount).map(starID =>
                <div key={starID} className="star" />
            )}
        </>
    )
}

export default StarsDisplay;
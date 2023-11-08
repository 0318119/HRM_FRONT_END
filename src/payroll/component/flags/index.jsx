import React from "react";
import Style from './flag.module.css'

const Flags =({color,Title})=>{
    return(
        <div className={color=='Danger'?Style.FlagDanger:Style.FlagNormal}>{Title}</div>
    )
}

export default Flags
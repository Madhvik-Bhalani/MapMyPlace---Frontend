import React, { useRef,useState } from 'react'
import Refcontext from './Refcontext'
import Reloadcontext from './Reloadcontext'

function Contextprovider(props) {

    const refsignin = useRef(null)
    const refsignup = useRef(null)
    const refforgotpass = useRef(null)
    const refresetpass = useRef(null)

    const [reload, setreload] = useState({})


    return (
        <Refcontext.Provider value={{refsignin,refsignup,refforgotpass,refresetpass}}>
        <Reloadcontext.Provider value={{reload,setreload}}>
            {props.children}
        </Reloadcontext.Provider>
        </Refcontext.Provider>
    )
}

export default Contextprovider

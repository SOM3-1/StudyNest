import React, { useState } from "react"
import { Register } from "./Register";
import { Login } from "./Login";

export enum SelectionType {
    registration, login
}

export const UserSelection: React.FC = () => {
    const [selection, setSelection] = useState<SelectionType>(SelectionType.login);

    const handleSelection = (val: SelectionType) => {
        setSelection(val)
    }
    return (<>{selection === SelectionType.registration ? <Register handleSelection={handleSelection}/> : <Login handleSelection={handleSelection}/>}</>)
}
import { logoutUser } from "@store/appSlice";
import { useEffect } from "react"
import { useDispatch, useSelector, } from "react-redux";

export const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutUser())
    }, [])
    return <></>
}
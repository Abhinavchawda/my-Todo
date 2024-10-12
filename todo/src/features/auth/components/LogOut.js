import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectLoggedInUser, signOutAsync } from "../authSlice"
import { Navigate } from "react-router-dom"

function LogOut(userDetails) {

    const G_user = userDetails.user;
    const logOut = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/logout`,
            "_self"
            //self for showing google account prompt on the same page
        );
    };

    const dispatch = useDispatch()

    const user = useSelector(selectLoggedInUser)

    useEffect(() => {
        dispatch(signOutAsync(user?.id))
    }, [dispatch])

    return (
        <>
            <div>
                <img className="h-5 w-5 m-2 p-2" src={G_user.picture} />
                {G_user?.name}
                {G_user?.email}
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-slate-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={logOut}
                >
                    Log Out
                </button>
            </div>
            {/* {!user && <Navigate to='/login' replace={true}></Navigate> } */}
        </>
    )
}

export default LogOut;
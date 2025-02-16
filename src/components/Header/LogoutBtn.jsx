import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch =useDispatch()
    const logoutHandler =()=>{
        authService.logout().then(()=>{ //appwrite se kogout kiya
            dispatch(logout()) //store ko dispatch kr diya , logout slicer udhr bhi bnaya tha na
        })
    }
  return (
    <button 
        className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300" 
        onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn
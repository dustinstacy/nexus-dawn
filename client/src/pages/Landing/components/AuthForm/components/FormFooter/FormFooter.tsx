import { NavLink } from 'react-router-dom'
import { Register } from 'src/global.interfaces'

import './FormFooter.scss'

// Displays text and link path based on the register prop value
const FormFooter = ({ register }: Register) => {
    return (
        <div className='form-footer'>
            <span>
                {register ? 'Already Have An Account? ' : 'Need An AccOunt? '}
            </span>
            <NavLink to={register ? '/login' : '/register'}>
                {register ? 'Login' : 'Sign up'}
            </NavLink>
        </div>
    )
}

export default FormFooter

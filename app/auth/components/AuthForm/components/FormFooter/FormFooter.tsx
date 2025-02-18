import Link from "next/link"

import { Register } from "@interfaces"

import "./formFooter.scss"

// Displays text and link path based on the register prop value
const FormFooter = ({ register }: Register) => {
    return (
        <div className='form-footer'>
            <span>{register ? "Already Have An Account? " : "Need An AccOunt? "}</span>
            <Link href={register ? "/auth/login" : "/auth/register"}>{register ? "Login" : "Sign up"}</Link>
        </div>
    )
}

export default FormFooter

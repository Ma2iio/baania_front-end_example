import { InputHTMLAttributes } from "react"

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
        <input className="border border-gray-400 text-gray-400 px-4 rounded-md py-2 w-full" {...props} />
    )
}
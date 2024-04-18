import { useState } from "react";

interface Props {
    id: number;
    type: string;
    label: string;
    name: string;
    errorMess?: string;
    placeholder?: string;
    required?: boolean;
    min?: string;
    accept?: string;
    onChange: any;
}

const FormInput = (props: Props) => {
    const [focused, setFocused] = useState(false);
    const { name, label, errorMess, onChange, id, ...inputProps } = props;
    const handleFocused = () => {
        setFocused(true);
    };
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                className="md:px-6 px-3 w-full md:py-4 py-2 border-2 border-lanh_green rounded-md peer"
                name={name}
                {...inputProps}
                onBlur={handleFocused}
                onChange={onChange}
            />
            <span
                data-focused={focused}
                className="hidden data-[focused=true]:block peer-valid:hidden text-red-600"
            >
                {errorMess}
            </span>
        </>
    );
};

export default FormInput;

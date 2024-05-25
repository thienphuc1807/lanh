import { useState, ChangeEvent } from "react";

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
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    className: string;
    value?: any;
    pattern?: string;
}

const FormInput = (props: Props) => {
    const [focused, setFocused] = useState(false);
    const {
        name,
        label,
        errorMess,
        onChange,
        id,
        className,
        value,
        ...inputProps
    } = props;
    const handleFocused = () => {
        setFocused(true);
    };
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                {...inputProps}
                onBlur={handleFocused}
                onChange={onChange}
                className={className}
                value={value}
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

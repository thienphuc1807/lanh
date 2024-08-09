import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
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

    const [show, setShow] = useState(false);
    return (
        <>
            <label htmlFor={name}>{label}</label>

            <div className="relative">
                {name !== "password" ? (
                    <input
                        name={name}
                        {...inputProps}
                        onBlur={handleFocused}
                        onChange={onChange}
                        className={className}
                        value={value}
                    />
                ) : (
                    <input
                        name={name}
                        {...inputProps}
                        type={show ? "text" : "password"}
                        onBlur={handleFocused}
                        onChange={onChange}
                        className={className}
                        value={value}
                    />
                )}

                {name === "password" && (
                    <span
                        className="absolute right-[10px] top-2 cursor-pointer"
                        onClick={() => setShow(!show)}
                    >
                        {show ? (
                            <EyeIcon className="h-6 w-6 text-lanh_green" />
                        ) : (
                            <EyeSlashIcon className="w-6 h-6 text-lanh_green" />
                        )}
                    </span>
                )}

                <span
                    data-focused={focused}
                    className="hidden data-[focused=true]:block peer-valid:hidden text-red-600"
                >
                    {errorMess}
                </span>
            </div>
        </>
    );
};

export default FormInput;

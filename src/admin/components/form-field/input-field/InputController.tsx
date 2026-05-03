import { type InputHTMLAttributes } from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import Input from './Input';

interface FormInputInterface extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label?: string,
    rules?: RegisterOptions
}

const FormInput = ({name, label, rules, ...props}: FormInputInterface)=>{

    const {control, formState:{errors}} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={ ({field:{name,onChange,value,ref}})=>(
                <Input
                label={label}
                name={name}
                onChange={onChange}
                value={value}
                ref={ref}
                error={errors[name]?.message as string | undefined}
                {...props}
                />
            ) }
        />
    )
}

export default FormInput;
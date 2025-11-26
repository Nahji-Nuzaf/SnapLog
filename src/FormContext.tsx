import React, { createContext, useState, useContext, ReactNode } from 'react';

type FormData = {
    image1: string | null;
    image2: string | null;
    image3: string | null;
    location: string;
    description: string;
    date: Date;
};

type FormContextType = {
    formData: FormData;
    updateFormData: (key: keyof FormData, value: any) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<FormData>({
        image1: null,
        image2: null,
        image3: null,
        location: '',
        description: '',
        date: new Date(),
    });

    const updateFormData = (key: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => {
    const context = useContext(FormContext);
    if (!context) throw new Error('useForm must be used within a FormProvider');
    return context;
};
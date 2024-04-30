interface LabelledInputProps {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LabelledInput = ({ label, placeholder, type, onChange} : LabelledInputProps) => {
    return (
        <div className="flex flex-col pt-3">
            <label className="block mb-2 text-sm text-black font-bold">{label}</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type={type ?? "text"} placeholder={placeholder} onChange={onChange} required/>
        </div>
    );
}

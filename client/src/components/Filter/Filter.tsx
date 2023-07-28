import './Filter.scss'

interface FilterProps {
    label: string
    value: string | number
    setValue: (value: string | number) => void
    options: Array<string | number>
    id: string
}

// Dropdown filter component that allows selection from multiple options to set a state value
// label: Display name of the filter
// value: Current value of the filter
// setValue: Function to set the value of the filter
// options: Array of filter options
// id: Identifier used to associate the label with the select element
const Filter = ({ label, value, setValue, options, id }: FilterProps) => {
    return (
        <div className='filter center-column'>
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Filter

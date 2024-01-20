type Props = {
    selectedMaxPrice?: number;
    onChange: (value?: number) => void;
}

export default function StarRatingFilter({ selectedMaxPrice, onChange }: Props) {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select
                className="p-2 border rounded-md w-full"
                value={selectedMaxPrice}
                onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)
                }>

                <option value="">Select Max Price</option>
                {[500, 600, 700, 800, 900, 1000, 1500, 2000, 3000, 4000, 5000, 10000].map((price) => (
                    <option value={price}>{price}</option>
                ))}
            </select>

        </div>
    )
}

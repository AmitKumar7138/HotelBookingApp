import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

export default function ImageSection() {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Images</h1>
            <div className="border rounded p-4 flex flex-col gap-4">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length;

                            if (totalLength === 0) {
                                return "At least one image should be added";
                            }

                            if (totalLength > 6) {
                                return "Total number of images cannot exceed 6 images"
                            }

                            return true;
                        }
                    })} />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 font-bold text-sm">{errors.imageFiles.message}</span>
            )}
        </div>
    )
}

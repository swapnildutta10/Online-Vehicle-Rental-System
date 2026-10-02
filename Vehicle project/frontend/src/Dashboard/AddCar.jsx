import toast from "react-hot-toast";
import DashboardTitle from "../Shared/DashboardTitle";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";

const AddCar = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false)
    const imageUpload = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_api_key}`

    const handleAddItem = async e => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const title = form.title.value;
        const currentImage = form.photo.files[0];
        const location = form.location.value;
        const locationURL = form.locationURL.value;
        const tourCode = form.tourCode.value;
        const speed = form.speed.value;
        const fuelType = form.fuelType.value;
        const seats = form.seats.value;
        const doors = form.doors.value;
        const price = form.price.value;
        const fuel = form.fuel.value;
        const description = form.description.value;

        console.log(title, currentImage, location, locationURL, tourCode, speed, price, fuelType, seats, doors, fuel, description);


        if (!currentImage) {
            return toast.error('Please upload a photo!')
        }

        const formData = new FormData();
        formData.append("image", currentImage);

        const res = await axiosPublic.post(imageUpload, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        console.log(res.data);

        const photo = res.data.data.display_url;

        const carData = {
            title,
            photo,
            location,
            locationURL,
            tourCode,
            speed,
            price,
            fuelType,
            seats,
            doors,
            fuel,
            description
        }

        if (res.data.success) {
            axiosPublic.post('/car', carData)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success('Car has been added successfully!')
                        form.reset();
                        setLoading(false)
                    }
                })
        }

    }


    return (
        <div>
            <DashboardTitle title="Post New Car" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, laboriosam." />

            <form onSubmit={handleAddItem} className="max-w-2xl mx-auto p-10 border rounded-xl space-y-4">
                <input type="text" name="title" placeholder="Title" className="border p-2 rounded-sm w-full" required />
                <input type="file" name="photo" className="border p-2 rounded-sm w-full" required />
                <input type="text" name="location" placeholder="Write Location name" className="border p-2 rounded-sm w-full" required />
                <input type="text" name="locationURL" placeholder="Write Location URL" className="border p-2 rounded-sm w-full" required />
                <input type="text" name="tourCode" placeholder="Write tour code" className="border p-2 rounded-sm w-full" required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="speed" placeholder="Speed" className="border p-2 rounded-sm w-full" required />
                    <input type="text" name="fuelType" placeholder="Fuel Type" className="border p-2 rounded-sm w-full" required />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="number" name="seats" placeholder="Seats" className="border p-2 rounded-sm w-full" required />
                    <input type="number" name="doors" placeholder="Doors" className="border p-2 rounded-sm w-full" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="number" name="price" placeholder="Price" className="border p-2 rounded-sm w-full" required />
                    <input type="text" name="fuel" placeholder="Fuel" className="border p-2 rounded-sm w-full" required />
                </div>
                <textarea rows={4} name="description" placeholder="Write about the car." className="border p-2 rounded-sm w-full" required></textarea>
                <button className="cursor-pointer bg-purple-600 p-3 text-white rounded-xl font-semibold text-sm px-10 active:bg-purple-700">
                    {
                        loading ? <ImSpinner9 className="text-2xl animate-spin" /> : "ADD CAR"
                    }



                </button>


            </form>


        </div>
    );
};

export default AddCar;
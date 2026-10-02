// import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import DashboardTitle from "../Shared/DashboardTitle";
import toast from "react-hot-toast";
// import toast from 'react-hot-toast'

const ManageCars = () => {

    const axiosPublic = useAxiosPublic();

    const { data: cars = [], refetch } = useQuery({
        queryKey: ['cars'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/allCars')
            return data;
        }
    })

    const handleDelete = id => {
        axiosPublic.delete(`/car/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('You have deleted Successfully!')
                    refetch()
                }
            })
    }
    return (
        <div>
            <DashboardTitle title="Manage All Items" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, laboriosam." />
            <div className="">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs border *:border">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <thead>
                            <tr className="text-left">
                                <th className="p-3">SL</th>
                                <th className="p-3">Photo</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Speed</th>
                                <th className="p-3">Fuel Type</th>
                                <th className="p-3">Seats</th>
                                <th className="p-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cars.map((car, i) => <tr key={i} className="border">
                                    <td className="p-2">
                                        <p>{i + 1}</p>
                                    </td>
                                    <td className="p-2">
                                        <img src={car.photo} className="w-12 rounded-md" />
                                    </td>
                                    <td className="p-2">
                                        <p>{car.title.slice(0, 12)}...</p>
                                    </td>
                                    <td className="p-2">
                                        <p>{car.price}</p>
                                    </td>
                                    <td className="p-2">
                                        <p>{car.location}</p>
                                    </td>
                                    <td className="p-2">
                                        <p>{car.speed}</p>
                                    </td>
                                    <td className="p-2">
                                        <p>{car.fuelType}</p>
                                    </td>
                                    <td className="p-2">
                                        <p>{car.seats}</p>
                                    </td>

                                    <td className="p-2">
                                        <span onClick={() => handleDelete(car._id)} className="px-3 py-1 font-semibold rounded-md bg-red-500 text-white cursor-pointer">
                                            <span>Delete</span>
                                        </span>
                                    </td>
                                </tr>)
                            }



                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageCars;
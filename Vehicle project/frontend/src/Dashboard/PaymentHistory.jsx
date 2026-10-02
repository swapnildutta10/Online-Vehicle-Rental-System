import DashboardTitle from "../Shared/DashboardTitle";

const PaymentHistory = () => {
    return (
        <div>
            <DashboardTitle title="Payment History" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, laboriosam."/>
            <div className="mt-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                            <th className="py-2 px-4 border-b">Car</th>
                            <th className="py-2 px-4 border-b">Payment Method</th>
                            <th className="py-2 px-4 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example static data, replace with dynamic data if available */}
                        <tr>
                            <td className="py-2 px-4 border-b">2025-06-11</td>
                            <td className="py-2 px-4 border-b">$120</td>
                            <td className="py-2 px-4 border-b">BMW 3 Series</td>
                            <td className="py-2 px-4 border-b">Credit Card</td>
                            <td className="py-2 px-4 border-b text-green-600 font-semibold">Paid</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">2025-06-01</td>
                            <td className="py-2 px-4 border-b">$90</td>
                            <td className="py-2 px-4 border-b">Jaguar XE</td>
                            <td className="py-2 px-4 border-b">PayPal</td>
                            <td className="py-2 px-4 border-b text-green-600 font-semibold">Paid</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
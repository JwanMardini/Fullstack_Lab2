import React, { useEffect, useState } from "react";
import axios from "axios";
import { sortByEmployeeID, sortByEmployeeName, sortByProjectName, sortByDate } from "../utils/sortTable.js";

const fetchData = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api");
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

function Table() {
    const [data, setData] = useState([]);

    const fetchDataAndUpdate = async () => {
        try {
            const newData = await fetchData();
            setData(newData);
        } catch (error) {
            throw new Error('Error fetching data:', error);
        }
    };

    const handleSort = (sortFunction) => {
        const sortedData = sortFunction([...data]);
        setData(sortedData);
    };

    useEffect(() => {
        fetchDataAndUpdate();

        const intervalId = setInterval(fetchDataAndUpdate, 60000); // 60000 milliseconds = 1 minute

        // Cleanup interval on component unmount, to prevent memory leaks
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort(sortByEmployeeID)}>E_ID</th>
                        <th onClick={() => handleSort(sortByEmployeeName)}>E_name</th>
                        <th onClick={() => handleSort(sortByProjectName)}>Project Name</th>
                        <th onClick={() => handleSort(sortByDate)}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item._id}>
                            <td>{item.employee[0]._id}</td>
                            <td>{item.employee[0].full_name}</td>
                            <td>{item.project[0].project_name}</td>
                            <td>{item.start_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;

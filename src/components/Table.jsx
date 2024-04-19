import React, { useEffect, useState } from "react";

async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api');
        console.log(response);
        // Check if the response is not ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            const d = await fetchData();
            setData(d);
        };
        fetchDataAsync();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>E_ID</th>
                        <th>E_name</th>
                        <th>Project Name</th>
                        <th>Date</th>
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

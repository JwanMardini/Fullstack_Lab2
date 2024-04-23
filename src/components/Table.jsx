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

    const sortByEmployeeID = () => {
        const sorted = [...data].sort((a, b) => {
            return a.employee[0]._id.localeCompare(b.employee[0]._id);
        });
        setData(sorted);
    };
    
    const sortByEmployeeName = () => {
        const sorted = [...data].sort((a, b) => {
            return a.employee[0].full_name.localeCompare(b.employee[0].full_name);
        });
        setData(sorted);
    };

    const sortByProjectName = () => {
        const sorted = [...data].sort((a, b) => {
            return a.project[0].project_name.localeCompare(b.project[0].project_name);
        });
        setData(sorted);
    };

    const sortByDate = () => {
        const sorted = [...data].sort((a, b) => {
            return new Date(a.start_date) - new Date(b.start_date);
        });
        setData(sorted);
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th onClick={sortByEmployeeID}>E_ID</th>
                        <th onClick={sortByEmployeeName} >E_name</th>
                        <th onClick={sortByProjectName}>Project Name</th>
                        <th onClick={sortByDate}>Date</th>
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

import React, { useEffect, useState } from "react";
import axios from "axios";

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

    useEffect(() => {
        fetchData().then((data) => {
            setData(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        }
        );
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

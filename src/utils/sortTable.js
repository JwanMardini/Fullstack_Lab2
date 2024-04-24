export const sortByEmployeeID = (data) => {
    return [...data].sort((a, b) => {
        return a.employee[0]._id.localeCompare(b.employee[0]._id);
    });
};

export const sortByEmployeeName = (data) => {
    return [...data].sort((a, b) => {
        return a.employee[0].full_name.localeCompare(b.employee[0].full_name);
    });
};

export const sortByProjectName = (data) => {
    return [...data].sort((a, b) => {
        return a.project[0].project_name.localeCompare(b.project[0].project_name);
    });
};

export const sortByDate = (data) => {
    return [...data].sort((a, b) => {
        return new Date(a.start_date) - new Date(b.start_date);
    });
};

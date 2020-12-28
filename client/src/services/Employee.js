import axios from 'axios';

// create
export const createEmployee = async (values) => {
    try {
        const response = await axios.post('/api/employees', { ...values, supervisor: "5fe9c7e3fbeda789363b8fe9" });
        return response;
    } catch (error) {
        return error.response;
    }
};

// read all
export const readAllEmployees = async () => {
    try {
        const response = await axios.get('/api/employees');
        return response;
    } catch (error) {
        return error.response;
    }
};

// read one
export const readOneEmployee = async (id) => {
    try {
        const response = await axios.get(`/api/employees/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};


// update
export const updateEmployee = async (id, values) => {
    try {
        const response = await axios.patch(`/api/employees/${id}`, values);
        return response;
    } catch (error) {
        return error.response;
    }
};


// delete 
export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`/api/employees/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
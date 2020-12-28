import axios from 'axios';

// create
export const createBag = async (values) => {
    try {
        const response = await axios.post('/api/bags', values);
        return response;
    } catch (error) {
        return error.response;
    }
};

// read all
export const readAllBags = async () => {
    try {
        const response = await axios.get('/api/bags');
        return response;
    } catch (error) {
        return error.response;
    }
};

// read one
export const readOneBag = async (id) => {
    try {
        const response = await axios.get(`/api/bags/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};


// update
export const updateBag = async (id, values) => {
    try {
        const response = await axios.patch(`/api/bags/${id}`, values);
        return response;
    } catch (error) {
        return error.response;
    }
};


// delete 
export const deleteBag = async (id) => {
    try {
        const response = await axios.delete(`/api/bags/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
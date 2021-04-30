import { API_URL } from '../utils/constants';

export async function loginApi(formData) {

    try {

        const url = `${API_URL}/api/login`;

        const params = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(url, params);

        const result = await response.json();

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getImages(auth) {

    try {

        const url = `${API_URL}/api/images`;

        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        }

        // console.log(params);
        const response = await fetch(url, params).then(response => response)       

        const result = await response.json();

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
import axios from 'axios';

const BASE_URL = "http://mestexpensetracker.herokuapp.com";

export {getRecordData};

function getRecordData() {
    const url = `${BASE_URL}/api/v1/records.json`;
    return axios.get(url).then(response => response.data);
}
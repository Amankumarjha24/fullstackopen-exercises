import axios from "axios";
console.log("SERVER FILE LOADED");
const baseUrl = "http://localhost:3001/api/notes";


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const sendData = (obj) => {
  const postData = axios.post(baseUrl, obj).then((Response) => Response.data);
  return postData;
};

const remove = (id) => {
  const removed = axios.delete(`${baseUrl}/${id}`);
  return removed;
};

const update = (id, updatedObject) => {
  console.log(updatedObject);
  const update = axios
    .put(`${baseUrl}/${id}`, updatedObject)
    .then((Response) => Response.data);
  return update;
};
export default {
  getAll: getAll,
  sendData: sendData,
  remove: remove,
  update: update,
};

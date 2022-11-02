// Change this to your own IP address if running the server on your
// local machine else change to the URL of the deployed server

<<<<<<< HEAD
export const serverURL = `http://192.168.10.139:3000`;
=======
export const serverURL = `http://192.168.10.126:3000`;
>>>>>>> feeed7e33fc24d38278a9f9c0a6e645b3bd7037a

function constructURL(endpoint) {
  return `${serverURL}${endpoint}`;
}

export async function postData(endpoint, data) {
  const result = await fetch(constructURL(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await result.json();
  return res;
}

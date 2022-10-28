// Change this to your own IP address if running the server on your
// local machine else change to the URL of the deployed server

<<<<<<< HEAD
const serverURL = 'http://192.168.10.135:3000';
=======
const serverURL = 'http://192.168.131.88:3000';
>>>>>>> 7e326a897be4173437ef3d72fc170913630d2e1b

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

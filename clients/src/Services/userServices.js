import useHandleResponse from "../Utilities/handle-response";

// get all user info
export function useGetUsers() {
  const handleResponse = useHandleResponse();
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const getUsers = () => {
    return fetch(`/api/user`, requestOptions)
      .then(handleResponse)
      .catch((err) => console.log(err));
  };

  return getUsers;
}

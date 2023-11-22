import useHandleResponse from "../Utilities/handle-response";

// getting global messages
export function useGetGlobalMessages() {
  const handleResponse = useHandleResponse();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getGlobalMessages = () => {
    return fetch(`/api/messages/global`, requestOptions)
      .then(handleResponse)
      .catch((error) => console.log(error));
  };

  return getGlobalMessages;
}

// sending a global message
export function useSendGlobalMessage() {
  const handleResponse = useHandleResponse();

  const sendGlobalMessage = (body) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: body, global: true }),
    };

    return fetch(`/api/messages/global`, requestOptions)
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      });
  };

  return sendGlobalMessage;
}

// returning a list of users to start a conversation
export function useGetConversations() {
  const handleResponse = useHandleResponse();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getConversations = () => {
    return fetch(`/api/messages/conversations`, requestOptions)
      .then(handleResponse)
      .catch((error) => {
        console.log(error);
      });
  };

  return getConversations;
}

// getting conversation history based on user ID
export function useGetConversationMessages() {
  const handleResponse = useHandleResponse();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getConversationMessages = (id) => {
    return fetch(
      `/api/messages/conversations/query?userId=${id}`,
      requestOptions
    )
      .then(handleResponse)
      .catch((error) => {
        console.log(error);
      });
  };

  return getConversationMessages;
}

export function useSendConversationMessage() {
  const handleResponse = useHandleResponse();

  const sendConversationMessage = (id, body) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: id, body: body }),
    };

    return fetch(`/api/messages/`, requestOptions)
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      });
  };

  return sendConversationMessage;
}

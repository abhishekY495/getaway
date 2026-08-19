import { API_URL } from "@/utils/constants";
import { ExpoPushTokenSchema_T } from "@repo/types";

export const addUser = async (token: string) => {
  const response = await fetch(`${API_URL}/user/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};

export const getUser = async (token: string) => {
  const response = await fetch(`${API_URL}/user/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};

export const addExpoPushToken = async (
  token: string,
  expoPushToken: ExpoPushTokenSchema_T,
) => {
  const response = await fetch(`${API_URL}/user/add-expo-push-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expoPushToken),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};

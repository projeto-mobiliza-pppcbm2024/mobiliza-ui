import axios from "axios";
import { UserData } from "../types/userTypes";

const API_BASE_URL = "https://mobiliza.onrender.com";
const authToken = localStorage.getItem("authToken");

export const fetchUsers = async (): Promise<UserData[]> => {
  try {
    const response = await axios.get<UserData[]>(
      `${API_BASE_URL}/admin/users`,
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar a lista de usuarios:", error);
    throw new Error("Não foi possível buscar a lista de usuarios.");
  }
};

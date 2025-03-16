import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const useCheckUser = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                await axios.get("http://localhost:8080/checkUserRegis", {
                    params: {
                        userId: Cookies.get("userId"),
                        userName: Cookies.get("userName"),
                    },
                });
            } catch (error) {
                console.error("User not registered:", error);
                navigate("/Login");
            }
        };

        checkUser();
    }, [navigate]);
};

export default useCheckUser;

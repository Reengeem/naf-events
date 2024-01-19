import React, { useContext } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import { backendUrl } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [naf_number, setNaf_number] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  console.log(user);

  const handleLogin = async () => {
    setLoading(true);
    if (!naf_number.trim()) {
      messageApi.error("Please provide your naf number");
      return;
    }
    if (!password.trim()) {
      messageApi.error("Please provide your password");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/auth/sign-in`, {
        naf_number,
        password,
      });

      setUser(response.data);
      navigate("/admin", { replace: true });
    } catch (error) {
      messageApi.error(error?.response?.data.message);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-[calc(100vh-100px)]">
      {contextHolder}
      <form className="max-w-500px w-fill border-solid border-gray-200 p-5 rounded-md border space-y-6">
        <h2>Welcome back!</h2>
        <Input
          disabled={loading}
          className="max-w-2xl"
          onChange={(e) => setNaf_number(e.target.value)}
          placeholder="Enter Your Naf Number"
        />
        <Input
          className="2xl"
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
        />
        <Button loading={loading} onClick={handleLogin} type="primary" block>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

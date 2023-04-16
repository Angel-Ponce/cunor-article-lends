import { Typography, Input, Form, Button } from "antd";
import Image from "next/image";
import UsacLogo from "../../public/usac-logo.png";

const { Title, Text } = Typography;

const Login = () => {
  const onSubmit = async (values: { username: string; password: string }) => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-full max-w-[450px] rounded-xl shadow-2xl bg-white p-8 flex gap-5 flex-col items-center">
        <Image alt="usac-logo" src={UsacLogo} className="w-32 h-auto"></Image>
        <div>
          <Title className="text-center !my-0" level={3}>
            Biblioteca
          </Title>
          <Text className="text-center text-gray-500 !my-0">
            prestamos de artículos
          </Text>
        </div>
        <Form
          initialValues={{ username: "", password: "" }}
          layout="vertical"
          className="w-full max-w-[300px]"
          onFinish={onSubmit}
        >
          <Form.Item
            label="Usuario"
            name="username"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input type="password"></Input>
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button htmlType="submit" type="primary" className="w-20">
              Iniciar
            </Button>
          </Form.Item>
        </Form>
        <Text className="text-xs" type="secondary">
          Todos los derechos reservados &copy;
        </Text>
      </div>
    </div>
  );
};

export default Login;

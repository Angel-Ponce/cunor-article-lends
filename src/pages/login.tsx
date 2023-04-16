import { Typography, Input, Form, Button, notification } from "antd";
import Image from "next/image";
import UsacLogo from "../../public/usac-logo.png";
import { graphql } from "../graphql/generated/client";
import { useLazyQuery } from "@apollo/client";
import store from "store2";
import { useRouter } from "next/router";

const { Title, Text } = Typography;

const queryLogin = graphql(`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`);

const queryMe = graphql(`
  query me {
    me {
      id
      name
      lastname
      phone
      description
      username
      role
      institution {
        id
        name
      }
      countActiveLends
      countCompletedLends
      lends {
        id
      }
    }
  }
`);

const Login = () => {
  const [login, { loading }] = useLazyQuery(queryLogin);
  const [me, { loading: meLoading }] = useLazyQuery(queryMe);
  const router = useRouter();

  const onSubmit = async (values: { username: string; password: string }) => {
    const { data, error } = await login({
      variables: {
        username: values.username,
        password: values.password,
      },
    });

    if (error) {
      notification.error({
        message: "Algo salio mal...",
        description: error.message.includes("User")
          ? "Parece que el usuario no existe."
          : error.message.includes("password")
          ? "Parece que la contraseña es incorrecta"
          : "Parece que la solicitud ha fallado.",
        placement: "bottom",
      });
      return;
    }

    store("token", data?.login);

    const { data: dataMe, error: errorMe } = await me();

    if (dataMe?.me) {
      store("user", dataMe.me);
      router.push("/");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F5F5F5]">
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
            <Button
              loading={loading || meLoading}
              htmlType="submit"
              type="primary"
              className="w-24"
            >
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

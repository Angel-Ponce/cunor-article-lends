import { NextPage } from "next/types";
import { useQuery } from "@apollo/client";
import { graphql } from "../graphql/generated/client";
import { useLogout } from "../hooks/useLogout";
import AppLayout from "../components/templates/AppLayout";

const query = graphql(`
  query institution {
    institution(id: 1) {
      id
      name
    }
  }
`);

const Home: NextPage = () => {
  const { data, error, loading } = useQuery(query);
  const logout = useLogout();

  return (
    <AppLayout>
      <p className="text-blue-800 text-2xl font-medium">Quantum</p>
      <button onClick={logout}>logout</button>
      <div className="bg-red-100 w-full h-[2000px]"></div>
    </AppLayout>
  );
};

export default Home;

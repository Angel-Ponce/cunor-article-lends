import { NextPage } from "next/types";
import { useQuery } from "@apollo/client";
import { graphql } from "../graphql/generated/client";

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

  return (
    <div>
      <p className="text-blue-800 text-2xl font-medium">Quantum</p>
      <p>{JSON.stringify(error)}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Home;

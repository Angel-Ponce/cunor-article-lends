import { NextPage } from "next/types";
import { useQuery } from "@apollo/client";
import { graphql } from "../graphql/generated/client";

const PhisicalStates = graphql(`
  query PhisicalStates {
    phisicalStates {
      id
      name
      description
    }
  }
`);

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(PhisicalStates);

  return (
    <>
      <div>
        <p className="text-blue-800 text-2xl font-medium">Quantum Stack</p>

        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <>
              <p>Something went wrong.</p>
              <p>{JSON.stringify(error)}</p>
            </>
          ) : (
            <div>{JSON.stringify(data?.phisicalStates)}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

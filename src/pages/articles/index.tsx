import { NextPage } from "next";
import AppLayout from "../../components/templates/AppLayout";

const Articles: NextPage = () => {
  return (
    <AppLayout>
      <p className="text-blue-800 text-2xl font-medium">Articles</p>
    </AppLayout>
  );
};

export default Articles;

import { graphql } from "../graphql/generated/client";

const dashboardQuery = graphql(`
  query kpis {
    kpis {
      countUsers
      countProfessors
      countArticles
      countActiveLends
      countCompletedLends
    }

    professorLends {
      name
      countLends
    }

    userLends {
      name
      countLends
    }
  }
`);

export { dashboardQuery };

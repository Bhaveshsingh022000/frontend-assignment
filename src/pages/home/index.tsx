import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { ProjectState } from "../../reducerAndActions/kickStarter/reducer";
import { fetchProjectDetails } from "../../reducerAndActions/kickStarter/actions";
import Table from "../../components/Table/Table";
import type { TableProps } from "../../components/Table/Table";
import { formatCurrency } from "../../utils";
import styles from "./home.module.css";

const TABLE_HEADER = ["S.No.", "Percentage funded (%)", "Amount pledged"];

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, error, isFetching } = useSelector<RootState, ProjectState>(
    (state) => state.kickStarterProjectSlice
  );

  useEffect(() => {
    dispatch(fetchProjectDetails());
  }, []);

  const tableData = useMemo<TableProps["data"]>(() => {
    if (isFetching) return [];
    const transformedData: TableProps["data"] = data.map((project, index) => {
      return [
        index + 1,
        `${project["percentage.funded"].toFixed(2)}`,
        `${project.currency.toUpperCase()} ${formatCurrency(
          project["amt.pledged"]
        )}`,
      ];
    });
    return transformedData;
  }, [data, isFetching]);

  if (error) return <div>{String(error)}</div>;

  return (
    <div>
      <h1>Top Kick Starter Projects</h1>
      <div className={styles.tableWrapper}>
        <Table
          isLoading={isFetching}
          data={tableData}
          headers={TABLE_HEADER}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};

export default Home;

import { zodiosHooks } from "../hooks/api";
import { css } from "../../styled-system/css";

function Queue() {
  const { data: queue } = zodiosHooks.useGetQueue({});
  console.log(queue);
  return (
    <div className={css({ fontSize: "2xl", fontWeight: "bold" })}>Queue</div>
  );
}

export default Queue;

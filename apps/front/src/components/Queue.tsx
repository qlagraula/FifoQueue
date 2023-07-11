import { zodiosHooks } from "../hooks/api";
import { css } from "../../styled-system/css";

function Queue() {
  const { invalidate: invalidateActions } = zodiosHooks.useGetActions();

  const { data: queue, isRefetching } = zodiosHooks.useGetQueue(
    {},
    { refetchInterval: 1000 }
  );

  if (isRefetching) {
    invalidateActions();
  }
  return (
    <>
      <div className={css({ fontSize: "2xl", fontWeight: "bold" })}>Queue:</div>
      <div className={css({ display: "flex", gap: "5", flexWrap: "wrap" })}>
        {queue?.map((action, index) => (
          <div
            key={`${action}-${index}`}
            className={css({
              fontWeight: "900",
              fontSize: "2xl",
              borderRadius: "full",
              width: "11",
              height: "11",
              textAlign: "center",
              backgroundColor: "cyan.700",
              borderWidth: index === 0 ? "medium" : "",
              borderColor: index === 0 ? "cyan.900" : "",
            })}
          >
            {action.type}
          </div>
        ))}
      </div>
    </>
  );
}

export default Queue;

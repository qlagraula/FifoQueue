import { css } from "../styled-system/css";
import Action from "./components/Action";
import Queue from "./components/Queue";
import { zodiosHooks } from "./hooks/api";

function App() {
  const { data: actions } = zodiosHooks.useGetActions();
  return (
    <div
      className={css({
        width: "xl",
        height: "sm",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        textAlign: "center",
      })}
    >
      Click on a button to add an Action in the queue:
      <div className={css({ display: "flex", justifyContent: "space-around" })}>
        {actions?.map((action) => (
          <Action key={action.type} action={action} />
        ))}
      </div>
      <Queue />
    </div>
  );
}

export default App;

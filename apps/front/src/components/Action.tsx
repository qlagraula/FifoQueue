import type { Action } from "api";
import { css } from "../../styled-system/css";
import { zodiosHooks } from "../hooks/api";

type ActionProps = { action: Action };

function Action({ action }: ActionProps) {
  const { invalidate: invalidateQueue } = zodiosHooks.useGetQueue();
  const { mutate } = zodiosHooks.useMutation(
    "post",
    "/queue/action",
    undefined,
    {
      onSuccess: () => invalidateQueue(),
    }
  );
  return (
    <button
      className={css({
        fontWeight: "900",
        fontSize: "2xl",
        backgroundColor: "cyan.700",
        borderRadius: "2xl",
        padding: "6",
        cursor: "pointer",
        textAlign: "center",
        borderWidth: "medium",
        borderColor: "cyan.700",
        "&:hover": {
          borderColor: "cyan.950",
        },
      })}
      onClick={() => mutate(action)}
    >
      {action.type}
      <div
        className={css({
          fontWeight: "600",
          fontSize: "lg",
        })}
      >
        {action.credits}
      </div>
    </button>
  );
}

export default Action;

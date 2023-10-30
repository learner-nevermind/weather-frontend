import classNames from "classnames";

function Button(props) {
  return (
    <button
      className={classNames(
        "w-full rounded-2xl px-3 py-2 text-white",
        props.variant === "info" ? "bg-blue-500 active:bg-blue-600" : "",
        props.variant === "error" ? "bg-red-500 active:bg-red-600" : "",
        props.variant === "success"
          ? "bg-emerald-500 active:bg-emerald-600"
          : "",
        props.variant === "warning" ? "bg-yellow-500 active:bg-yellow-600" : ""
      )}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;

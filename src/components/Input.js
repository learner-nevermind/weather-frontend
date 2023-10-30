function Input(props) {
  return <input
    placeholder={props.placeholder}
    className="w-full rounded-2xl border border-slate-200 px-2 py-1"
    {...props}
  />
}

export default Input
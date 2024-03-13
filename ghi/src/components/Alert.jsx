const Alert = ({ color, message, title }) => {
    const validColor = ['red', 'blue', 'green', 'yellow'].includes(color)
        ? color
        : 'green'
    return (
        <div
            className={`bg-${validColor}-500 border-t border-b border-${validColor}-500 text-${validColor}-700 px-4 py-3`}
            role="alert"
        >
            <p className="font-bold">{title}</p>
            <p className="text-sm">{message}</p>
        </div>
    )
}

export default Alert

const Task = ({task, onClick, check}) => {
    return (
       <tr className="relative bb task-border task-row">
            <td className="pv3 pr3 task-cell">
                <p className="f4 pl3 mt1 mb1">{task.description}</p>
            </td>
            <td>
                <button className="bg-transparent bn b grow pointer f6 check-mark" onClick={onClick}><img src={check} alt="Check mark"/></button>
            </td>
       </tr>
    )
}

export default Task;
import editPNG from './../../assets/edit.png';

const Course = ({title, grade, handleEdit}) => {
    const row = [];

    // Fill in number of cells that correspond to grade, and leave the remainder blank
    for (let i = 0; i < grade; i++) {
        row.push(<td><div className="course-grade-filled"></div></td>);
    }
    for (let i = 0; i < 4 - grade; i++) {
        row.push(<td></td>);
    }

    const handleClick = (title, grade) => {
        handleEdit(title, grade);
    }

    return (
        <tr className="stripe-dark relative">
            <td className="pa3 f5">{title}</td>
            {row.map(cell => cell)}
            <button className="edit-btn bg-transparent bn b grow" onClick={handleClick}><img src={editPNG} alt="Edit icon"/></button>
        </tr>
    )
}

export default Course;
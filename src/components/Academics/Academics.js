import { useRef, useEffect, useState } from 'react';
import './Academics.css';
import AddButton from './../AddButton/AddButton';
import Graph from './../Graph/Graph';
import editPNG from './../../assets/edit.png';
import cross from './../../assets/cross.svg';


const AddCoursePopUp = ({visible, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);
    const [titleInputValue, setTitleInputValue] = useState('');
    const [gradeInputValue, setGradeInputValue] = useState(-1);

    // display the popup everytime visible is true, which happens when add button is pressed
    useEffect(() => {
        if (visible) {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.remove('dn');
                popUpContainerRef.current.classList.add('flex', 'content-center', 'justify-center', 'items-center');
            }
        } else {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.add('dn');
                popUpContainerRef.current.classList.remove('flex', 'content-center', 'justify-center', 'items-center');
            }
        }
    }, [visible])
    
    // Handler for closing pop up
    const handleCloseClick = (e) => {
        e.preventDefault();
        handleClose();
    }

    // Handlers for input changes
    const handleInputChange = (e) => {
        setTitleInputValue(e.target.value);
    }
    const handleSelectChange = (e) => {
        setGradeInputValue(e.target.value);
    }

    // Handler for submitting form
    const handleAddClick = (e) => {
        e.preventDefault();
        handleAdd(titleInputValue, gradeInputValue);
        handleClose();
    }

    return (
        <article className="add-course-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Add Course</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-title">Course Title</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="title"  id="title" onChange={handleInputChange} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-grade">Grade</label>
                        <select className="w-100 mt1 bn" name="course-grade" id="course-grade" onChange={handleSelectChange}>
                            <option value="" selected disabled hidden></option>
                            <option value="1">Fail</option>
                            <option value="2">Pass</option>
                            <option value="3">High Pass</option>
                            <option value="4">Honors</option>
                        </select>
                    </div>
                </fieldset>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick}>Add</button>
            </form>
        </article>
    )
}

const EditCoursePopUp = ({course, grade, visible, handleClose, handleEdit}) => {
    const popUpContainerRef = useRef(null);
    const [courseInputValue, setCourseInputValue] = useState(course);
    const [gradeInputValue, setGradeInputValue] = useState(grade);

    // Display the popup everytime visible is true, which happens when edit button is pressed
    useEffect(() => {
        setCourseInputValue(course);
        setGradeInputValue(grade);

        if (visible) {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.remove('dn');
                popUpContainerRef.current.classList.add('flex', 'content-center', 'justify-center', 'items-center');
            }
        } else {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.add('dn');
                popUpContainerRef.current.classList.remove('flex', 'content-center', 'justify-center', 'items-center');
            }
        }
        
    }, [visible])

    // Handler for closing pop up
    const handleCloseClick = (e) => {
        e.preventDefault();
        handleClose();
    }

    // Handlers for changing inputs
    const handleInputChange = (e) => {
        setCourseInputValue(e.target.value)
    }
    const handleSelectChange = (e) => {
        setGradeInputValue(e.target.value)
    }

    // Handler for submitting form
    const handleEditClick = (e) => {
        e.preventDefault();
        handleEdit({title: course, grade: grade}, courseInputValue, gradeInputValue);
        handleClose();
    }

    return (
        <article className="edit-course-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Edit Course</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-title-to-edit">Course Title</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="course-title-to-edit"  id="course-title-to-edit" value={courseInputValue} onChange={handleInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-grade
                        -to-edit">Grade</label>
                        <select className="w-100 mt1 bn" name="course-grade-to-edit" id="course-grade-to-edit" value={gradeInputValue} onChange={handleSelectChange}>
                            {/* <option value="" selected disabled hidden></option> */}
                            <option value="1">Fail</option>
                            <option value="2">Pass</option>
                            <option value="3">High Pass</option>
                            <option value="4">Honors</option>
                        </select>
                    </div>
                </fieldset>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>Edit</button>
            </form>
        </article>
    )
}

const Course = ({title, grade, handleEdit}) => {
    const row = []

    // Fill in number of cells that correspond to grade, and leave the remainder blank
    for (let i = 0; i < grade; i++) {
        row.push(<td><div className="course-grade-filled"></div></td>)
    }
    for (let i = 0; i < 4 - grade; i++) {
        row.push(<td></td>)
    }

    const handleClick = (title, grade) => {
        handleEdit(title, grade)
    }

    return (
        <tr className="stripe-dark relative">
            <td className="pa3">{title}</td>
            {row.map(cell => cell)}
            <button className="edit-btn" onClick={handleClick}><img src={editPNG} alt="Edit icon"/></button>
        </tr>
    )
}

const Courses = () => {
    // Booleans for whether to show pop ups
    const [showAddCoursePopUp, setShowAddCoursePopUp] = useState(false);
    const [showEditCoursePopUp, setShowEditCoursePopUp] = useState(false);
    
    // Fields to pass into edit form
    const [courseTitleToEdit, setCourseTitleToEdit] = useState('');
    const [courseGradeToEdit, setGradeToEdit] = useState(-1);

    const [courses, setCourses] = useState([
        {title: 'Family Medicine', grade: 4},
        {title: 'Pediatrics', grade: 2},
        {title: 'Emergency Medicine', grade: 3},
        {title: 'OB-GYN', grade: 3},
        {title: 'Internal Medicine', grade: 4}
    ])

    // Handlers for opening and closing add popup
    const handleAddClick = (e) => {
        setShowAddCoursePopUp(true);
    }
    const handleAddClose = () => {
        setShowAddCoursePopUp(false);
    }

    // Handler for closing edit pop up
    const handleEditClose = () => {
        setShowEditCoursePopUp(false);
    }

    // Handler for when edit button in course row is clicked 
    const handleEditCourseClick = (title, grade) => {
        console.log(title, grade)
        const course = courses.find(course => course.title === title)
        
        setCourseTitleToEdit(title)
        setGradeToEdit(grade)

        setShowEditCoursePopUp(true)
        console.log(course)
    }

    // Handler to add a course to the table
    const handleAddCourse = (title, grade) => {
        courses.push({title: title, grade: grade})
        setCourses(courses)
    }

    // Handler for when edit submit button is clicked in pop up. This changes value of course to be displayed in table
    const handleEditCourse = (originalCourse, newTitle, newGrade) => {
        const courseToUpdate = courses.find(course => course.title === originalCourse.title)
        courseToUpdate.title = newTitle;
        courseToUpdate.grade = Number.parseInt(newGrade);
        setCourses(courses)
    }

    return (
        <div className="pa4 courses-table-container relative">
            <div className="overflow-auto">
                <table className="f6 w-100 mw8 center" cellSpacing="0">
                <thead>
                    <tr className="">
                        <th className="fw6 tl pa3 academics-course-name">Clerkship Grades</th>
                        <th className="fw6 tl pa3 academics-course-f">F</th>
                        <th className="fw6 tl pa3 academics-course-p">P</th>
                        <th className="fw6 tl pa3 academics-course-hp">HP</th>
                        <th className="fw6 tl pa3 academics-course-h">H</th>
                        <th className="fw6 tl pa3 blank-col"></th>
                    </tr>
                </thead>
                <tbody className="lh-copy">
                    {courses.map(course => <Course title={course.title} grade={course.grade} handleEdit={() => handleEditCourseClick(course.title, course.grade)} />)}
                </tbody>
                </table>
            </div>
            <AddButton onClick={handleAddClick}/>
            <AddCoursePopUp visible={showAddCoursePopUp} handleClose={handleAddClose} handleAdd={handleAddCourse} />
            <EditCoursePopUp course={courseTitleToEdit} grade={courseGradeToEdit} visible={showEditCoursePopUp} handleClose={handleEditClose} handleEdit={handleEditCourse}/>
        </div>
    )
}

const EditScorePopUp = ({step, value, visible, handleClose, handleEdit}) => {
    const popUpContainerRef = useRef(null);
    const [inputValue, setInputValue] = useState(value > -1 ? value : '');

    // Display the popup everytime visible is true, which happens when edit button is pressed
    useEffect(() => {
        if (visible) {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.remove('dn');
                popUpContainerRef.current.classList.add('flex', 'content-center', 'justify-center', 'items-center');
            }
        } else {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.add('dn');
                popUpContainerRef.current.classList.remove('flex', 'content-center', 'justify-center', 'items-center');
            }
        }
        
    }, [visible])

    // Handler for closing pop up
    const handleCloseClick = (e) => {
        e.preventDefault();
        handleClose();
    }

    // Handler for score input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // Handler for submitting form
    const handleEditClick = (e) => {
        e.preventDefault();
        handleEdit(inputValue);
        handleClose();
    }

    return (
        <article className="edit-score-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">{`Edit Step ${step}`}</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor={`step-${step}-score`}>Score</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name={`step-${step}-score`}  id={`step-${step}-score`} value={inputValue} onChange={handleInputChange} />
                    </div>
                </fieldset>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>Edit</button>
            </form>
        </article>
    )
}

const Scores = ({score1, score2}) => {
    // Booleans for whether pop ups should be displayed
    const [showPopUp1, setShowPopUp1] = useState(false);
    const [showPopUp2, setShowPopUp2] = useState(false);

    // Score values to be passed to edit pop up
    const [step1Score, setStep1Score] = useState(score1)
    const [step2Score, setStep2Score] = useState(score2)

    // Handlers for displaying/closing pop ups
    const handleClick1 = (e) => {
        setShowPopUp1(true);
    }
    const handleClose1 = () => {
        setShowPopUp1(false);
    }
    const handleClick2 = (e) => {
        setShowPopUp2(true);
    }
    const handleClose2 = () => {
        setShowPopUp2(false);
    }

    // Handlers for setting scores when submitting form
    const handleEdit1 = (score) => {
        setStep1Score(score);
    }
    const handleEdit2 = (score) => {
        setStep2Score(score);
    }

    return (
        <div className="scores-container flex center justify-center mw8 mb5">
            <div className="score-container   br bw1 b--black">
                <h2 className="f2 tc">Step 1</h2>
                <p className="f1 mt1 tc">{step1Score > -1 ? step1Score : '---'} <span onClick={handleClick1}><img src={editPNG} alt="Edit button"/></span></p>
                <EditScorePopUp step={1} value={step1Score} visible={showPopUp1} handleClose={handleClose1} handleEdit={handleEdit1} />
            </div>
            <div className="score-container">
                <h2 className="f2 tc">Step 2</h2>
                <p className="f1 mt1 tc">{step2Score > -1 ? step2Score : '---'} <span onClick={handleClick2}><img src={editPNG} alt="Edit button"/></span></p>
                <EditScorePopUp step={2} value={step2Score} visible={showPopUp2} handleClose={handleClose2} handleEdit={handleEdit2} />
            </div>
            
        </div>
    )
}

const Percentile = () => {
    return (
        <div className="percentile-container center tc">
            <h2 className="f2">Percentile</h2>
            <div className="percentile-graph">
                <Graph />
            </div>
        </div>
    )
}

const Academics = ({gradYear}) => {
    const [score1, setScore1] = useState(260);
    const [score2, setScore2] = useState(-1);

    return (
        <section id="academics" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Academics</h1>
            <Scores score1={score1} score2={score2}/>
            <Percentile />
            <Courses />
        </section>
    )
}

export default Academics;
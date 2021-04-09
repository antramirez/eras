import { useRef, useEffect, useState } from 'react';
import Course from './../Course/Course';
import AddCoursePopUp from './../AddCoursePopUp/AddCoursePopUp';
import EditCoursePopUp from './../EditCoursePopUp/EditCoursePopUp';
import AddButton from './../AddButton/AddButton';

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
        console.log(title, grade);
        const course = courses.find(course => course.title === title);
        
        setCourseTitleToEdit(title);
        setGradeToEdit(grade);

        setShowEditCoursePopUp(true);
    }

    // Handler to add a course to the table
    const handleAddCourse = (title, grade) => {
        courses.push({title: title, grade: grade})
        setCourses(courses);
    }

    // Handler to delete a course and update courses
    const handleDeleteCourse = (title) => {
        const courseToDelete = courses.find(course => course.title === title);
        courses.splice(courses.indexOf(courseToDelete), 1);
        setCourses(courses);
    }

    // Handler for when edit submit button is clicked in pop up. This changes value of course to be displayed in table
    const handleEditCourse = (originalCourse, newTitle, newGrade) => {
        const courseToUpdate = courses.find(course => course.title === originalCourse.title);
        courseToUpdate.title = newTitle;
        courseToUpdate.grade = Number.parseInt(newGrade);
        setCourses(courses);
    }

    return (
        <div className="pa4 courses-container relative">
            <div className="courses-table-container mw8 center">
                <table className="f6 w-100" cellSpacing="0">
                <thead>
                    <tr className="">
                        <th className="fw6 tl pa3 academics-course-name f3">Clerkship Grades</th>
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
                <AddButton onClick={handleAddClick}/>
            </div>
            <AddCoursePopUp visible={showAddCoursePopUp} handleClose={handleAddClose} handleAdd={handleAddCourse} />
            <EditCoursePopUp course={courseTitleToEdit} grade={courseGradeToEdit} visible={showEditCoursePopUp} handleClose={handleEditClose} handleEdit={handleEditCourse} handleDelete={handleDeleteCourse} />
        </div>
    )
}

export default Courses;
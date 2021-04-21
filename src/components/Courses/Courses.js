import { useEffect, useState, useContext } from 'react';
import Course from './../Course/Course';
import { UserContext } from '../../context/UserContext';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import AddCoursePopUp from './../AddCoursePopUp/AddCoursePopUp';
import EditCoursePopUp from './../EditCoursePopUp/EditCoursePopUp';
import AddButton from './../AddButton/AddButton';

const Courses = () => {
    const { isLoggedIn } = useContext(UserContext);

    // Booleans for whether to show pop ups
    const [showAddCoursePopUp, setShowAddCoursePopUp] = useState(false);
    const [showEditCoursePopUp, setShowEditCoursePopUp] = useState(false);
    const [fakeIdCounter, setFakeIdCounter] = useState(6);
    
    // Fields to pass into edit form
    const [courseTitleToEdit, setCourseTitleToEdit] = useState('');
    const [courseGradeToEdit, setGradeToEdit] = useState(-1);
    const [courseIdToEdit, setCourseIdToEdit] = useState(0);

    const [courses, setCourses] = useState([])

    useEffect(() => {
        if (isLoggedIn) {
            apiRequest('courses', 'GET', {}, setCourses, console.log);
        } else {
            const fakeCourses = [
                {_id: 1, name: 'Family Medicine', grade: 4},
                {_id: 2, name: 'Pediatrics', grade: 2},
                {_id: 3, name: 'Emergency Medicine', grade: 3},
                {_id: 4, name: 'OB-GYN', grade: 3},
                {_id: 5, name: 'Internal Medicine', grade: 4}
            ];
            setCourses(fakeCourses);
        }
    }, [isLoggedIn])

    // Handler for when edit button in course row is clicked 
    const handleEditCourseClick = (courseId, title, grade) => {
        setCourseIdToEdit(courseId)
        setCourseTitleToEdit(title);
        setGradeToEdit(grade);

        setShowEditCoursePopUp(true);
    }

    // Handler to add a course to the table
    const handleAddCourse = (title, grade) => {
        if (isLoggedIn) {
            apiRequest('courses', 'POST', {name: title, grade: grade}, (course) => {
                setCourses([...courses, course]);
            }, console.log);
        } else {
            setCourses([...courses, {_id: fakeIdCounter, name: title, grade: grade}])
            setFakeIdCounter(fakeIdCounter + 1);
        }
    }

    // Handler to delete a course and update courses
    const handleDeleteCourse = (courseId) => {
        if (isLoggedIn) {
            idApiRequest('courses', courseId, 'DELETE', {}, () => {
                setCourses(courses.filter(course => course._id !== courseId));
            }, console.log);
        } else {
            setCourses(courses.filter(course => course._id !== courseId));
        }        
    }

    // Handler for when edit submit button is clicked in pop up. This changes value of course to be displayed in table
    const handleEditCourse = (courseId, newTitle, newGrade) => {
        const courseToUpdate = courses.find(course => course._id === courseId);

        if (isLoggedIn) {
            idApiRequest('courses', courseId, 'PATCH', {name: newTitle, grade: newGrade}, (course) => {
                console.log(course)
                courseToUpdate.name = course.name;
                courseToUpdate.grade = course.grade;
                setCourses([...courses]);
            }, console.log);
        } else {
            courseToUpdate.name = newTitle;
            courseToUpdate.grade = Number.parseInt(newGrade);
            setCourses([...courses]);
        }
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
                    {courses.map(course => <Course key={course._id} title={course.name} grade={course.grade} handleEdit={() => handleEditCourseClick(course._id, course.name, course.grade)} />)}
                </tbody>
                </table>
                <AddButton onClick={() => setShowAddCoursePopUp(true)}/>
            </div>
            <AddCoursePopUp visible={showAddCoursePopUp} handleClose={() =>  setShowAddCoursePopUp(false)} handleAdd={handleAddCourse} />
            <EditCoursePopUp id={courseIdToEdit} course={courseTitleToEdit} grade={courseGradeToEdit} visible={showEditCoursePopUp} handleClose={() => setShowEditCoursePopUp(false)} handleEdit={handleEditCourse} handleDelete={handleDeleteCourse} />
        </div>
    )
}

export default Courses;
import { useEffect, useState, useContext, useReducer } from 'react';
import Course from './../Course/Course';
import { UserContext } from '../../context/UserContext';
import { courseReducer } from '../../reducers/CourseReducer';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import { fakeCourses } from '../../data/fakeData';
import AddCoursePopUp from './../AddCoursePopUp/AddCoursePopUp';
import EditCoursePopUp from './../EditCoursePopUp/EditCoursePopUp';
import AddButton from './../AddButton/AddButton';

const Courses = () => {
    const { isLoggedIn } = useContext(UserContext);

    const [state, dispatch] = useReducer(courseReducer, { name: '', grade: '', isFetching: false, isAdding: false, isEditing: false, isDeleting: false, fetchSuccess: false, addSuccess: false, editSuccess: false, deleteSuccess: false, fetchError: '', addError: '', editError: '', deleteError: '' });
    const { isFetching, fetchError } = state;

    // Booleans for whether to show pop ups
    const [showAddCoursePopUp, setShowAddCoursePopUp] = useState(false);
    const [showEditCoursePopUp, setShowEditCoursePopUp] = useState(false);
    const [fakeIdCounter, setFakeIdCounter] = useState(6);
    
    // Course object to pass into edit form
    const [courseToEdit, setCourseToEdit] = useState({_id: 0, title: '', grade: 0});
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch({ type: 'fetch' });
            apiRequest('courses', 'GET', {}, (data) => {
                setCourses(data);
                dispatch({ type: 'fetch_success' });
            }, () => {
                dispatch({ type: 'fetch_error', payload: "Could not load your clerkship grades, please try again later." });
            });

            // Set error message if api can't be accessed
            if (!state.fetchSuccess) {
                dispatch({ type: 'fetch_error', payload: 'Could not load your clerkship grades, please try again later.' });
            }
        } else {
            setCourses(fakeCourses);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    // Handler for when edit button in course row is clicked 
    const handleEditCourseClick = (course) => {
        setCourseToEdit(course);
        setShowEditCoursePopUp(true);
    }

    // Handler to add a course to the table. Returns a successful add boolean
    const handleAddCourse = async (name, grade) => {
        dispatch({ type: 'add', payload: {name, grade} });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await apiRequest('courses', 'POST', {name, grade}, (course) => {
                setCourses([...courses, course]);
                dispatch({ type: 'add_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'add_error', payload: e.error });
                success = false;
            });
        } else {
            setCourses([...courses, {_id: fakeIdCounter, name, grade}]);
            setFakeIdCounter(fakeIdCounter + 1);
            dispatch({ type: 'add_success' });
            success = true;
        }

        return success;
    }

    // Handler to delete a course and update courses
    const handleDeleteCourse = async (courseId) => {
        dispatch({ type: 'delete' });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await idApiRequest('courses', courseId, 'DELETE', {}, () => {
                setCourses(courses.filter(course => course._id !== courseId));
                dispatch({ type: 'delete_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'delete_error', payload: e.error });
                success = false;
            });
        } else {
            setCourses(courses.filter(course => course._id !== courseId));
            dispatch({ type: 'delete_success' });
            success = true;
        }

        return success;
    }

    // Handler for when edit submit button is clicked in pop up. This changes value of course to be displayed in table
    const handleEditCourse = async (courseId, newTitle, newGrade) => {
        dispatch({ type: 'edit' });
        let success = false; // temporary variable to get around reducer's async functionality

        const courseToUpdate = courses.find(course => course._id === courseId);

        if (isLoggedIn) {
            await idApiRequest('courses', courseId, 'PATCH', {name: newTitle, grade: newGrade}, (course) => {
                courseToUpdate.name = course.name;
                courseToUpdate.grade = course.grade;
                setCourses([...courses]);
                
                dispatch({ type: 'edit_success' });
                success = true;
            }, (e) => {
                dispatch({ type:'edit_error', payload: e.error });
                success = false;
            })
        } else {
            courseToUpdate.name = newTitle;
            courseToUpdate.grade = Number.parseInt(newGrade);
            setCourses([...courses]);

            dispatch({ type: 'edit_success' });
            success = true;
        }
        
        return success;
    }

    return (
        <div className="pa4 courses-container relative">
            <div className="courses-table-container mw8 center">
                {isFetching ? 'Loading clerkship grades...' : 
                fetchError ? <p className="f4 red b tc">{fetchError}</p> : 
                <>
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
                    {courses.map(course => <Course key={course._id} title={course.name} grade={course.grade} handleEdit={() => handleEditCourseClick(course)} />)}
                </tbody>
                </table>
                <AddButton onClick={() => setShowAddCoursePopUp(true)}/>
                </>
                }
            </div>
            <AddCoursePopUp visible={showAddCoursePopUp} state={state} dispatch={dispatch} handleClose={() => setShowAddCoursePopUp(false)} handleAdd={handleAddCourse} />
            <EditCoursePopUp course={courseToEdit} state={state} dispatch={dispatch} visible={showEditCoursePopUp} handleClose={() => setShowEditCoursePopUp(false)} handleEdit={handleEditCourse} handleDelete={handleDeleteCourse} />
        </div>
    )
}

export default Courses;
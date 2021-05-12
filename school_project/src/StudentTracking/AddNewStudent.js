import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import './addStudentBtnStyles.css'


import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, 
         Typography, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RoomIcon from '@material-ui/icons/Room'


// setting up styling.
const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: 'inherit',
        opacity: 1,
        color: 'white',
        backgroundColor: '#2E2A3B'
    },
    listItem: {
        '&:hover': {
            backgroundColor: '#13131A'
        }
    }, 
    listItemIcon: {
        color: 'white'
    },
    addNewStudentForm: {
        width:'790px',
        height: '530px',
        position: 'relative',
        top: '20px',
        left: '60px',
        boxShadow: '2px 2px 8px',
        borderRadius: '3%'
        
    },
    actualForm: {
        textAlign: 'center',
        marginTop: '10px'
    },
    firstNameLastNameDiv: {
        marginTop: '15px'
    },
    firstNameTextField: {
        position: 'relative',
        right: '90px'
    },
    lastNameTextField: {
        position: 'relative',
        left: '40px'
    },
    idNumberAndRoomNumberDiv: {
        marginTop: '30px'
    },
    levelAndSexDiv: {
        marginTop: '30px'
    },
    courseAndMobileNumberDiv: {
        marginTop: '-10px'
    },
    pictureDiv: {
        position: 'relative',
        top: '20px',
        right: '170px'
    },
    addStudentButton: {
        width: '200px',
        position: 'relative',
        top: '55px'
    },
    cancelAddStudentButton: {
        width: '200px',
        position: 'relative',
        top: '55px',
        marginLeft: '30px'
    },
    uploadPictureText: {
        position: 'relative',
        right: '12px',
        top: '5px'
    },
    sexAutocomplete: {
        position: 'relative',
        left: '105px',
    },
    levelAutocomplete: {
        position: 'relative',
        left: '432px',
        bottom: '50px'

    }
}))





export default function AddNewStudent() {

    // handling state for each of the form components.
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ indexNumber, setIndexNumber ] = useState('')
    const [ roomNumber, setRoomNumber ] = useState('')
    const [ course, setCourse ] = useState('')
    const [ mobileNumber, setMobileNumber ] = useState('')
    const [ selectedPicture, setSelectedPicture ] = useState(null)

    // handling the state for the sex autocomplete component.
    const [ sexValue, setSexValue ] = useState('Male')
    const [ sexInputValue, setSexInputValue ] = useState('')


    // handling state for the level autocomplete component.
    const [ levelValue, setLevelValue ] = useState('100')
    const [ levelInputValue, setLevelInputValue ] = useState('')





    // updating state for the first name component.
    const handleFirstNameComponentState = ( event ) => {
        setFirstName(event.target.value)
    }

    // updating state for the last name component.
    const handleLastNameComponent = ( event ) => {
        setLastName(event.target.value)
    }

    // updating the index number component.
    const handleIndexNumberComponent = ( event ) => {
        setIndexNumber(event.target.value)
    }

    // updating room number component.
    const handleRoomNumberComponent = ( event ) => {
        setRoomNumber(event.target.value)
    }

    // resetting all components when cancel button is clicked.
    const handleCancelBtnClick = ( ) => {
        setFirstName('')
        setLastName('')
        setCourse('')
        setIndexNumber('')
        setRoomNumber('')
        setMobileNumber('')
        setSexInputValue('')
        setLevelInputValue('')
    } 

    /* updating the level component.
    const handleLevelComponent = ( event, value ) => {
        setLevel(event.target.value)
        console.log(`level value = ${value}`)
    } */

    // updating the course component.
    const handleCourseComponent = ( event ) => {
        setCourse(event.target.value)
    }

    // updating the mobile number component.
    const handleMobileNumberComponent = ( event ) => {
        setMobileNumber(event.target.value)
    }

    // handling form submission.
    const handleFormSubmit = ( event ) => {
        event.preventDefault()

        let newStudent = {
            firstName: firstName[0].toUpperCase() + firstName.substring(1).trim(),
            lastName: lastName[0].toUpperCase() + lastName.substring(1).trim(),
            indexNumber: indexNumber.trim(),
            roomNumber: roomNumber.trim(),
            course: course[0].toUpperCase() + course.substring(1).trim(),
            mobileNumber: mobileNumber.trim(),
            sexInputValue,
            levelInputValue
        }


        // initializing the firebase collection to store added students.
        let addedStudentsCollection = projectFirestore.collection('Added Students Collection')
        // preventing the addition of duplicate records
        addedStudentsCollection.where('indexNumber', '==', indexNumber)
        .get().then( querySnapshot => {
            if(querySnapshot.empty) {
                addedStudentsCollection.add( newStudent ).then(doc => {
                    console.log(`document added with id ${doc.id} `)
                    
                })
            } else {
                // modal goes here later.
                alert(`Failed to add student. Student with the id ${indexNumber} already exists`)
            }
        })

    }


    // initializing styling
    const classes = useStyles()

    // for routing
    const router = useHistory()

    // the array to hold the sex values.
    let sexValuesArray = [
        { gender: 'Male' },
        { gender: 'Female'}
    ]

    // the array to hold the values of the level.
    let levelValuesArray = [
        { level: '100' },
        { level: '200'},
        { level: '300'},
        { level: '400'}
    ]
    


    return (
        <div style={{display: 'flex'}}>
            <Drawer variant='persistent'
                    anchor='left'
                    open={true}
                    style={{width: '200px'}}
                    classes={{paper: classes.drawerPaper }}
             >
                 <List>
                     <div onClick={() => router.push('/viewallstudents')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                             <PersonIcon />
                         </ListItemIcon>
                         <ListItemText primary={'View all students'} />
                     </ListItem>
                     </div>
                     
                    <div onClick={() => router.push('/addnewstudent')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <PersonAddIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Add new student'} />
                     </ListItem>
                     </div>

                    <div onClick={() => router.push('/editstudentdetails')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <EditIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Edit student details'} />
                     </ListItem>
                     </div>

                    <div onClick={() => router.push('/deletestudent')}>
                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <DeleteIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Delete student'} />
                     </ListItem>
                     </div>
                     <hr />

                     <ListItem button className={classes.listItem}>
                         <ListItemIcon className={classes.listItemIcon}>
                                <RoomIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Looking for NSS accomodation? Click here'} />
                     </ListItem>

                 </List>
            </Drawer>



            {/* the form for adding a new student */}
            <div className={classes.addNewStudentForm}>
                <form onSubmit={ handleFormSubmit } className={classes.actualForm}>
                    <Typography variant='h14'>
                        Enter the details of the student.
                    </Typography>

                    {/* the first name and last name div */}
                    <div className={classes.firstNameLastNameDiv}>
                       <TextField 
                          variant='outlined'
                          label='First Name'
                          required={ true }
                          className={classes.firstNameTextField}
                          onChange={ handleFirstNameComponentState }
                          value={ firstName }
                       />

                       <TextField 
                        variant='outlined'
                        label='Last Name'
                        required={ true }
                        className={classes.lastNameTextField}
                        onChange={ handleLastNameComponent } 
                        value={ lastName }
                       />

                    </div>

                    {/* the id number and room number div */}
                    <div className={classes.idNumberAndRoomNumberDiv}>
                       <TextField 
                          variant='outlined'
                          label='Index Number'
                          required={ true }
                          className={classes.firstNameTextField}
                          onChange={ handleIndexNumberComponent }
                          value={ indexNumber }
                       />

                        <TextField 
                          variant='outlined'
                          label='Room Number'
                          required={ true }
                          className={classes.lastNameTextField}
                          onChange={ handleRoomNumberComponent }
                          value={ roomNumber }
                       />
                       
                    </div>

                    {/* the level and sex div */}
                    <div className={classes.levelAndSexDiv}>
                        <Autocomplete 
                            id='sex autocomplete'
                            options={ sexValuesArray }
                            getOptionLabel = { (option) => option.gender }
                            renderInput = { (params) => (
                                <TextField {...params} required={true} label='Sex' variant='filled' />
                            ) }
                            style={{width: 200}}
                            className={classes.sexAutocomplete}
                            size='small'
                            value={ sexValue }
                            onChange={(event, newValue) => {
                                setSexValue(newValue)
                            }}
                            inputValue={ sexInputValue }
                            onInputChange={(event, newInputValue) => {
                                setSexInputValue(newInputValue)
                            }}
                                
                        />

                        <Autocomplete 
                            id='level autocomplete'
                            options={ levelValuesArray }
                            getOptionLabel={ (option) => option.level }
                            renderInput={ (params) => (
                                <TextField {...params} required={true} label='Level' variant='filled' />
                            )}
                            style={{width: 200}}
                            className={classes.levelAutocomplete}
                            size='small'
                            value={ levelValue }
                            onChange={(event, newValue) => {
                                setLevelValue(newValue)
                            }}
                            inputValue={ levelInputValue }
                            onInputChange={(event, newInputValue) => {
                                setLevelInputValue(newInputValue)
                            }}
                              
                        />

                    </div>

                    {/* the course and mobile number div */}
                    <div className={classes.courseAndMobileNumberDiv}>
                       <TextField 
                          variant='outlined'
                          label='Course'
                          required={ true }
                          className={classes.firstNameTextField}
                          onChange={ handleCourseComponent }
                          value={ course }
                       />

                       <TextField 
                        variant='outlined'
                        label='Mobile Number'
                        required={ true }
                        className={classes.lastNameTextField}
                        onChange={ handleMobileNumberComponent }
                        value={ mobileNumber }
                       />

                    </div>

                    {/* the upload picture div */}
                    <div className={classes.pictureDiv}>
                        <input type='file' />
                        <div className={classes.uploadPictureText}>
                        <Typography variant='h9'>
                            Upload student picture.
                        </Typography>
                        </div>
                    </div>


                    { /* the div for the button to add the student to database 
                        <Button type='submit'
                            className={classes.addStudentButton}
                            variant='contained'
                            size='medium'
                            color='primary'
                            startIcon={ <SaveIcon /> }
                            onClick={ handleFormSubmit }
                        >
                            Add Student
                    </Button> */}
                   

                    { /* the cancel button  
                        <Button
                            className={classes.cancelAddStudentButton}
                            variant='contained'
                            size='medium'
                            color='primary'
                            startIcon={ <CancelIcon /> }
                            onClick={() => {}}
                        
                        >
                            Cancel
                    </Button> */}

                    <div className='actionButtonsDiv'>
                        <button type='submit' className='addStudentBtn'> Add student  </button>

                        <button type='button' className='cancelAddStudentBtn' onClick={ handleCancelBtnClick }>
                             Cancel  
                        </button>
                    </div>
                        
                 
                </form>
                
            </div>

        </div>
    )
}
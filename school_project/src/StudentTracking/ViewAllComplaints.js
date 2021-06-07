import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import SwipeableDrawer from '../Drawers/SwipeableDrawer'
//import PersistentDrawer from '../Drawers/PersistentDrawer'
import { projectFirestore } from '../firebaseSetup/firebaseConfig'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import RestoreIcon from '@material-ui/icons/Restore'
import Button from '@material-ui/core/Button'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'





export default function ViewAllComplaints() {

    // handling state.
    const [ complaintsArray, setComplaintsArray ] = useState([ ])
    const [ selectedRow, setSelectedRow ] = useState(null)

    let complaintResolvedStatus = 'Pending'
    const [ complaintAttended, setComplaintAttended ] = useState( false )


    // the useEffect to fetch all complaints.
    useEffect(() => {
        let fetchComplaints = projectFirestore.collection('Submitted Complaints Collection')
        fetchComplaints.onSnapshot( snapshot => {
            let temporaryArray = []
            snapshot.forEach( document => {
                temporaryArray.push({ id : document.id, ...document.data()})
            })

            setComplaintsArray(temporaryArray)
            //complaintsArray.forEach( complaint => console.log(complaint))
        })

    }, [ ])


    // setting up the table columns.
    let tableColumns = [
        { title: 'Student Index Number', field: 'studentIndexNumber' },
        { title: 'Student Full Name', field: 'studentFullName' },
        { title: 'Room Number', field: 'roomNumber' },
        { title: 'Complaint Type', field: 'complaintTypeInputValue' },
        { title: 'Complaint Description', field: 'complaintDescription'},
        { title: 'Student Mobile Number', field: 'mobileNumber' },
        { title: 'Date Submitted', field: 'date'},
        { title: 'Complaint Status', field: 'complaintStatus'}

    ]




    return (
        <div style={{display: 'flex'}}>
            <SwipeableDrawer />


            <MaterialTable 
                title='Submitted Complaints'
                data={ complaintsArray }
                columns={ tableColumns }
                onRowClick={ ((event, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                    options={{
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        rowStyle: rowData => ({
                            //backgroundColor: ( selectedRow === rowData.tableData.id) ? 'darkgrey' : '#FFF',
                            //color: ( selectedRow === rowData.tableData.id) ? 'black' : 'black'
                            backgroundColor: ( rowData.tableData.id % 2 === 1 ) ? '#b3b3ff' : '#FFF'
                        }),
                        actionsColumnIndex: -1,
                        exportButton: true

                    }}
                    editable={{
                        onRowDelete : ( selectedRow ) => new Promise((resolve, reject) => {
                                   if( selectedRow.complaintStatus === 'Pending'){
                                       // modal here later
                                       alert('You cannot delete a complaint that is yet to be attended to !!')
                                       setTimeout(() => {
                                           resolve()
                                       }, 300)
                                   }
                                   else {
                                       // modal here later.
                                       let docToDelete = projectFirestore.collection('Submitted Complaints Collection').doc( selectedRow.id )
                                       docToDelete.delete()
                                       .then(() => {
                                           // modal here later.
                                           alert(`document with id ${ selectedRow.id } deleted successfully`)
                                       })
                                       .catch( error => {
                                           // modal here later.
                                           alert('failed to delete document.')
                                           console.log(`failed to delete document due to error: ${ error }`)
                                       })
                                       setTimeout(() => {
                                        resolve()
                                         }, 300)

                                        } 
                        })
                    }}
                    actions={[
                        {
                          icon: () => ( <CheckCircleOutlineIcon/> ),
                          tooltip: 'Mark Complaint As Resolved',
                          onClick: (event, rowData) => {
                            projectFirestore.collection('Submitted Complaints Collection').doc( rowData.id )
                            .update({
                                complaintStatus : 'Resolved'
                            })
                            .then(() => {
                                // modal here later.
                                alert(`document with id ${ rowData.id } updated successfully`)
                            })
                            .catch( error => {
                                // modal here later.
                                alert(`failed to update document due to error: ${ error }`)
                            })

                          }

                        },

                        {
                            icon: () => ( <RestoreIcon /> ),
                            tooltip: 'Reset Complaint Status',
                            onClick: (event, rowData) => {
                              projectFirestore.collection('Submitted Complaints Collection').doc( rowData.id )
                              .update({
                                  complaintStatus : 'Pending'
                              })
                              .then(() => {
                                  // modal here later.
                                  alert(`document with id ${ rowData.id } updated successfully`)
                              })
                              .catch( error => {
                                  // modal here later.
                                  alert(`failed to update document due to error: ${ error }`)
                              })
  
                            }
  
                          }
                      ]}


                      

            />




            
            
        </div>
    )
}
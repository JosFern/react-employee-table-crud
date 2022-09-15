import React, { useEffect, useState } from 'react';
import EmployeeTable from './components/EmployeeTable';
import FormInput from './components/FormInput';
import Modal from './components/Modal';
import { employeesData, FullTimeEmployee, PartTimeEmployee} from './models/employee';

export default function App() {
  
  const [employees, setEmployees] = useState([...employeesData])

  const [editModal, setEditModal] = useState(false)
  const [addModal, setAddModal] = useState(false)

  const [addEmpInfo, setAddEmpInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    position: '',
    empType: '',
    overtime: 0,
    absences: 0,
    leaves: 0  
  })

  const [editEmpInfo, setEditEmpInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    position: '',
    index: 0
  })

  useEffect(() => {
    // alert('Welcome')
  }, [])

    // handle change in add employee form
    const handleAddEmpChange = (e) => {
        const {name, value} = e.target;
        setAddEmpInfo( {
                ...addEmpInfo,
                [name]: value
            }
        )
    }

    // handles submit in add employee
    const handleAddSubmit = (e) => {
      e.preventDefault()
      
      const { firstname, lastname, email, position, empType, overtime, absences, leaves} = addEmpInfo

      const today = new Date();
      const formatDate = today.toLocaleDateString('en-US', {
          year: "2-digit",
          month: "short",
          day: '2-digit',
      })
      
      if (empType === 'Full-Time') {
        const addFullTimeEmp = new FullTimeEmployee(firstname, lastname, email, overtime, absences, position, leaves, formatDate)

        employees.push(addFullTimeEmp)
        
        setEmployees([...employees])
          
      } else {
          
        const addPartTimeEmp = new PartTimeEmployee(firstname, lastname, email, overtime, absences, position, leaves, formatDate)
        
        employees.push(addPartTimeEmp)
        
        setEmployees([...employees])
      }

      setAddEmpInfo({
        firstname: '',
        lastname: '',
        email: '',
        position: '',
        empType: '',
        overtime: 0,
        absences: 0,
        leaves: 0
      
      })

      setAddModal(prevState => !prevState)
    }

    // handles modal for add employee form
    const toggleAddModal = () =>{ 
        setAddModal(prevState => !prevState)
    }

    // handles modal for edit employee form and load the values of the employee on the inputs
    const toggleUpdateModal = (emp, index) => {

        const { firstname, lastname, email, position} = emp

        setEditModal(prevState => !prevState)


        setEditEmpInfo({firstname, lastname, email, position, index})
    }

    // handle change in add employee form
    const handleUpdateEmpChange = (e) => {
        const {name, value} = e.target;
        setEditEmpInfo({
          ...editEmpInfo,
          [name]: value
        })
    }

    // handle update submit
    const handleUpdateSubmit = (e) =>  {
      e.preventDefault()
      
      const emp = employees
      emp[editEmpInfo.index].updateInfo(editEmpInfo)

      setEditModal(prevState => !prevState)
    }
  
    const handleDelete = (index) =>  {
        employees.splice(index, 1)
        setEmployees([...employees])
    }


    return (
      <div className='flex justify-center items-start pt-[5%] min-h-screen bg-[#fff] bg-gradient-to-r from-[#f6d365] to-[#fda085]'>
        <div className='w-[90%] p-4 bg-white bg-gradient-to-tr from-[#13547a] to-[#80d0c7] font-sans font-bold text-xl tracking-wider rounded-md shadow-2xl'>
          <div className='absolute top-2 left-2 flex items-center gap-4'>
            <button className='bg-[#44bd32] hover:bg-[#4cd137] p-2 rounded-md text-white hover:shadow-xl' onClick={toggleAddModal}>+ Add employee</button>
            <h1 className='text-[#2f3640]'>Total Employees: <span className='text-[#192a56]'>{employees.length}</span></h1>
          </div>
          <EmployeeTable empData={employees} handleEdit={toggleUpdateModal} handleDelete={handleDelete}  />
        </div>
            
        {/*--------------------------ADD MODAL--------------------------------- */}
        {addModal &&
          <Modal toggle={toggleAddModal}>

            <h1 className="font-bold tracking-normal text-gray-800 mb-1">Add Employee</h1>

            <form onSubmit={handleAddSubmit}>

              <FormInput type="text" label="First name" name='firstname' value={addEmpInfo.firstname} setData={handleAddEmpChange} />

              <FormInput type="text" label="Last name" name='lastname' value={addEmpInfo.lastname} setData={handleAddEmpChange} />

              <FormInput type="text" label="Email" name='email' value={addEmpInfo.email} setData={handleAddEmpChange} />

              <FormInput type="text" label="Position" name='position' value={addEmpInfo.position} setData={handleAddEmpChange} />

              <select className="outline-none p-2 rounded-md ring-2 ring-[#dcdde1] ring-offset-[-1px] w-[full]" required name="empType" onChange={handleAddEmpChange}>
                  <option value="">Employee Type</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Full-Time">Full-Time</option>
              </select>

              <div className='flex items-center mt-2 gap-4'>
                  <h3>Overtime</h3>
                  <input className="outline-none p-2 rounded-md ring-2 ring-[#dcdde1] ring-offset-[-1px] w-[30%] h-8" required type="number" placeholder="Overtime" name='overtime' value={addEmpInfo.overtime} onChange={handleAddEmpChange} />
              </div>

              <div className='flex items-center mt-2 gap-4'>
                  <h3>Absences</h3>
                  <input className="outline-none p-2 rounded-md ring-2 ring-[#dcdde1] ring-offset-[-1px] w-[30%] h-8" required type="number" placeholder="Absence/s" name='absences' value={addEmpInfo.absences} onChange={handleAddEmpChange} />
              </div>

              <div className='flex items-center mt-2 gap-4'>
                  <h3>Leaves</h3>
                  <input className="outline-none p-2 rounded-md ring-2 ring-[#dcdde1] ring-offset-[-1px] w-[30%] h-8" required type="number" placeholder="Leave/s" name='leaves' value={addEmpInfo.leaves} onChange={handleAddEmpChange} />
              </div>

              <button className='bg-[#44bd32] hover:bg-[#4cd137] p-2 rounded-md text-white self-center w-full mt-3'>Add</button>
            </form>
          </Modal>
        }

        {/*--------------------------EDIT MODAL--------------------------------- */}
        {editModal &&
          
          <Modal toggle={toggleUpdateModal}>

            <h1 className="font-bold tracking-normal text-gray-800 mb-1">Update Employee</h1>

            <form className='w-[90%] flex flex-col justify-center items-center gap-3' onSubmit={handleUpdateSubmit}>

                <input className="outline-none p-2 rounded-md ring-2 ring-[#dcdde1] ring-offset-[-1px] w-full" required type="text" placeholder="First name" name='firstname' defaultValue={editEmpInfo.firstname} onChange={handleUpdateEmpChange} />

                <input className="outline-none p-2 rounded-md ring-2 ring-[#dcdde1] ring-offset-[-1px] w-full" required type="text" placeholder="Last name" name='lastname' defaultValue={editEmpInfo.lastname} onChange={handleUpdateEmpChange} />

                <input className="outline-none p-2 rounded-md ring-2 ring-[#dcdde1] ring-offset-[-1px] w-full" required type="text" placeholder="Email" name='email' defaultValue={editEmpInfo.email} onChange={handleUpdateEmpChange} />

                <input className="outline-none p-2 rounded-md ring-2 ring-[#dcdde1] ring-offset-[-1px] w-full" required type="text" placeholder="Position" name='position' defaultValue={editEmpInfo.position} onChange={handleUpdateEmpChange} />

                <button className='bg-[#44bd32] hover:bg-[#4cd137] p-2 rounded-md text-white self-center w-full mt-3'>Update</button>
            </form>

          </Modal>
        }
      </div>
    )
}
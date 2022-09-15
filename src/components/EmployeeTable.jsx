import React from 'react';

export default function EmployeeTable(props) {
    return (
        <table className='table-auto w-full text-white'>
            <thead className='text-xl bg-[#192a56]'>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>Position</th>
                    <th>Date added</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.empData.map((emp, index) => (
                    <tr key={index} className='text-center'>
                        <td>{emp.firstname}</td>
                        <td>{emp.lastname}</td>
                        <td>{emp.email}</td>
                        <td>${emp.computeSalary()}</td>
                        <td>{emp.position}</td>
                        <td>{emp.dateAdded}</td>
                        <td>
                            <button className='bg-[#44bd32] hover:bg-[#4cd137] p-2 rounded-md mr-2 mt-1 hover:shadow-xl' onClick={() => props.handleEdit(emp, index)}>Update</button>
                            <button className='bg-[#c23616] hover:bg-[#e84118] p-2 rounded-md hover:shadow-xl' onClick={() => props.handleDelete(index)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
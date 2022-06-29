import React, { useState, useEffect } from 'react'

const Form = () => {
    const [userRegistration, setuserRegistration] = useState({
        username: "",
        email: "",
        role: "",
        password: ""
    });

    const [userRecord, setuserRecord] = useState(null);

    useEffect(() => {
        debugger;
        let list = JSON.parse(localStorage.getItem('list'));
        setuserRecord(list);

    },[])

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuserRegistration({ ...userRegistration, [name]: value })
    }
    const onDelete = (ind) => {
        debugger;
        let xyz = userRecord;
        xyz.splice(ind, 1);
        setuserRecord(xyz);
    }
    const onEdit = (username, email, role, password) => {
        debugger;
        setuserRecord({
            username: username,
            email: email,
            role: role,
            password: password
        })
        localStorage.setItem("list", JSON.stringify(userRecord));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        var newRecord = { ...userRegistration }
        setuserRecord([...userRecord, newRecord])
        // console.log(userRecord);
        setuserRegistration({ username: "", email: "", role: "", password: "" });
        if (localStorage.getItem('list') != null) {
            newRecord = JSON.parse(localStorage.getItem('list'));
            var list = { username: e.target.username.value, email: e.target.email.value, role: e.target.role.value, password: e.target.password.value };
            newRecord.push(list);
            localStorage.setItem("list", JSON.stringify(newRecord));
        }
        else {
            localStorage.setItem("list", JSON.stringify([newRecord]));
        }
    }
    return (
        <div className='container'>
            <form className='container' onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="username">Name</label>
                    <input type="text" value={userRegistration.username} onChange={handleInput} name='username' id='username' className='form-control' />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" value={userRegistration.email} onChange={handleInput} name='email' id='email' className='form-control' />
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <input type="text" value={userRegistration.role} onChange={handleInput} name='role' id='role' className='form-control' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={userRegistration.password} onChange={handleInput} name='password' id='password' className='form-control' />
                </div>
                <button className='btn btn-primary my-2' type='submit'>Submit </button>
            </form>
            <h2 className='my-3'>Details Table</h2>
            <table className='table'>
                <thead>
                    <tr className='table-info'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Password</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {
                    userRecord !== null && userRecord.length > 0 && userRecord?.map((curElement) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{curElement.username}</td>
                                    <td>{curElement.email}</td>
                                    <td>{curElement.role}</td>
                                    <td>{curElement.password}</td>
                                    <td><button className='btn btn-success' onClick={() => onEdit(curElement.email, curElement.username, curElement.role, curElement.password)}>Edit</button></td>
                                    <td><button className='btn btn-danger' onClick={() => onDelete(curElement.email)}>Delete</button></td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        </div>
    )
}
export default Form
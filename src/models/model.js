import pool from './pool';

export async function registerUser(userInfo){
    const { firstName, lastName, email, password } = userInfo;   
    const query = 'INSERT INTO usersLoginInfo(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [firstName, lastName, email, password]
    const data = await pool.query( query,values)
    .then(res => res.rows)
    .catch(err => console.log("Error",err))
     await pool.end();
     return data;
    
 }

 export async function getUserInfo(email){
    const query = 'SELECT * FROM usersLoginInfo WHERE email = $1';
    const values = [email];
    const data = await pool.query(query,values)
    .then(res => {
        return res.rows;
    })
    .catch(err => console.log("Error",err))
     return data;
 }

# UserByRole-backend

Steps to run the project:

Step 1:
Clone the project from github using the below command
git clone https://github.com/vvekbc/UserByRole-backend.git

Step 2:
Run 'npm install' command in the project root directory

Steps 3:
Run the below two functions in the user.service.js file to import data from csv files:
1.readRolesFromFile()
2.readUsersFromFile()

Step 4:
Use the below endpoints:

Create Role:
Method:POST
EndPoint:http://localhost:3000/roles
Body:{"name":"Admin"}



List All Roles:
Method:GET
EndPoint:http://localhost:3000/roles

Get Role details By role Id:
Method:GET
EndPoint:http://localhost:3000/roles/6316f469-3a9e-75e6-a9c0b3d53c33a522

Update role by role Id:
Method:PUT
EndPoint:http://localhost:3000/roles/6316f469-3a9e-75e6-a9c0b3d53c33a522
Body:{"name":"Admin"}

Delete role by role Id:
Method:DELETE
EndPoint:http://localhost:3000/roles/:id

List All Users
Method:GET
EndPoint:http://localhost:3000/user


Get user by user Id
Method:GET
EndPoint:http://localhost:3000/user/:id

Get users by Role Id
Method:GET
EndPoint:http://localhost:3000/user/roles/:id?pageNo=1&maxRows=10

Add User
Method:POST
EndPoint:http://localhost:3000/user
Body:
{"user_id":"gegegegeggeg",
"role_id":"jhljkdshlcsdlcsd",
"fname":"Test",
"lname":"user"
}

Update User
Method:PUT
EndPoint:http://localhost:3000/user/:id
{
"role_id":"xxxxxxxx",
"fname":"Test",
"lname":"user"
}

Delete User
Method:DELETE
EndPoint:http://localhost:3000/user/:id

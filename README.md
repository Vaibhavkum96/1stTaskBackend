# 1stTaskBackend
Here is the Question : 
Create a basic Node.js API using the Express framework. The API should include 
the following routes: GET /users POST /users GET /users/{id} PUT /users/{id} DELETE /users/{id} The API should also include basic authentication and authorization. 

I have written all the API using standard practices, For authentication and authorization, we have use JWT WeB Token modules.
For Authentication: I have create a Register and Login Module to handle this task. 
For Authorization : I have written the logic that only a user who is authorized for his account can edit/delete his account details. No other user except admin can interfare with the details of a particulat user.
Business Logic of API are written in Controllers, Db Models are defined in models. 
Tested all the API's with the help of POSTMAN. 

TechStack Used: NodeJs, ExpressJs, MongoDB

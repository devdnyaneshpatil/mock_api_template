API documentation


url:http://localhost:8080

routes:
1)userRoutes:
   A)  url/user/register:- to register the user.
       body:{
        _id:objectID
        name:string,
        email:string,
        password:string,
        isAdmin:Boolean
       }

   B)url/user/login:-to login the user
     body:{
        email:string,
        password:string
     }

     response:{
        token:token
     }

2)Bookroutes:
    A)url/book/: to get all the details of the book
    B) url/book/:id   :- to get the book with given id
    c)url/book/searc?category :- to search he book with given category
    d)url/book/add;- to add a new book
    e)url/book/update/:id    :- to update the book
    f) url/book/delete/:id    :- to delete the book
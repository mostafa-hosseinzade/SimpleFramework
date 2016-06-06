<html>
    <head>
        
    </head>
    <body>
        <form action="/madmin/Login/CheckLogin" method="post" style="text-align: center;margin-top: 40px">
            <p>Login Form</p>
            <input type="text" name="username" placeholder="User Name"><br>
            <input type="text" name="email" placeholder="Email"><br/>
            <input type="text" name="password" placeholder="Password"><br>
            <input type="hidden" name="csrf" value="<?php echo csrf; ?>">
            <input type="submit" >
        </form>
    </body>
</html>

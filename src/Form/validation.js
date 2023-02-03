const validation = (userData) =>{

    let errors = {};

    if (!/^\S+@\S+\.\S+$/.test(userData.username)){
        errors.username = "Invalid email";
    }
    if(!userData.username){
        errors.username = "Este campo no puede estar vacío";
    }
    if(userData.username.length > 35){
        errors.username = "El email no puede superar los 35 caracteres";
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,10}$/.test(userData.password)){
        errors.password = "Invalid password - La contraseña debe contener entre 6 y 10 caracteres";
}

return errors;
};

export default validation;
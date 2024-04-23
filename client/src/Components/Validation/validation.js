const validation = (userData)=>{
    
const errors ={};
const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

// Verificar si el nombre está vacío

if (!userData || typeof userData !== 'object') {
    return errors; // Retorna un objeto de errores vacío si userData no está definido o no es un objeto
}

if (userData.name && userData.name.trim().length === 0) {
    errors.name = 'El nombre no debe estar vacío';
}

if (userData.name && (userData.name.trim().length < 4 || userData.name.trim().length > 40)) {
    errors.name = 'El nombre debe tener entre 4 y 40 caracteres';
}

if (userData.bred_for && userData.bred_for.trim().length === 0) {
    errors.bred_for = 'El nombre no debe estar vacío';
}

if (userData.bred_for && (userData.bred_for.trim().length < 4 || userData.bred_for.trim().length > 120)) {
    errors.bred_for = 'El bred for debe tener entre 4 y 100 caracteres';
}


if (userData.Temperament && userData.Temperament.trim().length === 0) {
    errors.Temperament = 'El Temperament no debe estar vacío';
}

if (userData.Temperament && (userData.Temperament.trim().length < 4 || userData.Temperament.trim().length > 30)) {
    errors.Temperament = 'El Temperament debe tener entre 4  y 30 caracteres';
}


/*
    if(!/^\d{4}\/\d{2}\/\d{2}$/.test(userData.release_date)){
        errors.release_date = 'La fecha debe tener el formato AAAA/MM/DD';
    } else


    if(!userData.rating && userData.rating.trim().length === 0){
        errors.rating = 'El rating no deben estar Vacios';
    }else
    if(!/^\d+$/.test(userData.rating)){
        errors.rating = 'Debe ser un número';
    }else
    if(!userData.platforms && userData.platforms.trim().length === 0){
        errors.platforms = 'El rating no deben estar Vacios';
    }else
    
    if(!userData.genres && userData.genres.trim().length === 0){
        errors.genres = 'La imagen no deben estar Vacios';
    }else
    if(!userData.image && userData.image.trim().length === 0){
        errors.image = 'La imagen no deben estar Vacios';
    }else
    */
    if(!urlPattern.test(userData.image)){
        errors.image = 'Por favor, ingrese una URL válida para la imagen';
    }else
    if(!userData.image && userData.image.trim().length === 0){
        errors.image = 'La imagen no deben estar Vacios';
    }
    if (userData.image && (userData.image.trim().length >254)) {
        errors.Temperament = 'URL de Imagen muy larga';
    }
    

return errors;

}

export default validation
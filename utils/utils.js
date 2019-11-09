const formatErrors = (error, otherErrors)=>{
	const errors = error.errors;
	let objErrors = []
	
	if(errors){
		Object.entries(errors).map(error=>{
			const {path, message} = error[1];
			objErrors.push({path,message})
		})
		objErrors = objErrors.concat(otherErrors)
		return objErrors;
	}else if(otherErrors.length){
		return otherErrors;
	}

	
	const unknownError = {}
	switch(error.code){
		/*case 11000:
			unknownError.path = "username or email"
			unknownError.message = "Identificador existente."
			break;*/
		default:
			unknownError.path = "Desconocido"
			unknownError.message = error.message
	}

	return [unknownError];
}

module.exports = formatErrors;

//check the input data is valid
export const checkAllNumber = (items: Array<any>): boolean => {
	const checkNums = items.map(item=> item.id);
	if (checkNums.some(isNaN)){
		return false
	}
	else {
		return true
	}
}


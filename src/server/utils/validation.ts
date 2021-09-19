export const checkAllNumber = (items: Array<number>): boolean => {
	if (items.some(isNaN)){
		return false
	}
	else {
		return true
	}
}


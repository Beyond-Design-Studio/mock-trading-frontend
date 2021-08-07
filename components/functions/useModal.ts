import { useState } from "react";

const useModal = (): {
	isVisible: boolean,
	toggleModal: () => void
} => {

	const [isVisible, setIsVisible] = useState(false);

	const toggleModal = () => {
		setIsVisible(!isVisible);
	}

	return {
		isVisible,
		toggleModal
	}
}

export default useModal;
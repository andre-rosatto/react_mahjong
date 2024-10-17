interface ModalProps {
	onClose: () => void;
	children: JSX.Element
}

export function Modal({children, onClose}: ModalProps) {
	return (
		<div
			className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center z-[10000]"
			onClick={onClose}
		>{children}</div>
	);
}
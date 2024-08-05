type PropsButtton = {
	children?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type: "button" | "submit" | "reset";
	style: "confirm" | "sidebar";
};

export default function Button(props: PropsButtton) {
	let styles = "";

	switch (props.style) {
		case "confirm":
			styles = "flex justify-center items-center w-full h-[40px] bg-light-sand rounded-[12px] border border-solid ";
			break;
		case "sidebar":
			styles = "text-[18px] xl:text-[20px] font-normal leading-[1.2]";
			break;
		default:
	}
	return (
		<button type={props.type} className={styles} onClick={props.onClick} disabled={props.disabled}>
			{props.children}
		</button>
	);
}

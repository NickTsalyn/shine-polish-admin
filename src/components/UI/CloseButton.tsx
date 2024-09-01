import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


type PropsButtton = {
    onClick?: () => void;
    type: "button"
  };

  export default function CloseButton(props: PropsButtton) {
    
    return (
      <button
        type={props.type}   
        className=' absolute  top-3 right-3 md:top-6 md:right-6 text-main'
        onClick={props.onClick}
      >
        <CloseRoundedIcon className='size-6  md:size-9'/>
      </button>
    );
  }
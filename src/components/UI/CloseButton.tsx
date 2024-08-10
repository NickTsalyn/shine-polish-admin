import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


type PropsButtton = {
    onClick?: () => void;
    type: "button"
  };

  export default function CloseButton(props: PropsButtton) {
    
    return (
      <button
        type={props.type}   
        className=' absolute  top-4 right-4 md:top-8 md:right-8 text-main'
        onClick={props.onClick}
      >
        <CloseRoundedIcon className='size-6  md:size-9'/>
      </button>
    );
  }
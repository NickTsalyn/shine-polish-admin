import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


type PropsButtton = {
    onClick?: () => void;
    type: "button"
  };

  export default function CloseButton(props: PropsButtton) {
    
    return (
      <button
        type={props.type}   
        className=' absolute top-8 right-7 text-main'
        onClick={props.onClick}
      >
        <CloseRoundedIcon fontSize='large'/>
      </button>
    );
  }
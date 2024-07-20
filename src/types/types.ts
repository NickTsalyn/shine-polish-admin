export type RadioCheckProps = {
  style?: string;
  text?: string;
  isActive?: boolean;
  value?: string;
  checked?: boolean;
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  disabled?: boolean;
  accent?:boolean;
};

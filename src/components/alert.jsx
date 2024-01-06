import { Alert } from "react-bootstrap";

// 'primary',
//         'secondary',
//         'success',
//         'danger',
//         'warning',
//         'info',
//         'light',
//         'dark',

export default function AlertComponent({ text, variant }) {
  return <Alert variant={variant}>{text}</Alert>;
}

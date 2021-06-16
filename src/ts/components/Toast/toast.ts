import Swal from 'sweetalert2';

interface IProps {
  position?: any;
  timer?: any;
  icon: any;
  message: any;
}

const Toast = (props: IProps) => {
  const { position, timer, icon, message } = props;

  let arrMultipleMessage = '';

  const isArr = Array.isArray(message);
  if (isArr) {
    arrMultipleMessage = message
      .map(function (elem: any) {
        return elem.message;
      })
      .join(' e ');
  }

  const swalToast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer: isArr ? 10000 : timer,
    timerProgressBar: true,
  });

  return swalToast.fire({
    icon,
    title: isArr
      ? arrMultipleMessage.charAt(0).toUpperCase() + arrMultipleMessage.slice(1)
      : message,
  });
};

export default Toast;

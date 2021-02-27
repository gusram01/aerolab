import Swal from 'sweetalert2';

export const closeSwal = () => Swal.close();

export const loaderSwal = () =>
  Swal.fire({
    icon: 'info',
    title: 'Loading',
    text: 'Please wait...',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    willOpen: () => Swal.showLoading(),
  });

export const successSwal = message =>
  Swal.fire({
    icon: 'success',
    title: 'Thank you',
    text: message,
    timer: 3500,
  });

export const warnSwal = message =>
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    showConfirmButton: true,
    confirmButtonColor: '#f37173',
    showCancelButton: false,
  });

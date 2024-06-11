import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Notification extends React.Component {

    notify = (status, messsage) => {
        if (status) {
            toast.success(messsage, {
                position: "top-right",
            });
        } else {
            toast.error(messsage, {
                position: "top-right",
            });
        }
    }

}


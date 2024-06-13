import axios from 'axios';

export const messageList = () => axios.get("/message")
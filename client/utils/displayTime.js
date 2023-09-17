import moment from 'moment-timezone';

const displayTime = (data) => {
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return date.toLocaleString('en-GB', {timeZone: 'Etc/UTC'});
}

export const displayDate = (data) => {
    return moment(data).tz("Etc/UTC").format('DD MMMM');
}

export const displayFormat = (data) => {
    return moment(data).tz("Etc/UTC").format('HH:mm');
}

export default displayTime;
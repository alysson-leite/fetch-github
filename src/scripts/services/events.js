import { baseUrl, eventsQuantity } from '../variables.js'

async function getEvents(userName){
    const event = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`);
    return await event.json();
}

export { getEvents }
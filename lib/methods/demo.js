import data from 'app/config/data.json';
import Immutable from 'seamless-immutable';

const demoData = Immutable(data);

// this has to change to handle custom routes for app
const id_order = [];

// looks within data block to find information..
export function fetchDemoData(method, values, ids) {
    let sub_index = id_order.reduce((acc, id_name) => {
        if (_.has(ids, id_name)) {
            acc.push(ids[id_name]);
        }
        return acc;
    }, []);
    let index = _.union([method], sub_index);
    console.warn(`Fetching demo data for ${method}`);
    return demoData.getIn(index, {});
}
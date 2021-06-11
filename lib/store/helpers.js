export function reduceToIndex(list_of_data, id_attribute = 'id') {
    return list_of_data.reduce((results, entity) => {
        let id = entity[id_attribute];
        if (id) {
            results.order.push(id);
            results.index[id] = entity;
        }
        return results
    }, {order: [], index: {}});
}




export const mergeActions = (merge_list) => merge_list.reduce((export_graph, merge_item) => {
    const [name, actions_and_constants] = merge_item;
    const {Actions, Constants} = actions_and_constants;
    export_graph[`${name}Actions`] = Actions;
    export_graph[`${name}Constants`] = Constants;
    return export_graph;
}, {});


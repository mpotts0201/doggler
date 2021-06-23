export const tablePipe = (...fns) => (data) => ({...args}) => fns.reduce((value, fn) => fn(value, args), data);

export const sort = (data, args) => {
    const {column, order, selected} = args;
    if (!selected) {
        return data;
    }

    const extractNumber = (item) => item[column];

    const sortedData = _.orderBy(data, [extractNumber]);

    if (order === "asc") return sortedData;
    return sortedData.reverse();
};

export const paginate = (data, args) => {
    const {offset, page_number} = args;

    const page_start = offset * page_number;

    return data.slice(page_start, page_start + parseInt(offset));
};

export const filter = (data, args) => {
    const {selected_filters} = args;

    const filters = Object.entries(selected_filters);

    const filteredData = data.filter((each) => {
        return filters.reduce((acc, [key, val]) => {
            if (val === "All") return acc && true;
            return acc && each[key].includes(val);
        }, true);
    });

    return filteredData;
};

export const search = (data, args) => {
    const {search_text} = args;

    if (!search_text) return data;

    return data.filter((each) => {
        const values = _.values(each);

        const bool = values.reduce((acc, val) => {
            return acc || formatSearch(val).includes(formatSearch(search_text));
        }, false);

        return bool;
    });
};

const formatSearch = (value) => {
    return value
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, "");
};

export const nodeTablePipe = (data, args) => tablePipe(sort, filter, paginate)(data)({...args});

export const dcTablePipe = (data, args) => tablePipe(sort, paginate)(data)({...args});

export const arenaNameTablePipe = (data, args) => tablePipe(sort, filter, search, paginate)(data)({...args});

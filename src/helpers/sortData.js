export const sortData = (data, sortBy) => {
    const sortedData = data.slice().sort((a, b) =>  {
        if(sortBy === "desc") {
            return new Date(a.sortData) - new Date(b.sortData);
        } else if (sortBy === "asc") {
            return new Date(b.sortData) - new Date(a.sortData);
        }
        return 0;
    })
    return sortedData;
};

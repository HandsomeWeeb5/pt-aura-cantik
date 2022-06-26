function getOffset(currentPage = 1, listPerPage) {
    return [listPerPage] * (currentPage - 1);
}

function emptyOrRows(rows) {
    if(!rows){
        return [];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows
}
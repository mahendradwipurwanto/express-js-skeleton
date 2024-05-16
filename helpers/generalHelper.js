// helpers/paginationHelper.js

const { Op } = require('sequelize');


const processPagination = (req, filter) => {
    const limit = parseInt(filter.limit) > 0 ? parseInt(filter.limit) : 1844674407370955;
    const page = parseInt(filter.page) > 0 ? parseInt(filter.page) : 1;
    const offset = parseInt(filter.page) > 0 ? (limit * (page - 1)) : 0;

    delete filter.limit;
    delete filter.page;

    return { limit, page, offset, filter };
};

const generatePaginationMeta = (req, page, limit, count) => {
    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const nextPage = hasNextPage ? `${req.baseUrl}?page=${page + 1}&limit=${limit}` : null;
    const previousPage = hasPreviousPage ? `${req.baseUrl}?page=${page - 1}&limit=${limit}` : null;

    return {
        currentPage: page,
        totalPages,
        totalData: count,
        nextPage,
        previousPage
    };
}


const processWhereEqualFilter = (filter) => {
    const whereAndFilter = [];
    Object.keys(filter).forEach(key => {
        if (filter[key] != null && filter[key] !== '' && filter[key] !== undefined) {
            whereAndFilter.push({ [key]: filter[key] });
        }
    });
    return whereAndFilter;
};

const processWhereLikeFilter = (filter) => {
    const whereAndFilter = []
    Object.keys(filter).forEach(key => {
        if (filter[key] != null && filter[key] !== '' && filter[key] !== undefined) {
            whereAndFilter.push({
                [key]: {
                    [Op.like] : "%"+filter[key]+"%"
                }
            });
        }
    });
    return whereAndFilter;
};

const only = (obj, ...keys) => {
    const filtered = {};
    keys.forEach(key => {
      if (obj.hasOwnProperty(key)) {
        filtered[key] = obj[key];
      }
    });
    return filtered;
  }

  const except = (obj, ...keys) => {
    const filtered = { ...obj };
    keys.forEach(key => {
      if (filtered.hasOwnProperty(key)) {
        delete filtered[key];
      }
    });
    return filtered;
  }

module.exports = {
    generatePaginationMeta,
    processPagination,
    processWhereEqualFilter,
    processWhereLikeFilter,
    only,
    except
};
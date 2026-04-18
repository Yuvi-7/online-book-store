/**
 * utils/apiFeatures.js — Reusable API Features
 *
 * Handles pagination, sorting, filtering, and field limiting
 * for Mongoose queries.
 */

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering (gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    // Handle full-text search if search query is provided
    if (this.queryString.search) {
      this.query = this.query.find({
        $text: { $search: this.queryString.search }
      });
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || parseInt(process.env.DEFAULT_PAGE_SIZE) || 10;
    const maxLimit = parseInt(process.env.MAX_PAGE_SIZE) || 50;
    
    const finalLimit = limit > maxLimit ? maxLimit : limit;
    const skip = (page - 1) * finalLimit;

    this.query = this.query.skip(skip).limit(finalLimit);

    return this;
  }
}

module.exports = APIFeatures;

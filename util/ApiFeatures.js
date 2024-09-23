const ApiFeatures = (query, queryString) => {
  let updatedQuery = query;

  // FILTER OPTIONS
  const queryObj = { ...queryString };
  const excludedFields = ["sort", "page", "fields", "limit"];
  excludedFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  updatedQuery = updatedQuery.find(JSON.parse(queryStr));

  if (queryString.name) {
    let queryStr = Object.values(queryString.name).join("");

    updatedQuery = updatedQuery.find({
      name: { $regex: new RegExp(queryStr, "i") },
    });
  }

  if (queryString.sort) {
    updatedQuery = updatedQuery.sort(queryString.sort);
  } else {
    updatedQuery = updatedQuery.sort("-createdAt");
  }

  if (queryString.fields) {
    const fields = queryString.fields.split(",").join(" ");

    updatedQuery = updatedQuery.select(fields);
  } else {
    updatedQuery = updatedQuery.select("-__v");
  }

  if (queryString.page || queryString.limit) {
    const page = queryString.page * 1 || 1;
    const limit = queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // console.log(page, limit, skip);

    updatedQuery = updatedQuery.skip(skip).limit(limit);
  }

  return updatedQuery;
};

export default ApiFeatures;

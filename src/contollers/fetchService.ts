import { Model } from "mongoose";
import { NextRequest } from "next/server";
export type ResponseData = {
  data: any;
  meta: { total: number; page: number; totalPages: number; limit: number };
};

export type QueryOptions = {
  search?: string;
  searchableFields?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, any>;
  populate?: string | string[];
};

export type QueryConfig = {
  searchableFields?: string[];
  defaultSortBy?: string;
  defaultSortOrder?: "asc" | "desc";
  allowedFilters?: string[]; // Only allow filters you want to support
  populate?: string | string[];
};

export async function findWithQuery<T>(model: Model<T>, options: QueryOptions) {
  const {
    search,
    searchableFields = [],
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    filters = {},
    populate,
  } = options;

  const skip = (page - 1) * limit;
  const query: any = { ...filters };

  if (search && searchableFields.length > 0) {
    query.$or = searchableFields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    }));
  }
//   await dbCon();
  let dbQuery = model.find(query);

  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach((path) => {
        dbQuery = dbQuery.populate(path);
      });
    } else {
      dbQuery = dbQuery.populate(populate);
    }
  }

  const total = await model.countDocuments(query);
  const data = await dbQuery
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  return {
    data,
    meta: {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    },
  };
}

//  Extract query options from NextRequest
export function getQueryOptions(
  req: NextRequest,
  config: QueryConfig
): QueryOptions {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || undefined;
  const sortBy =
    searchParams.get("sortBy") || config.defaultSortBy || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const filters: Record<string, any> = {};
  if (config.allowedFilters) {
    config.allowedFilters.forEach((field) => {
      const value = searchParams.get(field);
      if (value) filters[field] = value;
    });
  }

  return {
    search,
    searchableFields: config.searchableFields || [],
    page,
    limit,
    sortBy,
    sortOrder,
    filters,
    populate: config.populate,
  };
}

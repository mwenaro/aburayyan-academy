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

// Enhanced function to support grade filtering
export async function findWithQueryWithGrade<T>(model: Model<T>, options: QueryOptions, grade: string) {
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
  
  // Build aggregation pipeline for grade filtering
  const pipeline: any[] = [
    // Lookup class information
    {
      $lookup: {
        from: "classes",
        localField: "class",
        foreignField: "_id",
        as: "classInfo"
      }
    },
    {
      $unwind: "$classInfo"
    },
    // Match by grade
    {
      $match: {
        "classInfo.grade": grade,
        ...filters
      }
    }
  ];

  // Add search functionality
  if (search && searchableFields.length > 0) {
    const searchConditions = searchableFields.map((field) => {
      if (field.startsWith("class.")) {
        const classField = field.replace("class.", "classInfo.");
        return { [classField]: { $regex: search, $options: "i" } };
      }
      return { [field]: { $regex: search, $options: "i" } };
    });
    
    pipeline.push({
      $match: {
        $or: searchConditions
      }
    });
  }

  // Add sorting
  pipeline.push({
    $sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 }
  });

  // Get total count
  const countPipeline = [...pipeline, { $count: "total" }];
  const countResult = await model.aggregate(countPipeline);
  const total = countResult.length > 0 ? countResult[0].total : 0;

  // Add pagination
  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  // Add class field back
  pipeline.push({
    $addFields: {
      class: "$classInfo"
    }
  });

  // Remove classInfo field
  pipeline.push({
    $unset: "classInfo"
  });

  const data = await model.aggregate(pipeline);

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
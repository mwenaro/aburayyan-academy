import { dbCon } from "@/libs/mongoose/dbCon";
import { Student } from "@/models/Student";
import { ClassModel } from "@/models/Class";
import { NextRequest, NextResponse } from "next/server";
import { findWithQuery, getQueryOptions } from "@/contollers/fetchService";

export async function GET(req: NextRequest) {
  try {
    await dbCon();

    // Ensure models are registered
    ClassModel;

    const { searchParams } = new URL(req.url);
    const grade = searchParams.get("grade");
    const classId = searchParams.get("classId");
    const className = searchParams.get("className");

    const queryOptions = getQueryOptions(req, {
      searchableFields: ["name", "contactDetails.phone", "regno", "class.name"],
      allowedFilters: ["gen"],
      defaultSortBy: "name",
      defaultSortOrder: "asc",
      populate: ["class"],
    });

    let query: any = { ...queryOptions.filters };

    // Filter by specific class ID
    if (classId) {
      query.class = classId;
    }

    // Filter by grade - we need to use aggregation for this
    if (grade && !classId) {
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
            ...query
          }
        }
      ];

      // Add search functionality
      if (queryOptions.search && queryOptions.searchableFields && queryOptions.searchableFields.length > 0) {
        const searchConditions = queryOptions.searchableFields.map((field) => {
          if (field.startsWith("class.")) {
            const classField = field.replace("class.", "classInfo.");
            return { [classField]: { $regex: queryOptions.search, $options: "i" } };
          }
          return { [field]: { $regex: queryOptions.search, $options: "i" } };
        });
        
        pipeline.push({
          $match: {
            $or: searchConditions
          }
        });
      }

      // Add sorting
      const sortBy = queryOptions.sortBy || "name";
      pipeline.push({
        $sort: { [sortBy]: queryOptions.sortOrder === "asc" ? 1 : -1 }
      });

      // Get total count
      const countPipeline = [...pipeline, { $count: "total" }];
      const countResult = await Student.aggregate(countPipeline);
      const total = countResult.length > 0 ? countResult[0].total : 0;

      // Add pagination
      const page = queryOptions.page || 1;
      const limit = queryOptions.limit || 20;
      const skip = (page - 1) * limit;
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: limit });

      // Add class field back and format
      pipeline.push({
        $addFields: {
          class: "$classInfo"
        }
      });

      // Remove classInfo field
      pipeline.push({
        $unset: "classInfo"
      });

      const data = await Student.aggregate(pipeline);

      return NextResponse.json({
        data,
        meta: {
          total,
          page: page,
          totalPages: Math.ceil(total / limit),
          limit: limit,
        },
      });
    }

    // Filter by class name (partial match)
    if (className && !classId && !grade) {
      // Find classes that match the name pattern
      const matchingClasses = await ClassModel.find({
        name: { $regex: className, $options: "i" }
      }).select("_id");
      
      if (matchingClasses.length > 0) {
        query.class = { $in: matchingClasses.map(c => c._id) };
      } else {
        // No matching classes found
        return NextResponse.json({
          data: [],
          meta: {
            total: 0,
            page: queryOptions.page || 1,
            totalPages: 0,
            limit: queryOptions.limit || 20,
          },
        });
      }
    }

    // Use regular query if no special filtering is needed
    const updatedQueryOptions = {
      ...queryOptions,
      filters: query
    };

    const result = await findWithQuery(Student, updatedQueryOptions);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching filtered students:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

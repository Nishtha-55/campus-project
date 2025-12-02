import { Request, Response, NextFunction } from "express";
import LostItem from "../models/LostItem";
import FoundItem from "../models/FoundItem";
import Claim from "../models/Claim";
import User from "../models/User";
import { AppError, asyncHandler } from "../middleware/errorHandler";

// Helper function for string similarity
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 100.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return ((longer.length - editDistance) / longer.length) * 100;
}

function levenshteinDistance(s1: string, s2: string): number {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// Calculate match score between lost and found items
function calculateMatchScore(lostItem: any, foundItem: any): number {
  let score = 0;

  // Category match: +40
  if (lostItem.category === foundItem.category) {
    score += 40;
  }

  // Location similarity: +30
  const locationSimilarity = calculateSimilarity(lostItem.location_lost, foundItem.location_found);
  score += (locationSimilarity / 100) * 30;

  // Description/Title keyword overlap: +20
  const titleSimilarity = calculateSimilarity(lostItem.title, foundItem.title);
  score += (titleSimilarity / 100) * 20;

  // Date difference < 3 days: +10
  const dateDiff = Math.abs(
    new Date(lostItem.date_lost).getTime() - new Date(foundItem.date_found).getTime()
  );
  const daysDiff = dateDiff / (1000 * 60 * 60 * 24);
  if (daysDiff <= 3) {
    score += 10;
  }

  return Math.round(score);
}

export const smartMatch = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { lostItemId } = req.params;

  // Get the lost item
  const lostItem = await LostItem.findById(lostItemId);
  if (!lostItem) {
    return next(new AppError("Lost item not found", 404));
  }

  // Get all approved found items
  const foundItems = await FoundItem.find({ status: "approved" }).populate(
    "finder_user_id",
    "name email phone"
  );

  // Calculate match scores
  const matches = foundItems
    .map((foundItem) => ({
      foundItem,
      matchScore: calculateMatchScore(lostItem, foundItem),
    }))
    .filter((match) => match.matchScore > 20) // Only include meaningful matches
    .sort((a, b) => b.matchScore - a.matchScore);

  res.status(200).json({
    success: true,
    data: {
      lostItem,
      possibleMatches: matches.slice(0, 5), // Return top 5 matches
      totalMatches: matches.length,
    },
  });
});

export const approveItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { itemType } = req.query;

  if (!itemType || !["lost", "found"].includes(itemType as string)) {
    return next(new AppError("Invalid item type", 400));
  }

  const ItemModel = itemType === "lost" ? LostItem : FoundItem;
  const item = await ItemModel.findByIdAndUpdate(
    req.params.id,
    { status: itemType === "lost" ? "approved" : "approved" },
    { new: true }
  );

  if (!item) {
    return next(new AppError("Item not found", 404));
  }

  res.status(200).json({
    success: true,
    message: `${itemType} item approved successfully`,
    data: item,
  });
});

export const rejectItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { itemType } = req.query;

  if (!itemType || !["lost", "found"].includes(itemType as string)) {
    return next(new AppError("Invalid item type", 400));
  }

  const ItemModel = itemType === "lost" ? LostItem : FoundItem;
  const item = await ItemModel.findByIdAndDelete(req.params.id);

  if (!item) {
    return next(new AppError("Item not found", 404));
  }

  res.status(200).json({
    success: true,
    message: `${itemType} item rejected and deleted successfully`,
  });
});

export const markItemReturned = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { itemType } = req.query;

  if (!itemType || !["lost", "found"].includes(itemType as string)) {
    return next(new AppError("Invalid item type", 400));
  }

  const ItemModel = itemType === "lost" ? LostItem : FoundItem;
  const statusUpdate = itemType === "lost" ? "claimed" : "returned";
  
  const item = await ItemModel.findByIdAndUpdate(
    req.params.id,
    { status: statusUpdate },
    { new: true }
  );

  if (!item) {
    return next(new AppError("Item not found", 404));
  }

  res.status(200).json({
    success: true,
    message: `${itemType} item marked as ${statusUpdate} successfully`,
    data: item,
  });
});

export const getStatistics = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const stats = {
    totalUsers: await User.countDocuments(),
    totalLostItems: await LostItem.countDocuments(),
    totalFoundItems: await FoundItem.countDocuments(),
    totalClaims: await Claim.countDocuments(),
    
    lostItemsByStatus: {
      pending: await LostItem.countDocuments({ status: "pending" }),
      approved: await LostItem.countDocuments({ status: "approved" }),
      claimed: await LostItem.countDocuments({ status: "claimed" }),
    },

    foundItemsByStatus: {
      pending: await FoundItem.countDocuments({ status: "pending" }),
      approved: await FoundItem.countDocuments({ status: "approved" }),
      returned: await FoundItem.countDocuments({ status: "returned" }),
    },

    claimsByStatus: {
      pending: await Claim.countDocuments({ claim_status: "pending" }),
      approved: await Claim.countDocuments({ claim_status: "approved" }),
      rejected: await Claim.countDocuments({ claim_status: "rejected" }),
    },

    itemsByCategory: await LostItem.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]),
  };

  res.status(200).json({
    success: true,
    data: stats,
  });
});

export const getPendingItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const pendingLostItems = await LostItem.find({ status: "pending" })
    .populate("user_id", "name email")
    .skip(skip)
    .limit(limit);

  const pendingFoundItems = await FoundItem.find({ status: "pending" })
    .populate("finder_user_id", "name email")
    .skip(skip)
    .limit(limit);

  const totalLost = await LostItem.countDocuments({ status: "pending" });
  const totalFound = await FoundItem.countDocuments({ status: "pending" });

  res.status(200).json({
    success: true,
    data: {
      pendingLostItems,
      pendingFoundItems,
      pagination: {
        page,
        limit,
        totalLost,
        totalFound,
        total: totalLost + totalFound,
      },
    },
  });
});

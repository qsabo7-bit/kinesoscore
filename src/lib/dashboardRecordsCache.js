/** In-memory dashboard payload so revisits don't flash empty → loaded. */
let dashboardRecordsCache = { userId: null, records: [] }

export function readCachedDashboardRecords(userId) {
  if (!userId || dashboardRecordsCache.userId !== userId) return null
  return dashboardRecordsCache.records
}

export function writeCachedDashboardRecords(userId, records) {
  dashboardRecordsCache = { userId, records }
}

export function clearCachedDashboardRecords() {
  dashboardRecordsCache = { userId: null, records: [] }
}

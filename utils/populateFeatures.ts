export const populateFeatures = (featuresObj, userId, organizationId, role) => {
  const updatedFeatureObj = {}

  for (const [featureName, accessObj] of Object.entries(featuresObj)) {
    if (typeof featuresObj[featureName] === 'boolean') {
      updatedFeatureObj[featureName] = featuresObj[featureName]
    } else {
      //@ts-ignore
      const { users, organizations, roles } = accessObj || {}

      updatedFeatureObj[featureName] =
        users?.includes(userId) ||
        organizations?.includes(organizationId) ||
        roles?.includes(role) ||
        false
    }
  }

  return updatedFeatureObj
}

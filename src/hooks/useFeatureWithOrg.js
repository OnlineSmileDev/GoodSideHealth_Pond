import { useState, useEffect } from 'react'
import { useFeatures } from 'flagged'
// TODO: There is a much simpler implementation if we want to use the nested obj api supplied by flagged that allows for checking 'videoVisit/${orgId}' but this keeps the array syntax
// TODO: if this sticks around, would be good to assess performance optimizations
const useFeatureWithOrg = (feature, organizationId) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const rootFeaturesObj = useFeatures()
  const featureArrOrBoolean = rootFeaturesObj[feature]

  const featureArr = Array.isArray(featureArrOrBoolean)
    ? rootFeaturesObj[feature]
    : false
  const featureBoolean = !Array.isArray(featureArrOrBoolean)
  useEffect(() => {
    let isFeatureEnabled
    if (featureArr && featureArr.includes(organizationId)) {
      isFeatureEnabled = true
    }
    if (featureArr && !featureArr.includes(organizationId)) {
      isFeatureEnabled = false
    }
    if (featureBoolean && !featureArr) {
      isFeatureEnabled = featureArrOrBoolean
    }

    setIsEnabled(isFeatureEnabled)
  }, [organizationId, featureArr, featureBoolean, featureArrOrBoolean])
  return isEnabled
}

export default useFeatureWithOrg

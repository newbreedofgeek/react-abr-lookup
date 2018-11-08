export const standardizeResult = (results) => {
  const adjusted = Array.isArray(results) ? results : (results.Abn === '') ? [] : [results];

  return adjusted.map(i => {
    return {
      name: (i.EntityName) ? i.EntityName : i.Name,
      abn: i.Abn,
      abnStatus: i.AbnStatus
    }
  })
}
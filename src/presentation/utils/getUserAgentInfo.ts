export const getUserAgentInfo = (userAgent: string) => {
  if (!userAgent) return "Unknown"
  
  if (/Mobi|Android/i.test(userAgent)) {
    return `Mobile: ${userAgent}`
  }
  
  const match = userAgent.match(/(Windows NT [\d.]+).*?(Chrome\/\d+\.\d+\.\d+\.\d+)/)
  if (match) {
    return `Desktop: ${match[1]} (${match[2]})`
  }

  return `Other: ${userAgent}`
}

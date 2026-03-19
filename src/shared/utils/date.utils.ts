export const getMemberDays = (userCreationTime: string) => {
  const creationTime = new Date(userCreationTime)
  const now = new Date()

  const diffInMs = now.getTime() - creationTime.getTime()
  const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  return daysPassed
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

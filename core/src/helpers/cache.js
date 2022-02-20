import lscache from 'lscache'

export const getCache = key => {
  const bucket = 'uxxiportal'
  lscache.setBucket(bucket)
  return lscache.get(key)
}
export const setCache = (key, value) => {
  const bucket = 'uxxiportal'
  lscache.setBucket(bucket)
  lscache.set(key, value)
}
export const removeCache = key => {
  const bucket = 'uxxiportal'
  lscache.setBucket(bucket)
  lscache.remove(key)
}
export const flushCache = () => {
  const bucket = 'uxxiportal'
  lscache.setBucket(bucket)
  lscache.flush()
}
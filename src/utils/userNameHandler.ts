export const userNameHandler = (userName: string) => {
  const max = 22
  const name = userName.split('@')[0]

  return name.length <= max
    ? name
    : name
        .split('')
        .map((el, i) => (i <= max ? el : null))
        .filter(el => el)
        .join('') + '...'
}

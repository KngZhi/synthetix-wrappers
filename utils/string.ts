export const truncateAddress = (address: string, first = 5, last = 5): string =>
  `${address.slice(0, first)}...${address.slice(-last, address.length)}`;

export const truncateBalance = (balance: string, decimal: number = 6): string => {
  return Number(balance).toFixed(decimal).replace(/\.0+$/, '')
}

export const adder = (items, data) => [...items, data]
export const remover = (items, id) => items.filter(item => item._id !== id)
export const updater = (items, data, idx) => [
    ...items.slice(0, idx),
    data,
    ...items.slice(idx  + 1)
]
export const merger = (prev, next) => Object.assign({}, prev, next)
